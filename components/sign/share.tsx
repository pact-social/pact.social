import { useEffect } from "react";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { useViewContext } from "../signBox";
import SignStats from "./stats";

export type TwitterTweetIntentOptions = {
  text?: string;
  url?: string;
  via?: string;
  hashtags?: string; // Comma-separated
} & Record<string, string>;

export function openTwitterTweetIntent(options: TwitterTweetIntentOptions) {
  openTwitterIntentUrl(twitterTweetIntentUrl(options));
}

export function openTwitterIntentUrl(href: string) {
  const width = 600;
  const height = 640;

  const screenHeight = screen.height;
  const screenWidth = screen.width;

  const windowOptions = {
    scrollbars: 'yes',
    resizable: 'yes',
    toolbar: 'no',
    location: 'yes',
    width,
    height,
    left: Math.round(screenWidth / 2 - width / 2),
    top: screenHeight > height ? Math.round(screenHeight / 2 - height / 2) : 0,
  };

  window.open(
    href,
    'intent',
    Object.entries(windowOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join(','),
  );
}

export function twitterTweetIntentUrl(parameters: TwitterTweetIntentOptions) {
  return `https://twitter.com/intent/tweet?${new URLSearchParams(
    parameters,
  ).toString()}`;
}


export default function ShareView() {
  const { setView, previousView } = useViewContext()
  const { pact } = usePactContext();
  const { state: { isAuthenticated, did } } = useCeramicContext();

  useEffect(() => {
    if (isAuthenticated) {
      // fetchSigningStatus()
    }
    // fetchStats()
  }, [isAuthenticated])

  const onShareBegin = async () => {
    // post to server
    try {
      // setIsVerifying(true);
      // await verifyTwitter(token);
      // setIsVerifying(false);
      // onSuccess();
    } catch (error) {
      // setIsVerifying(false);
    }
  };

  const shareOnTwitter = () => {
    if (!pact) return;
    openTwitterTweetIntent({
      text: [
        `Support ${pact?.title}`,
        '',
        '#peopleLobby',
        '',
        `Sign this ${pact?.type}`,
        `https://pact.social/m/${pact?.id}${(isAuthenticated && did?.parent) ? `?ref=${encodeURIComponent(did?.parent)}` : ''} via @pactsocial0x`,
      ].join('\n'),
    });
    onShareBegin();
  };

  return (
    <div className="flex flex-col justify-around my-6 mx-4">
      <p className=" text-lg font-semibold text-neutral-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-flex mr-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        Share
      </p>
      <p className="text-sm">To become an influencer and be eligible to rewards.</p>
      <div className="divider"></div>
      <button 
        className="btn btn-info bg-[#1D9BF0] text-neutral-content gap-2"
        onClick={() => shareOnTwitter()}
      >
        <svg className="h-6 w-6" fill="white" viewBox="0 0 24 24">
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
        Tweet
      </button>
      <div className="divider"></div>
      <div className="flex justify-between">
        {/* <div
          className="btn"
          onClick={previousView}
        >
          Back
        </div> */}
        <div
          className="btn btn-outline"
          onClick={() => setView(<SignStats/>)}
        >
          Later
        </div>
      </div>
    </div>
  )
}
