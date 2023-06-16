type SvgType = {
  height: number;
  white?: boolean;
  style?: Object;
}
export default function Logo({ height, white,  ...rest }: SvgType) {
  return (
    <svg height={height} viewBox="0 0 73 65" version="1.1" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="P" fill={white ? '#ffffff' : '#000000'} fillRule="nonzero">
          <path d="M17.2152796,27.8750037 C19.1402807,27.8750037 20.6527815,26.3625029 20.6527815,24.4375018 C20.6527815,22.5125008 19.1402807,21 17.2152796,21 C15.2902786,21 13.7777778,22.5125008 13.7777778,24.4375018 C13.7777778,26.3625029 15.2902786,27.8750037 17.2152796,27.8750037 Z" id="Path"></path>
          <path d="M58.4375018,13.8750037 C60.3625029,13.8750037 61.8750037,12.3625029 61.8750037,10.4375018 C61.8750037,8.51250081 60.3625029,7 58.4375018,7 C56.5125008,7 55,8.51250081 55,10.4375018 C55,12.3625029 56.5125008,13.8750037 58.4375018,13.8750037 Z" id="Path"></path>
          <path d="M51.4375018,6.87500369 C53.2983362,6.87500369 54.773712,5.46165571 54.8700028,3.62858621 L54.8750037,3.43750184 L54.8750037,3.43750184 C54.8750037,1.51250081 53.3625029,0 51.4375018,0 C49.5125008,0 48,1.51250081 48,3.43750184 C48,5.36250288 49.5125008,6.87500369 51.4375018,6.87500369 Z" id="Path"></path>
          <path d="M44.4375018,6.87500369 C46.2983362,6.87500369 47.773712,5.46165571 47.8700028,3.62858621 L47.8750037,3.43750184 L47.8750037,3.43750184 C47.8750037,1.51250081 46.3625029,4.4408921e-16 44.4375018,4.4408921e-16 C42.5125008,4.4408921e-16 41,1.51250081 41,3.43750184 C41,5.36250288 42.5125008,6.87500369 44.4375018,6.87500369 Z" id="Path"></path>
          <path d="M44.7232161,13.8750037 C46.5840505,13.8750037 48.0594263,12.4616557 48.155717,10.6285862 L48.160718,10.4375018 L48.160718,10.4375018 C48.160718,8.51250081 46.6482172,7 44.7232161,7 C42.7982151,7 41.2857143,8.51250081 41.2857143,10.4375018 C41.2857143,12.3625029 42.7982151,13.8750037 44.7232161,13.8750037 Z" id="Path"></path>
          <path d="M17.2946447,13.8750037 C19.155479,13.8750037 20.6308548,12.4616557 20.7271456,10.6285862 L20.7321465,10.4375018 L20.7321465,10.4375018 C20.7321465,8.51250081 19.2196457,7 17.2946447,7 C15.3696437,7 13.8571429,8.51250081 13.8571429,10.4375018 C13.8571429,12.3625029 15.3696437,13.8750037 17.2946447,13.8750037 Z" id="Path"></path>
          <path d="M51.580359,13.8750037 C53.50536,13.8750037 55.0178608,12.3625029 55.0178608,10.4375018 C55.0178608,8.51250081 53.50536,7 51.580359,7 C49.655358,7 48.1428571,8.51250081 48.1428571,10.4375018 C48.1428571,12.3625029 49.655358,13.8750037 51.580359,13.8750037 Z" id="Path"></path>
          <path d="M24.1517876,13.8750037 C26.0126219,13.8750037 27.4879977,12.4616557 27.5842885,10.6285862 L27.5892894,10.4375018 L27.5892894,10.4375018 C27.5892894,8.51250081 26.0767886,7 24.1517876,7 C22.2267865,7 20.7142857,8.51250081 20.7142857,10.4375018 C20.7142857,12.3625029 22.2267865,13.8750037 24.1517876,13.8750037 Z" id="Path"></path>
          <path d="M31.0089304,13.8750037 C32.8697647,13.8750037 34.3451405,12.4616557 34.4414313,10.6285862 L34.4464323,10.4375018 L34.4464323,10.4375018 C34.4464323,8.51250081 32.9339314,7 31.0089304,7 C29.0839294,7 27.5714286,8.51250081 27.5714286,10.4375018 C27.5714286,12.3625029 29.0839294,13.8750037 31.0089304,13.8750037 Z" id="Path"></path>
          <path d="M37.8660733,13.8750037 C39.7269076,13.8750037 41.2022834,12.4616557 41.2985742,10.6285862 L41.3035751,10.4375018 L41.3035751,10.4375018 C41.3035751,8.51250081 39.7910743,7 37.8660733,7 C35.9410722,7 34.4285714,8.51250081 34.4285714,10.4375018 C34.4285714,12.3625029 35.9410722,13.8750037 37.8660733,13.8750037 Z" id="Path"></path>
          <path d="M44.7708352,20.8750037 C46.6316695,20.8750037 48.1070453,19.4616557 48.2033361,17.6285862 L48.208337,17.4375018 L48.208337,17.4375018 C48.208337,15.5125008 46.6958362,14 44.7708352,14 C42.8458341,14 41.3333333,15.5125008 41.3333333,17.4375018 C41.3333333,19.3625029 42.8458341,20.8750037 44.7708352,20.8750037 Z" id="Path"></path>
          <path d="M58.548613,20.8750037 C60.473614,20.8750037 61.9861148,19.3625029 61.9861148,17.4375018 C61.9861148,15.5125008 60.473614,14 58.548613,14 C56.6236119,14 55.1111111,15.5125008 55.1111111,17.4375018 C55.1111111,19.3625029 56.6236119,20.8750037 58.548613,20.8750037 Z" id="Path"></path>
          <path d="M65.4375018,20.8750037 C67.3625029,20.8750037 68.8750037,19.3625029 68.8750037,17.4375018 C68.8750037,15.5125008 67.3625029,14 65.4375018,14 C63.5125008,14 62,15.5125008 62,17.4375018 C62,19.3625029 63.5125008,20.8750037 65.4375018,20.8750037 Z" id="Path-Copy-11"></path>
          <path d="M3.43750184,20.8750037 C5.36250288,20.8750037 6.87500369,19.3625029 6.87500369,17.4375018 C6.87500369,15.5125008 5.36250288,14 3.43750184,14 C1.51250081,14 0,15.5125008 0,17.4375018 C0,19.3625029 1.51250081,20.8750037 3.43750184,20.8750037 Z" id="Path-Copy-14"></path>
          <path d="M24.1041685,20.8750037 C26.0291695,20.8750037 27.5416704,19.3625029 27.5416704,17.4375018 C27.5416704,15.5125008 26.0291695,14 24.1041685,14 C22.1791675,14 20.6666667,15.5125008 20.6666667,17.4375018 C20.6666667,19.3625029 22.1791675,20.8750037 24.1041685,20.8750037 Z" id="Path"></path>
          <path d="M17.2152796,20.8750037 C19.076114,20.8750037 20.5514897,19.4616557 20.6477805,17.6285862 L20.6527815,17.4375018 L20.6527815,17.4375018 C20.6527815,15.5125008 19.1402807,14 17.2152796,14 C15.2902786,14 13.7777778,15.5125008 13.7777778,17.4375018 C13.7777778,19.3625029 15.2902786,20.8750037 17.2152796,20.8750037 Z" id="Path"></path>
          <path d="M10.3263907,20.8750037 C12.1872251,20.8750037 13.6626009,19.4616557 13.7588916,17.6285862 L13.7638926,17.4375018 L13.7638926,17.4375018 C13.7638926,15.5125008 12.2513918,14 10.3263907,14 C8.4013897,14 6.88888889,15.5125008 6.88888889,17.4375018 C6.88888889,19.3625029 8.4013897,20.8750037 10.3263907,20.8750037 Z" id="Path"></path>
          <path d="M51.6597241,20.8750037 C53.5205584,20.8750037 54.9959342,19.4616557 55.092225,17.6285862 L55.0972259,17.4375018 L55.0972259,17.4375018 C55.0972259,15.5125008 53.5847251,14 51.6597241,14 C49.734723,14 48.2222222,15.5125008 48.2222222,17.4375018 C48.2222222,19.3625029 49.734723,20.8750037 51.6597241,20.8750037 Z" id="Path"></path>
          <path d="M58.548613,27.8750037 C60.473614,27.8750037 61.9861148,26.3625029 61.9861148,24.4375018 C61.9861148,22.5125008 60.473614,21 58.548613,21 C56.6236119,21 55.1111111,22.5125008 55.1111111,24.4375018 C55.1111111,26.3625029 56.6236119,27.8750037 58.548613,27.8750037 Z" id="Path"></path>
          <path d="M65.4375018,27.8750037 C67.3625029,27.8750037 68.8750037,26.3625029 68.8750037,24.4375018 C68.8750037,22.5125008 67.3625029,21 65.4375018,21 C63.5125008,21 62,22.5125008 62,24.4375018 C62,26.3625029 63.5125008,27.8750037 65.4375018,27.8750037 Z" id="Path-Copy-12"></path>
          <path d="M3.43750184,27.8750037 C5.36250288,27.8750037 6.87500369,26.3625029 6.87500369,24.4375018 C6.87500369,22.5125008 5.36250288,21 3.43750184,21 C1.51250081,21 0,22.5125008 0,24.4375018 C0,26.3625029 1.51250081,27.8750037 3.43750184,27.8750037 Z" id="Path-Copy-15"></path>
          <path d="M65.4375018,34.8750037 C67.3625029,34.8750037 68.8750037,33.3625029 68.8750037,31.4375018 C68.8750037,29.5125008 67.3625029,28 65.4375018,28 C63.5125008,28 62,29.5125008 62,31.4375018 C62,33.3625029 63.5125008,34.8750037 65.4375018,34.8750037 Z" id="Path-Copy-13"></path>
          <path d="M3.43750184,34.8750037 C5.36250288,34.8750037 6.87500369,33.3625029 6.87500369,31.4375018 C6.87500369,29.5125008 5.36250288,28 3.43750184,28 C1.51250081,28 0,29.5125008 0,31.4375018 C0,33.3625029 1.51250081,34.8750037 3.43750184,34.8750037 Z" id="Path-Copy-16"></path>
          <path d="M51.6597241,27.8750037 C53.5205584,27.8750037 54.9959342,26.4616557 55.092225,24.6285862 L55.0972259,24.4375018 L55.0972259,24.4375018 C55.0972259,22.5125008 53.5847251,21 51.6597241,21 C49.734723,21 48.2222222,22.5125008 48.2222222,24.4375018 C48.2222222,26.3625029 49.734723,27.8750037 51.6597241,27.8750037 Z" id="Path"></path>
          <path d="M10.3263907,27.8750037 C12.1872251,27.8750037 13.6626009,26.4616557 13.7588916,24.6285862 L13.7638926,24.4375018 L13.7638926,24.4375018 C13.7638926,22.5125008 12.2513918,21 10.3263907,21 C8.4013897,21 6.88888889,22.5125008 6.88888889,24.4375018 C6.88888889,26.3625029 8.4013897,27.8750037 10.3263907,27.8750037 Z" id="Path"></path>
          <path d="M58.548613,34.8750037 C60.473614,34.8750037 61.9861148,33.3625029 61.9861148,31.4375018 C61.9861148,29.5125008 60.473614,28 58.548613,28 C56.6236119,28 55.1111111,29.5125008 55.1111111,31.4375018 C55.1111111,33.3625029 56.6236119,34.8750037 58.548613,34.8750037 Z" id="Path"></path>
          <path d="M17.2152796,34.8750037 C19.1402807,34.8750037 20.6527815,33.3625029 20.6527815,31.4375018 C20.6527815,29.5125008 19.1402807,28 17.2152796,28 C15.2902786,28 13.7777778,29.5125008 13.7777778,31.4375018 C13.7777778,33.3625029 15.2902786,34.8750037 17.2152796,34.8750037 Z" id="Path"></path>
          <path d="M10.3263907,34.8750037 C12.1872251,34.8750037 13.6626009,33.4616557 13.7588916,31.6285862 L13.7638926,31.4375018 L13.7638926,31.4375018 C13.7638926,29.5125008 12.2513918,28 10.3263907,28 C8.4013897,28 6.88888889,29.5125008 6.88888889,31.4375018 C6.88888889,33.3625029 8.4013897,34.8750037 10.3263907,34.8750037 Z" id="Path"></path>
          <path d="M51.6597241,34.8750037 C53.5205584,34.8750037 54.9959342,33.4616557 55.092225,31.6285862 L55.0972259,31.4375018 L55.0972259,31.4375018 C55.0972259,29.5125008 53.5847251,28 51.6597241,28 C49.734723,28 48.2222222,29.5125008 48.2222222,31.4375018 C48.2222222,33.3625029 49.734723,34.8750037 51.6597241,34.8750037 Z" id="Path"></path>
          <path d="M44.7232161,41.8750037 C46.5840505,41.8750037 48.0594263,40.4616557 48.155717,38.6285862 L48.160718,38.4375018 L48.160718,38.4375018 C48.160718,36.5125008 46.6482172,35 44.7232161,35 C42.7982151,35 41.2857143,36.5125008 41.2857143,38.4375018 C41.2857143,40.3625029 42.7982151,41.8750037 44.7232161,41.8750037 Z" id="Path"></path>
          <path d="M37.8660733,41.8750037 C39.7269076,41.8750037 41.2022834,40.4616557 41.2985742,38.6285862 L41.3035751,38.4375018 L41.3035751,38.4375018 C41.3035751,36.5125008 39.7910743,35 37.8660733,35 C35.9410722,35 34.4285714,36.5125008 34.4285714,38.4375018 C34.4285714,40.3625029 35.9410722,41.8750037 37.8660733,41.8750037 Z" id="Path-Copy-9"></path>
          <path d="M31.0089304,41.8750037 C32.8697647,41.8750037 34.3451405,40.4616557 34.4414313,38.6285862 L34.4464323,38.4375018 L34.4464323,38.4375018 C34.4464323,36.5125008 32.9339314,35 31.0089304,35 C29.0839294,35 27.5714286,36.5125008 27.5714286,38.4375018 C27.5714286,40.3625029 29.0839294,41.8750037 31.0089304,41.8750037 Z" id="Path-Copy-10"></path>
          <path d="M44.7708352,34.8750037 C46.6316695,34.8750037 48.1070453,33.4616557 48.2033361,31.6285862 L48.208337,31.4375018 L48.208337,31.4375018 C48.208337,29.5125008 46.6958362,28 44.7708352,28 C42.8458341,28 41.3333333,29.5125008 41.3333333,31.4375018 C41.3333333,33.3625029 42.8458341,34.8750037 44.7708352,34.8750037 Z" id="Path-Copy-4"></path>
          <path d="M10.4375018,41.8750037 C12.2983362,41.8750037 13.773712,40.4616557 13.8700028,38.6285862 L13.8750037,38.4375018 L13.8750037,38.4375018 C13.8750037,36.5125008 12.3625029,35 10.4375018,35 C8.51250081,35 7,36.5125008 7,38.4375018 C7,40.3625029 8.51250081,41.8750037 10.4375018,41.8750037 Z" id="Path"></path>
          <path d="M17.2946447,41.8750037 C19.2196457,41.8750037 20.7321465,40.3625029 20.7321465,38.4375018 C20.7321465,36.5125008 19.2196457,35 17.2946447,35 C15.3696437,35 13.8571429,36.5125008 13.8571429,38.4375018 C13.8571429,40.3625029 15.3696437,41.8750037 17.2946447,41.8750037 Z" id="Path"></path>
          <path d="M58.4375018,41.8750037 C60.3625029,41.8750037 61.8750037,40.3625029 61.8750037,38.4375018 C61.8750037,36.5125008 60.3625029,35 58.4375018,35 C56.5125008,35 55,36.5125008 55,38.4375018 C55,40.3625029 56.5125008,41.8750037 58.4375018,41.8750037 Z" id="Path"></path>
          <path d="M51.580359,41.8750037 C53.4411933,41.8750037 54.9165691,40.4616557 55.0128599,38.6285862 L55.0178608,38.4375018 L55.0178608,38.4375018 C55.0178608,36.5125008 53.50536,35 51.580359,35 C49.655358,35 48.1428571,36.5125008 48.1428571,38.4375018 C48.1428571,40.3625029 49.655358,41.8750037 51.580359,41.8750037 Z" id="Path"></path>
          <path d="M51.4375018,48.8750037 C53.3625029,48.8750037 54.8750037,47.3625029 54.8750037,45.4375018 C54.8750037,43.5125008 53.3625029,42 51.4375018,42 C49.5125008,42 48,43.5125008 48,45.4375018 C48,47.3625029 49.5125008,48.8750037 51.4375018,48.8750037 Z" id="Path"></path>
          <path d="M44.6375018,48.8750037 C46.4983362,48.8750037 47.973712,47.4616557 48.0700028,45.6285862 L48.0750037,45.4375018 L48.0750037,45.4375018 C48.0750037,43.5125008 46.5625029,42 44.6375018,42 C42.7125008,42 41.2,43.5125008 41.2,45.4375018 C41.2,47.3625029 42.7125008,48.8750037 44.6375018,48.8750037 Z" id="Path"></path>
          <path d="M37.8819463,20.8750037 C39.7427806,20.8750037 41.2181564,19.4616557 41.3144472,17.6285862 L41.3194481,17.4375018 L41.3194481,17.4375018 C41.3194481,15.5125008 39.8069473,14 37.8819463,14 C35.9569453,14 34.4444444,15.5125008 34.4444444,17.4375018 C34.4444444,19.3625029 35.9569453,20.8750037 37.8819463,20.8750037 Z" id="Path"></path>
          <path d="M24.2375018,48.8750037 C26.0983362,48.8750037 27.573712,47.4616557 27.6700028,45.6285862 L27.6750037,45.4375018 L27.6750037,45.4375018 C27.6750037,43.5125008 26.1625029,42 24.2375018,42 C22.3125008,42 20.8,43.5125008 20.8,45.4375018 C20.8,47.3625029 22.3125008,48.8750037 24.2375018,48.8750037 Z" id="Path"></path>
          <path d="M31.0375018,48.8750037 C32.8983362,48.8750037 34.373712,47.4616557 34.4700028,45.6285862 L34.4750037,45.4375018 L34.4750037,45.4375018 C34.4750037,43.5125008 32.9625029,42 31.0375018,42 C29.1125008,42 27.6,43.5125008 27.6,45.4375018 C27.6,47.3625029 29.1125008,48.8750037 31.0375018,48.8750037 Z" id="Path"></path>
          <path d="M37.8375018,48.8750037 C39.6983362,48.8750037 41.173712,47.4616557 41.2700028,45.6285862 L41.2750037,45.4375018 L41.2750037,45.4375018 C41.2750037,43.5125008 39.7625029,42 37.8375018,42 C35.9125008,42 34.4,43.5125008 34.4,45.4375018 C34.4,47.3625029 35.9125008,48.8750037 37.8375018,48.8750037 Z" id="Path"></path>
          <path d="M17.4375018,48.8750037 C19.2983362,48.8750037 20.773712,47.4616557 20.8700028,45.6285862 L20.8750037,45.4375018 L20.8750037,45.4375018 C20.8750037,43.5125008 19.3625029,42 17.4375018,42 C15.5125008,42 14,43.5125008 14,45.4375018 C14,47.3625029 15.5125008,48.8750037 17.4375018,48.8750037 Z" id="Path"></path>
          <path d="M44.6874945,56.0000295 C46.6124955,56.0000295 48.1249963,54.4875287 48.1249963,52.5625277 C48.1249963,50.6375266 46.6124955,49.1250258 44.6874945,49.1250258 C42.7624934,49.1250258 41.2499926,50.6375266 41.2499926,52.5625277 C41.2499926,54.4875287 42.7624934,56.0000295 44.6874945,56.0000295 Z" id="Path"></path>
          <path d="M37.8124908,56.0000295 C39.6733251,56.0000295 41.1487009,54.5866815 41.2449917,52.753612 L41.2499926,52.5625277 C41.2499926,50.6375266 39.7374918,49.1250258 37.8124908,49.1250258 C35.8874897,49.1250258 34.3749889,50.6375266 34.3749889,52.5625277 C34.3749889,54.4875287 35.8874897,56.0000295 37.8124908,56.0000295 Z" id="Path"></path>
          <path d="M30.9374871,56.0000295 C32.7983214,56.0000295 34.2736972,54.5866815 34.369988,52.753612 L34.3749889,52.5625277 L34.3749889,52.5625277 C34.3749889,50.6375266 32.8624881,49.1250258 30.9374871,49.1250258 C29.0124861,49.1250258 27.4999852,50.6375266 27.4999852,52.5625277 C27.4999852,54.4875287 29.0124861,56.0000295 30.9374871,56.0000295 Z" id="Path"></path>
          <path d="M44.7708352,27.8750037 C46.6316695,27.8750037 48.1070453,26.4616557 48.2033361,24.6285862 L48.208337,24.4375018 L48.208337,24.4375018 C48.208337,22.5125008 46.6958362,21 44.7708352,21 C42.8458341,21 41.3333333,22.5125008 41.3333333,24.4375018 C41.3333333,26.3625029 42.8458341,27.8750037 44.7708352,27.8750037 Z" id="Path"></path>
          <path d="M37.8819463,27.8750037 C39.7427806,27.8750037 41.2181564,26.4616557 41.3144472,24.6285862 L41.3194481,24.4375018 L41.3194481,24.4375018 C41.3194481,22.5125008 39.8069473,21 37.8819463,21 C35.9569453,21 34.4444444,22.5125008 34.4444444,24.4375018 C34.4444444,26.3625029 35.9569453,27.8750037 37.8819463,27.8750037 Z" id="Path-Copy-5"></path>
          <path d="M30.9930574,27.8750037 C32.8538917,27.8750037 34.3292675,26.4616557 34.4255583,24.6285862 L34.4305592,24.4375018 L34.4305592,24.4375018 C34.4305592,22.5125008 32.9180584,21 30.9930574,21 C29.0680564,21 27.5555556,22.5125008 27.5555556,24.4375018 C27.5555556,26.3625029 29.0680564,27.8750037 30.9930574,27.8750037 Z" id="Path-Copy-6"></path>
          <path d="M24.0624834,56.0000295 C25.9233177,56.0000295 27.3986935,54.5866815 27.4949843,52.753612 L27.4999852,52.5625277 L27.4999852,52.5625277 C27.4999852,50.6375266 25.9874844,49.1250258 24.0624834,49.1250258 C22.1374824,49.1250258 20.6249816,50.6375266 20.6249816,52.5625277 C20.6249816,54.4875287 22.1374824,56.0000295 24.0624834,56.0000295 Z" id="Path"></path>
          <path d="M24.1041685,27.8750037 C25.9650028,27.8750037 27.4403786,26.4616557 27.5366694,24.6285862 L27.5416704,24.4375018 L27.5416704,24.4375018 C27.5416704,22.5125008 26.0291695,21 24.1041685,21 C22.1791675,21 20.6666667,22.5125008 20.6666667,24.4375018 C20.6666667,26.3625029 22.1791675,27.8750037 24.1041685,27.8750037 Z" id="Path"></path>
          <path d="M30.9930574,20.8750037 C32.8538917,20.8750037 34.3292675,19.4616557 34.4255583,17.6285862 L34.4305592,17.4375018 L34.4305592,17.4375018 C34.4305592,15.5125008 32.9180584,14 30.9930574,14 C29.0680564,14 27.5555556,15.5125008 27.5555556,17.4375018 C27.5555556,19.3625029 29.0680564,20.8750037 30.9930574,20.8750037 Z" id="Path-Copy-2"></path>
          <path d="M10.4375018,13.8750037 C12.2983362,13.8750037 13.773712,12.4616557 13.8700028,10.6285862 L13.8750037,10.4375018 L13.8750037,10.4375018 C13.8750037,8.51250081 12.3625029,7 10.4375018,7 C8.51250081,7 7,8.51250081 7,10.4375018 C7,12.3625029 8.51250081,13.8750037 10.4375018,13.8750037 Z" id="Path-Copy"></path>
          <path d="M24.1517876,41.8750037 C26.0767886,41.8750037 27.5892894,40.3625029 27.5892894,38.4375018 C27.5892894,36.5125008 26.0767886,35 24.1517876,35 C22.2267865,35 20.7142857,36.5125008 20.7142857,38.4375018 C20.7142857,40.3625029 22.2267865,41.8750037 24.1517876,41.8750037 Z" id="Path"></path>
          <path d="M24.1041685,34.8750037 C26.0291695,34.8750037 27.5416704,33.3625029 27.5416704,31.4375018 C27.5416704,29.5125008 26.0291695,28 24.1041685,28 C22.1791675,28 20.6666667,29.5125008 20.6666667,31.4375018 C20.6666667,33.3625029 22.1791675,34.8750037 24.1041685,34.8750037 Z" id="Path-Copy-3"></path>
          <path d="M30.9930574,34.8750037 C32.9180584,34.8750037 34.4305592,33.3625029 34.4305592,31.4375018 C34.4305592,29.5125008 32.9180584,28 30.9930574,28 C29.0680564,28 27.5555556,29.5125008 27.5555556,31.4375018 C27.5555556,33.3625029 29.0680564,34.8750037 30.9930574,34.8750037 Z" id="Path-Copy-7"></path>
          <path d="M37.8819463,34.8750037 C39.8069473,34.8750037 41.3194481,33.3625029 41.3194481,31.4375018 C41.3194481,29.5125008 39.8069473,28 37.8819463,28 C35.9569453,28 34.4444444,29.5125008 34.4444444,31.4375018 C34.4444444,33.3625029 35.9569453,34.8750037 37.8819463,34.8750037 Z" id="Path-Copy-8"></path>
          <path d="M17.4375018,6.87500369 C19.2983362,6.87500369 20.773712,5.46165571 20.8700028,3.62858621 L20.8750037,3.43750184 L20.8750037,3.43750184 C20.8750037,1.51250081 19.3625029,4.4408921e-16 17.4375018,4.4408921e-16 C15.5125008,4.4408921e-16 14,1.51250081 14,3.43750184 C14,5.36250288 15.5125008,6.87500369 17.4375018,6.87500369 Z" id="Path"></path>
          <path d="M34.1874797,62.7500369 C36.1124807,62.7500369 37.6249816,61.2375361 37.6249816,59.312535 C37.6249816,57.387534 36.1124807,55.8750332 34.1874797,55.8750332 C32.2624787,55.8750332 30.7499779,57.387534 30.7499779,59.312535 C30.7499779,61.2375361 32.2624787,62.7500369 34.1874797,62.7500369 Z" id="Path"></path>
          <path d="M24.4375018,6.87500369 C26.2983362,6.87500369 27.773712,5.46165571 27.8700028,3.62858621 L27.8750037,3.43750184 L27.8750037,3.43750184 C27.8750037,1.51250081 26.3625029,4.4408921e-16 24.4375018,4.4408921e-16 C22.5125008,4.4408921e-16 21,1.51250081 21,3.43750184 C21,5.36250288 22.5125008,6.87500369 24.4375018,6.87500369 Z" id="Path"></path>
      </g>
      <path d="M64,64.6 C68.6,64.6 72.4,60.8 72.4,56.1 C72.4,51.4 68.7,47.7 64,47.7 C59.2,47.7 55.5,51.4 55.5,56.1 C55.5,60.8 59.3,64.6 64,64.6 Z" id="." fill="#F000B8" fillRule="nonzero"></path>
    </g>
    </svg>

  )
}
