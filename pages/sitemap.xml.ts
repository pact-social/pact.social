import { GetServerSidePropsContext } from "next";
import supabase from "../lib/supabase/index";
import { definition } from "../src/__generated__/definition.js";
import { composeClient } from "../lib/composeClient";
import { CeramicAccount, Post, PostEdge } from "../src/gql";

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_APP_DOMAIN}`;

async function getPosts(did: string, stream: string) {
  const res = await composeClient.executeQuery(`
  query AuthorPosts($author: ID!, $pact: String!) {
    node(id: $author) {
      ... on CeramicAccount {
        id
        postList(
          first: 100
          filters: {where: {pactID: {equalTo: $pact}}}
        ) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
  `, {
    author: did,
    pact: stream
  })
  if (res.errors) {
    return null
  }
  const account = res.data?.node as CeramicAccount
  if (account.postList?.edges?.length === 0) {
    return null
  }

  return account.postList?.edges
}

async function generateSiteMap(pacts: any[]) {
  let pactPosts
  for (const pact of pacts) {
    const posts = await getPosts(pact.controller_did, pact.stream_id)

    if (posts) {
      pact.posts = posts
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}/</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/explore/petition</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/explore/manifesto</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/explore/openletter</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/explore/all</loc>
     </url>
     ${pacts
       .map((pact) => {
         return `
          <url>
              <loc>${`${EXTERNAL_DATA_URL}/m/${pact.stream_id}`}</loc>
          </url>
          <url>
              <loc>${`${EXTERNAL_DATA_URL}/m/${pact.stream_id}/comments`}</loc>
          </url>
          <url>
              <loc>${`${EXTERNAL_DATA_URL}/m/${pact.stream_id}/updates`}</loc>
          </url>
          ${(pact.posts && pact.posts.length > 0) ? pact.posts.map((post: PostEdge) => {
            if (post.node?.id) {
              return `
              <url>
                  <loc>${`${EXTERNAL_DATA_URL}/m/${pact.stream_id}/updates/${post.node?.id}`}</loc>
              </url>
              `
            }
            return ''
          }).join('') : ''}
        `;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // We make an API call to gather the URLs for our site
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();

  // fetch all pacts
  console.time('sitemap')
  const pacts = await supabase.from(definition.models.Pact.id).select('*', { count: 'exact' }).limit(1000)
  
  let sitemap
  if (!pacts.data) {
    sitemap = await generateSiteMap([]);
  } else {
    // We generate the XML sitemap with the posts data
    sitemap = await generateSiteMap(pacts.data);
  }
  
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  context.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  console.timeEnd('sitemap')
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default SiteMap;
