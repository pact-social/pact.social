/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import {
  TwitterIcon,
  GithubIcon,
  GoogleIcon,
  OpenSeaIcon,
  UniswapIcon,
  TheGraphIcon,
  SushiIcon,
  HopIcon,
  LidoIcon,
  SnapshotIcon,
  SismoIcon,
  EthereumIcon,
  PolygonIcon,
  ArbitrumIcon,
  OptimismIcon,
  X2Y2Icon,
  LooksRareIcon,
  EmailCredentialIcon
} from "../svg/credentials";

import useOrbisIndexer from "../../hooks/useOrbisIndexer";

type CredentialType = {
  content?: {
    '@context': string[];
    credentialSubject?: {
      description: string;
      id: string;
      name: string;
      network: string;
      protocol: string;
      type: string;
      provider?: string;
    };
    issuanceDate: string;
    issuer: {
      id: string;
      name: string;
    }
  };
  created_at: string;
  creator: string;
  family: string;
  hash: string;
  identifier: string;
  issuer: string;
  provider: string;
  stream_id: string;
  subject_id: string;
  timestamp: number;
  weight: number;
}

type UsersCredentialsProps = {
  details: {
    did: string;
  };
}

export default function OrbisCredentials ({ did }: {did: string}) {
  return (
    <div>
      {did &&
      <>
        <UserCredentials details={{did}} />
        <UserCredentials details={{did: 'did:pkh:eip155:1:0xbc4eeebcb3806991319b7756a79bdcf088f5e78c'}} />
        {/* <UserCredentials details={{did: 'did:pkh:eip155:1:0xd1a5b91957530e1b3e9cfac1543467c60c352f69'}} /> */}
        {/* <UserCredentials details={{did: 'did:pkh:eip155:1:0x8efd27a5a585e2220d3d013f24722d8474eaa6f9'}} /> */}
        {/* <UserCredentials details={{did: 'did:pkh:eip155:1:0x17a1f27ced3e797a41805b6897e66e0f805d4071'}} /> */}
      </>
      }
    </div>
  )
}

const UserCredentials = ({details}: UsersCredentialsProps) => {
  const { orbisApi, fetchUserCredentials } = useOrbisIndexer();
  const [credentials, setCredentials] = useState<CredentialType[]>([]);
  const [credentialsLoading, setCredentialsLoading] = useState(false);

  useEffect(() => {
    load();
  }, [])

  /** Load credentials for this user with Orbis SDK */
  async function loadCredentials() {
    setCredentialsLoading(true);
	  let { data, error, status } = await orbisApi.rpc("get_verifiable_credentials", {
	    q_subject: details.did,
	    q_min_weight: 0
	  });

    if(data) {
      setCredentials(data as CredentialType[]);
      setCredentialsLoading(false);

      if(data.length === 0) {
        const res = await fetchUserCredentials(details.did)
      }
    }
  }

  const load = useCallback(loadCredentials, [details.did])

  const LoopCredentials = () => {
    if(credentials && credentials.length > 0) {
      return (
        <>
          {credentials.map((credential, key) => {
            return(
              <UserCredential credential={credential} key={key} />
            );
          })}
        </>
      )
    } else {
      return(
        <>
          <div className="text-sm">No credentials found</div>
          {/* <Alert title="User doesn't have any credentials yet." style={{backgroundColor: getThemeValue("bg", theme, "main"), color: getThemeValue("color", theme, "main")}} /> */}
        </>
      )
    }
  }

  return(
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <p className="text-sm font-bold" 
        // style={{ ...getThemeValue("font", theme, "main"), fontWeight: 400, fontSize: 13, color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}
      >Credentials:</p>
      <div className="">
        {credentialsLoading ?
          <div 
            className=""
            // style={{ color: getThemeValue("color", theme, "main") }}
          >
            {/* <LoadingCircle /> */}
          </div>
        :
          <LoopCredentials />
        }
      </div>
    </div>
  )
}

/** Display one credential */
export function UserCredential({credential, showTooltip = true}: { credential: CredentialType, showTooltip?: boolean}) {

  function clean(str: string) {
    if(str) {
      return str.toLowerCase().replaceAll(" ", "").replaceAll("-", "_");
    }
  }

  const CredentialIcon = () => {
    let protocol = credential.content?.credentialSubject?.protocol;
    if(protocol) {
      switch (clean(protocol)) {
        case "opensea":
          return <OpenSeaIcon />;
        case "uniswap":
          return <UniswapIcon />;
        case "thegraph":
          return <TheGraphIcon />;
        case "lido":
          return <LidoIcon />;
        case "sushiswap":
          return <SushiIcon />;
        case "hop":
          return <HopIcon />;
        case "snapshot":
          return <SnapshotIcon />;
        case "sismo":
          return <SismoIcon />;
        case "x2y2":
          return <X2Y2Icon />;
        case "looksrare":
          return <LooksRareIcon />;
        case "email":
          return <EmailCredentialIcon />
        case "nonces":
          switch (credential.content?.credentialSubject?.type) {
            case "active-wallet-mainnet":
              return <EthereumIcon />;
            case "active-wallet-polygon":
              return <PolygonIcon />;
            case "active-wallet-arbitrum":
              return <ArbitrumIcon />;
            case "active-wallet-optimism":
              return <OptimismIcon />;
            default:
              return <></>;
          };
        case "evm":
          switch (credential.content?.credentialSubject?.type) {
            case "active-wallet-mainnet":
              return <EthereumIcon />;
            case "active-wallet-polygon":
              return <PolygonIcon />;
            case "active-wallet-arbitrum":
              return <ArbitrumIcon />;
            case "active-wallet-optimism":
              return <OptimismIcon />;
            default:
              return <></>;
          };
        default:
          return <></>;
      }
    } else {
      return <></>;
    }
  }

  /** Orbis credentials */
  if(credential.content && credential.issuer == "did:key:z6mkfglpulq7vvxu93xrh1mlgha5fmutcgmuwkz1vuwt3qju") {
    if(credential.content?.credentialSubject?.protocol == "nonces" || credential.content?.credentialSubject?.protocol == "EVM") {
      return(
        <div 
          className="tooltip"
          data-tip={credential.content.credentialSubject.description}
        >
          <div 
            className="badge"
          >
            <CredentialIcon />{credential.content.credentialSubject.name}
          </div>
        </div>
      )
    } else {
      return(
        <div 
          className="tooltip"
          data-tip={credential.content?.credentialSubject?.description}
        >
          <div
            className="badge"
          >
            <CredentialIcon />{credential.content?.credentialSubject?.name}
          </div>
        </div>
      )
    }

  }

  /** Gitcoin credentials */
  else if(credential.issuer == "did:key:z6mkghvghlobledj1bgrlhs4lpgjavbma1tn2zcryqmyu5lc") {
    return(
      <div className="badge" style={{backgroundColor: "#FFF"}}><GitcoinProvider credential={credential} /></div>
    )
  }

  return <></>
}

const GitcoinProvider = ({credential}: { credential: CredentialType }) => {
  /** Default provider */
  let provider = <div className="verified-credential-type">
    <span>{credential.content?.credentialSubject?.provider}</span>
  </div>;

  /** Num Gitcoin Grants contributed to */
  if(credential.content?.credentialSubject?.provider?.includes('GitcoinContributorStatistics#numGrantsContributeToGte#')) {
    let numGrantsContributeTo = credential.content?.credentialSubject?.provider.replace('GitcoinContributorStatistics#numGrantsContributeToGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed to at least <span className="primary bold mleft-3">{numGrantsContributeTo}</span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> grants</span></span>
    </div>;
  }

  /** Value contribution Grants total */
  if(credential.content?.credentialSubject?.provider?.includes('GitcoinContributorStatistics#totalContributionAmountGte#')) {
    let totalContributionAmountGte = credential.content?.credentialSubject?.provider.replace('GitcoinContributorStatistics#totalContributionAmountGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed more than <span className="primary bold mleft-3">{totalContributionAmountGte} ETH to </span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> grants</span></span>
    </div>;
  }

  /** Num Gitcoin Rounds contributed to */
  if(credential.content?.credentialSubject?.provider?.includes('GitcoinContributorStatistics#numRoundsContributedToGte#')) {
    let numRoundsContributedToGte = credential.content?.credentialSubject?.provider.replace('GitcoinContributorStatistics#numRoundsContributedToGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed to at least <span className="primary bold mleft-3">{numRoundsContributedToGte} </span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> rounds</span></span>
    </div>
  }

  /** Num Gitcoin contributions for GR14 to */
  if(credential.content?.credentialSubject?.provider?.includes('GitcoinContributorStatistics#numGr14ContributionsGte#')) {
    let numGr14ContributionsGte = credential.content?.credentialSubject?.provider.replace('GitcoinContributorStatistics#numGr14ContributionsGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed to at least <span className="primary bold mleft-3">{numGr14ContributionsGte} </span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> grant(s) in GR14</span></span>
    </div>;
  }

  /** Amount of Twitter followers GT */
  if(credential.content?.credentialSubject?.provider?.includes('TwitterFollowerGT')) {
    let countTwitterFollowers = credential.content?.credentialSubject?.provider.replace('TwitterFollowerGT', '');
    provider = <>
      <TwitterIcon style={{marginRight: 4, color: "#1DA1F2"}} />
      <span>Followers <span className="primary bold">{` > `}</span> {countTwitterFollowers}</span>
    </>;
  }

  /** Amount of Twitter followers GTE */
  if(credential.content?.credentialSubject?.provider?.includes('TwitterFollowerGTE')) {
    let countTwitterFollowersGte = credential.content?.credentialSubject?.provider.replace('TwitterFollowerGTE', '');
    provider = <>
      <TwitterIcon style={{marginRight: 4, color: "#1DA1F2"}} />
      <span>Followers <span className="primary bold">{` > `}</span> {countTwitterFollowersGte}</span>
    </>;
  }

  /** Amount of tweets */
  if(credential.content?.credentialSubject?.provider?.includes('TwitterTweetGT')) {
    let countTweets = credential.content?.credentialSubject?.provider.replace('TwitterTweetGT', '');
    provider = <>
      <TwitterIcon style={{marginRight: 4, color: "#1DA1F2"}} />
      <span>Tweets <span className="primary bold">{` > `}</span> {countTweets}</span>
    </>;
  }

  /** GTC possession */
  if(credential.content?.credentialSubject?.provider?.includes('gtcPossessionsGte')) {
    let countGtc = credential.content?.credentialSubject?.provider.replace('gtcPossessionsGte#', '');
    provider = <>
      <span>Owns at least <span className="primary bold">{countGtc}</span></span>
      <img src='/img/icons/gtc-logo.webp' height='15' className='mright-4 mleft-4' />
      <span className="primary bold">GTC</span>
    </>;
  }

  switch (credential.content?.credentialSubject?.provider) {
    /** User has a Twitter account */
    case 'Twitter':
      provider = <>
        Has a <TwitterIcon style={{marginLeft: 3, marginRight: 3, color: "#1DA1F2"}} /> account
      </>;
      break;

    /** User has a Github account */
    case 'Github':
      provider = <>Has a <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> account</>;
      break;

    /** Has starred Github repository */
    case 'StarredGithubRepoProvider':
      provider = <>Has stars on <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> repositories</>;
      break;

    /** Has more than 10 followers */
    case 'TenOrMoreGithubFollowers':
      provider = <>Has at least 10 <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> followers</>;
      break;

    /** Has forked Github repositories */
    case 'ForkedGithubRepoProvider':
      provider = <>Forked some <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> repositories</>;
      break;

    /** User has more than 5 Github repositories */
    case 'FiveOrMoreGithubRepos':
      provider = <>Owns at least <span className="primary bold">5</span> <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> repositories</>;
      break;

    /** User has a Proof of Humanity */
    case 'Poh':
      provider = <>Human on Proof of Humanity</>;
      break;

    /** User has an ENS name */
    case 'Ens':
      provider = <>Has an ENS name</>;
      break;

    /** User has a Discord account */
    case 'Discord':
      provider = <>Has a <img src='/img/icons/discord-logo.png' height='17' className='mleft-4 mright-4' /> account</>;
      break;

    /** User has a Linkedin account */
    case 'Linkedin':
      provider = <>Has a <img src='/img/icons/linkedin-logo.png' height='17' className='mleft-4 mright-4' /> account</>;
      break;

    /** User has a Google account */
    case 'Google':
      provider = <>Has a <GoogleIcon style={{marginLeft: 3, marginRight: 3}} /> account</>;
      break;

    /** User has an Facebook account */
    case 'Facebook':
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Has a <img src='/img/icons/facebook-logo.png' height='17' className='mleft-4 mright-4' /> account</span>
      </div>;
      break;

    /** User has an Facebook profile picture */
    case 'FacebookProfilePicture':
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Has a <img src='/img/icons/facebook-logo.png' height='17' className='mleft-4 mright-4' /> profile picture</span>
      </div>;
      break;

    /** User has an Facebook account */
    case 'Brightid':
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Verified on <img src='/img/icons/brightid-logo.png' height='17' className='mleft-4 mright-4' /></span>
      </div>;
      break;

    /** Wallet with more than one transaction */
    case "EthGTEOneTxnProvider":
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Wallet with <span className="primary bold mleft-4 mright-4">{` >= 1 `}</span> Txn</span>
      </div>;
      break;

    /** Wallet owns more than 1 ETH */
    case "ethPossessionsGte#1":
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Wallet with <span className="primary bold mleft-4 mright-4">{` >= 1 `}</span> ETH</span>
      </div>;
      break;

    /** Voted on Snapshot */
    case "SnapshotVotesProvider":
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Voted on <span className="primary bold mleft-4 mright-4">{`Snapshot`}</span></span>
      </div>;
      break;
  }

  return provider;
}
