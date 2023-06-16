type IconProps = {
  height?: number;
  color?: string;
  className?: string;
  style?: Object;
}

export default function IconSig({ height, color, className, style}: IconProps) {
  return (
    <svg height={ height || "24px"} style={style} viewBox="0 0 225 250" version="1.1" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Explorer-Copy" transform="translate(-1049.000000, -299.000000)" fill={color || "#000000"} fillRule="nonzero">
          <g id="noun-signature-3547929" transform="translate(1049.307484, 299.000000)">
            <path d="M177.428326,81.6217101 C189.505549,69.5415153 194.222309,51.9383724 189.801275,35.4378873 C185.380836,18.9403743 172.493859,6.05324803 155.993374,1.62998564 C139.492888,-2.79045324 121.889746,1.92603883 109.812523,14.0059067 L13.4042757,110.458736 C4.80443719,119.015478 -0.019318801,130.657285 0.00658266646,142.789492 L0.00658266646,191.432191 L48.649199,191.432191 C60.7962666,191.466834 72.4521909,186.642947 81.0200791,178.031443 L177.428326,81.6217101 Z M48.6462269,166.460968 L24.9680383,166.460968 L24.9680383,142.785777 C24.9593566,137.262383 27.1449215,131.965762 31.0429355,128.055934 L127.495764,31.6848387 C133.323949,26.2223734 141.578427,24.1995464 149.270282,26.3472026 C156.962137,28.4979053 162.972513,34.508653 165.120615,42.2005079 C167.271318,49.8923628 165.248328,58.146692 159.785877,63.9720536 L63.3330481,160.380301 C59.4350342,164.269621 54.1529025,166.455172 48.6463012,166.455172 L48.6462269,166.460968 Z" id="Shape"></path>
            <polygon id="Path" points="0 224.714583 224.692516 224.714583 224.692516 249.681904 0 249.681904"></polygon>
          </g>
        </g>
      </g>
    </svg>
  )
}