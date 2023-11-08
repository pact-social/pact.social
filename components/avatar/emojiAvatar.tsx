import { useMemo } from 'react';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

export default function EmojiAvatar({ 
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  );
  return (
    <div
      className="avatar placeholder"
    >
      <div 
        className={"text-neutral-content ".concat(className || ' rounded-full w-8')} style={{backgroundColor}}
      >
        <span className="">{emoji}</span>
      </div>
    </div>
  )
}
