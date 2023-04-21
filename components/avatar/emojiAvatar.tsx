import { useMemo } from 'react';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

export default function EmojiAvatar({ address }: {
  address: string;
}) {
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  );
  return (
    <div
      className="avatar placeholder"
    >
      <div className="text-neutral-content rounded-full w-8" style={{backgroundColor}}>
        <span className="text-md">{emoji}</span>
      </div>
    </div>
  )
}
