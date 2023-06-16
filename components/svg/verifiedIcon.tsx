type IconProps = {
  height?: number;
  color?: string;
  className?: string;
  style?: Object;
}

export default function VerifiedIcon({ height, color, className, style}: IconProps) {
  return (
    <svg className={className} height={ height || "24px"} style={style} viewBox="0 0 272 281" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M135.8 280.4C134.7 280.4 133.5 280.3 132.4 280C54.5 259.9 0.100006 189.7 0.100006 109.2C0.100006 90.5 2.99999 71.9 8.89999 54.1C10.7 48.6 15.9 44.8 21.7 44.8C21.8 44.8 21.8 44.8 21.9 44.8C22.6 44.8 23.3 44.8 24 44.8C62.3 44.8 98.6 30.3 126.4 3.89998C131.6 -1.00002 139.8 -1.00002 145 3.89998C172.8 30.3 209.3 44.8 247.7 44.8H249.8C255.6 44.8 260.8 48.5 262.6 54.1C268.4 71.8 271.4 90.4 271.4 109.2C271.4 189.7 217 260 139.1 280C138.1 280.2 137 280.4 135.8 280.4ZM31.9 71.6C28.7 83.8 27.1 96.4 27.1 109.1C27.1 176.2 71.6 234.8 135.8 252.9C200 234.8 244.5 176.2 244.5 109.1C244.5 96.3 242.9 83.7 239.7 71.5C201.5 69.8 165.2 55.8 135.8 31.6C106.4 56 70.2 69.9 31.9 71.6ZM125.7 193.9C122.1 193.9 118.7 192.5 116.2 189.9L85.7 159.4C80.4 154.1 80.4 145.6 85.7 140.3C91 135 99.5 135 104.8 140.3L124.1 159.6L165.7 101.3C170 95.2 178.5 93.8 184.5 98.2C190.6 102.5 192 111 187.6 117L136.7 188.3C134.4 191.5 130.8 193.6 126.8 193.9C126.4 193.9 126 193.9 125.7 193.9Z" fill={color || "#000000"}/>
    </svg>
  )
}
