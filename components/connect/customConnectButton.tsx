import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { ConnectButtonProps } from "@rainbow-me/rainbowkit/dist/components/ConnectButton/ConnectButton";
import EmojiAvatar from "../avatar/emojiAvatar";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProfileName from "../profile/profileName";

export default function CustomConnectButton ({...props}: ConnectButtonProps) {

  return (
    <ConnectButton.Custom {...props}>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="btn btn-sm btn-secondary h-10 text-white"
                  >
                    Connect
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="btn btn-sm btn-warning h-10 text-white"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div 
                  className="flex gap-3 items-center"
                >
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className="btn btn-neutral bg-[var(--rk-colors-connectButtonBackground)] border-[var(--rk-colors-connectButtonBackground)] scale-100 hover:scale-105 hover:animate-[scale_1s_ease-in-out_infinite] gap-1 items-center min-h-[2.5rem] h-10 shadow-md px-2 text-white capitalize text-base"
                  >
                    {chain.hasIcon && (
                      <div
                        className=""
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                          // marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image 
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            // style={{ width: 12, height: 12 }}
                            height={24}
                            width={24}
                          />
                        )}
                      </div>
                    )}
                    {props.chainStatus === 'full' && chain.name}
                    <ChevronDownIcon className="h-6 w-6 stroke-1 stroke-white fill-white" />
                  </button>
                  <button 
                    className="btn btn-neutral bg-[var(--rk-colors-connectButtonBackground)] border-[var(--rk-colors-connectButtonBackground)] scale-100 hover:scale-105 gap-2 min-h-[2.5rem] h-10 shadow-md px-2 text-white capitalize text-base"
                    onClick={openAccountModal}
                    type="button"
                    >
                    <EmojiAvatar 
                      address={account.address.toLowerCase()}
                      className="h-6 w-6 rounded-full"
                    />
                    <span>
                    <ProfileName address={account.address as `0x${string}`} />
                    </span>
                    <ChevronDownIcon className="h-6 w-6 stroke-1 stroke-white fill-white" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  )
}
