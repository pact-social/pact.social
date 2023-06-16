type SvgType = {
  height: number;
  white?: boolean;
}
export default function LogoBrand({height = 26, white = true, ...rest}: SvgType) {
  return (
    <svg height={height} width={height * 183 / 26} viewBox="0 0 183 26" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <g fillRule="evenodd" fill={white ? '#ffffff' : '#000000'}>
          <path d="M113.84 21c3.056 0 5.679-1.77 5.679-4.536 0-5.144-7.355-3.374-7.355-5.587 0-.719.703-1.19 1.65-1.19 1.081 0 2.054.471 2.487 1.467l2.84-1.632c-.812-1.577-2.542-2.96-5.409-2.96-3.298 0-5.408 1.937-5.408 4.398 0 5.283 7.355 3.374 7.355 5.587 0 .802-.784 1.3-2.028 1.3-1.352 0-2.244-.47-2.812-1.577L108 17.902c1.109 2.047 3.055 3.098 5.84 3.098zm15.008 0c4.13 0 7.309-3.257 7.309-7.233 0-3.92-3.152-7.204-7.309-7.204-4.103 0-7.281 3.257-7.281 7.204 0 3.976 3.151 7.233 7.281 7.233zm0-3.675c-1.994 0-3.442-1.606-3.442-3.544s1.448-3.543 3.442-3.543c1.994 0 3.47 1.605 3.47 3.543 0 1.938-1.476 3.544-3.47 3.544zM145.116 21c2.56-.028 4.93-1.217 6.143-3.872l-3.152-1.77c-.593 1.189-1.67 1.936-2.991 1.936-1.913 0-3.341-1.577-3.341-3.513s1.428-3.512 3.341-3.512c1.32 0 2.398.747 2.99 1.936l3.153-1.77c-1.212-2.655-3.583-3.845-6.143-3.872-4.015-.028-7.167 3.236-7.167 7.218 0 3.955 3.152 7.246 7.167 7.219zM155.88 4.988c1.264 0 2.29-1.106 2.29-2.494 0-1.36-1.026-2.494-2.29-2.494s-2.317 1.134-2.317 2.494c0 1.388 1.053 2.493 2.317 2.493zm2.035 15.75V7.088h-3.84v13.65h3.84zm9.728.262c1.848 0 3.315-.745 4.266-1.96v1.601h3.668v-6.874c0-4.113-3.098-7.204-7.309-7.204-4.13 0-7.282 3.285-7.282 7.204 0 3.976 2.745 7.233 6.657 7.233zm.625-3.675c-1.994 0-3.442-1.606-3.442-3.544s1.448-3.543 3.442-3.543c1.994 0 3.47 1.605 3.47 3.543 0 1.938-1.476 3.544-3.47 3.544zM183 20.738V.788h-3.84v19.95H183zM44.613 23.167c.488 0 .87.403.87.916 0 .514-.382.917-.87.917s-.871-.403-.871-.917c0-.513.383-.916.87-.916zm-1.742 0c.45 0 .811.343.864.8l.007.116-.001.051c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.917 0-.513.383-.916.871-.916zm1.742-1.834c.488 0 .87.404.87.917s-.382.917-.87.917-.871-.404-.871-.917.383-.917.87-.917zm-1.742 0c.45 0 .811.344.864.8l.007.117-.001.051c-.025.489-.399.866-.87.866-.488 0-.871-.404-.871-.917s.383-.917.871-.917zm5.226-1.833c.45 0 .811.344.864.8l.007.117-.002.05c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.916 0-.514.383-.917.87-.917zm-3.484 0c.45 0 .811.344.864.8l.007.117-.001.05c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm1.742 0c.45 0 .811.344.864.8l.007.117-.001.05c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm-3.484 0c.45 0 .811.344.864.8l.007.117-.001.05c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.916 0-.514.383-.917.871-.917zm8.71 0c.487 0 .87.403.87.917 0 .513-.383.916-.87.916-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm-1.742 0c.45 0 .811.344.864.8l.007.117-.002.05c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.916 0-.514.383-.917.87-.917zm-5.226-1.833c.45 0 .811.343.864.8l.007.116-.001.051c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.917 0-.513.383-.916.87-.916zm8.71 0c.487 0 .87.403.87.916 0 .514-.383.917-.87.917-.488 0-.871-.403-.871-.917 0-.513.383-.916.87-.916zm-1.742 0c.45 0 .811.343.864.8l.007.116-.002.051c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.917 0-.513.383-.916.87-.916zm-8.71 0c.45 0 .811.343.864.8l.007.116-.001.051c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.917 0-.513.383-.916.871-.916zm3.484 0c.45 0 .811.343.864.8l.007.116-.001.051c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.917 0-.513.383-.916.87-.916zm1.742 0c.45 0 .811.343.864.8l.007.116-.002.051c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.917 0-.513.383-.916.87-.916zm1.742 0c.45 0 .811.343.864.8l.007.116-.002.051c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.917 0-.513.383-.916.87-.916zm3.484-1.834c.45 0 .811.344.864.8l.007.117-.002.051c-.024.489-.398.866-.87.866-.487 0-.87-.404-.87-.917s.383-.917.87-.917zm-1.742 0c.45 0 .811.344.864.8l.007.117-.002.051c-.024.489-.398.866-.87.866-.487 0-.87-.404-.87-.917s.383-.917.87-.917zm-8.71 0c.45 0 .811.344.864.8l.007.117-.001.051c-.025.489-.399.866-.87.866-.488 0-.871-.404-.871-.917s.383-.917.871-.917zm1.742 0c.488 0 .87.404.87.917s-.382.917-.87.917-.871-.404-.871-.917.383-.917.87-.917zm10.452 0c.487 0 .87.404.87.917s-.383.917-.87.917c-.488 0-.871-.404-.871-.917s.383-.917.87-.917zM42.87 14c.45 0 .811.344.864.8l.007.117-.001.05c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.916 0-.514.383-.917.871-.917zm10.452 0c.45 0 .811.344.864.8l.007.117-.002.05c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.916 0-.514.383-.917.87-.917zm1.742 0c.487 0 .87.403.87.917 0 .513-.383.916-.87.916-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm-10.452 0c.488 0 .87.403.87.917 0 .513-.382.916-.87.916s-.871-.403-.871-.916c0-.514.383-.917.87-.917zm-1.742-1.833c.45 0 .811.343.864.8l.007.116-.001.051c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.917 0-.513.383-.916.871-.916zm12.194 0c.487 0 .87.403.87.916 0 .514-.383.917-.87.917-.488 0-.871-.403-.871-.917 0-.513.383-.916.87-.916zm-1.742 0c.45 0 .811.343.864.8l.007.116-.002.051c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.917 0-.513.383-.916.87-.916zm-8.71 0c.488 0 .87.403.87.916 0 .514-.382.917-.87.917s-.871-.403-.871-.917c0-.513.383-.916.87-.916zm1.742-1.834c.488 0 .87.404.87.917s-.382.917-.87.917-.871-.404-.871-.917.383-.917.87-.917zm-1.742 0c.45 0 .811.344.864.8l.007.117-.001.051c-.025.489-.399.866-.87.866-.488 0-.871-.404-.871-.917s.383-.917.87-.917zm-1.742 0c.45 0 .811.344.864.8l.007.117-.001.051c-.025.489-.399.866-.87.866-.488 0-.871-.404-.871-.917s.383-.917.871-.917zm10.452 0c.45 0 .811.344.864.8l.007.117-.002.051c-.024.489-.398.866-.87.866-.487 0-.87-.404-.87-.917s.383-.917.87-.917zm-1.742 0c.45 0 .811.344.864.8l.007.117-.002.051c-.024.489-.398.866-.87.866-.487 0-.87-.404-.87-.917s.383-.917.87-.917zm3.484 0c.487 0 .87.404.87.917s-.383.917-.87.917c-.488 0-.871-.404-.871-.917s.383-.917.87-.917zM51.58 8.5c.45 0 .811.344.864.8l.007.117-.002.05c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.916 0-.514.383-.917.87-.917zm-6.968 0c.45 0 .811.344.864.8l.007.117-.001.05c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm8.71 0c.487 0 .87.403.87.917 0 .513-.383.916-.87.916-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm-6.968 0c.45 0 .811.344.864.8l.007.117-.001.05c-.025.49-.399.866-.87.866-.488 0-.871-.403-.871-.916 0-.514.383-.917.87-.917zm1.742 0c.45 0 .811.344.864.8l.007.117-.002.05c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.916 0-.514.383-.917.87-.917zm1.742 0c.45 0 .811.344.864.8l.007.117-.002.05c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.916 0-.514.383-.917.87-.917zm1.742-1.833c.487 0 .87.403.87.916 0 .514-.383.917-.87.917-.488 0-.871-.403-.871-.917 0-.513.383-.916.87-.916zm-1.742 0c.45 0 .811.343.864.8l.007.116-.002.051c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.917 0-.513.383-.916.87-.916zm-1.742 0c.45 0 .811.343.864.8l.007.116-.002.051c-.024.49-.398.866-.87.866-.487 0-.87-.403-.87-.917 0-.513.383-.916.87-.916zM60.29 8.5c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm1.742 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm1.742 0c.488 0 .871-.403.871-.917 0-.513-.383-.916-.87-.916-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-6.968 1.833c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm-1.742 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm8.71 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm1.742 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.871-.917s-.871.403-.871.917c0 .513.383.916.871.916zm-6.968 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm3.484 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-1.742 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm3.484 1.834c.472 0 .845-.377.87-.866l.001-.051c0-.513-.383-.917-.87-.917-.489 0-.872.404-.872.917s.383.917.871.917zm1.742 0c.488 0 .871-.404.871-.917s-.383-.917-.871-.917-.871.404-.871.917.383.917.871.917zM62.032 14c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm5.226 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zM69 14c.488 0 .871-.403.871-.917 0-.513-.383-.916-.871-.916s-.871.403-.871.916c0 .514.383.917.871.917zm-3.484 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-1.742 1.833c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm1.742 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm1.742 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm3.484 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.871-.917s-.871.403-.871.917c0 .513.383.916.871.916zm-1.742 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-6.968 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm-1.742 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm8.71 1.834c.472 0 .845-.377.87-.866l.001-.051c0-.513-.383-.917-.87-.917-.489 0-.872.404-.872.917s.383.917.871.917zm1.742 0c.488 0 .871-.404.871-.917s-.383-.917-.871-.917-.871.404-.871.917.383.917.871.917zm-8.71 0c.488 0 .871-.404.871-.917s-.383-.917-.87-.917c-.488 0-.872.404-.872.917s.384.917.871.917zm-1.742 0c.472 0 .846-.377.87-.866l.001-.051c0-.513-.383-.917-.87-.917-.488 0-.872.404-.872.917s.384.917.871.917zm5.226 1.833c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-5.226 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm3.484 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm6.968 0c.488 0 .871-.403.871-.917 0-.513-.383-.916-.871-.916s-.871.403-.871.916c0 .514.383.917.871.917zm-1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-6.968 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm5.226 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-1.742 1.833c.488 0 .871-.403.871-.916 0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm3.484 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm1.742 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.871-.917s-.871.403-.871.917c0 .513.383.916.871.916zm-6.968 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm-1.742 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zM75.968 8.5c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm1.742 0c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm1.742 0c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm1.742 0c.487 0 .87-.403.87-.917 0-.513-.383-.916-.87-.916-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm0 1.833c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm1.741 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm-3.483 0c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm-1.742 0c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm-1.742 0c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm-1.742 0c.471 0 .845-.377.87-.865v-.051c0-.514-.382-.917-.87-.917s-.871.403-.871.917c0 .513.383.916.87.916zm0 1.834c.471 0 .845-.377.87-.866v-.051c0-.513-.382-.917-.87-.917s-.871.404-.871.917.383.917.87.917zm-1.742 0c.471 0 .845-.377.87-.866v-.051c0-.513-.382-.917-.87-.917s-.871.404-.871.917.383.917.87.917zm10.451 0c.488 0 .871-.404.871-.917s-.383-.917-.87-.917c-.488 0-.871.404-.871.917s.383.917.87.917zm-1.741 0c.471 0 .845-.377.87-.866v-.051c0-.513-.383-.917-.87-.917-.488 0-.871.404-.871.917s.383.917.87.917zm-5.226 0c.487 0 .87-.404.87-.917s-.383-.917-.87-.917c-.488 0-.871.404-.871.917s.383.917.87.917zM74.226 14c.488 0 .87-.403.87-.917 0-.513-.382-.916-.87-.916s-.871.403-.871.916c0 .514.383.917.87.917zm-1.742 0c.471 0 .845-.377.87-.866v-.05c0-.514-.382-.917-.87-.917s-.871.403-.871.916c0 .514.383.917.87.917zm1.742 1.833c.488 0 .87-.403.87-.916 0-.514-.382-.917-.87-.917s-.871.403-.871.917c0 .513.383.916.87.916zm-1.742 0c.471 0 .845-.377.87-.865v-.051c0-.514-.382-.917-.87-.917s-.871.403-.871.917c0 .513.383.916.87.916zm10.451 1.834c.488 0 .871-.404.871-.917s-.383-.917-.87-.917c-.488 0-.871.404-.871.917s.383.917.87.917zm-8.71 0c.472 0 .846-.377.87-.866l.002-.051c0-.513-.383-.917-.871-.917s-.871.404-.871.917.383.917.87.917zm-1.741 0c.471 0 .845-.377.87-.866v-.051c0-.513-.382-.917-.87-.917s-.871.404-.871.917.383.917.87.917zm8.71 0c.471 0 .845-.377.87-.866v-.051c0-.513-.383-.917-.87-.917-.488 0-.871.404-.871.917s.383.917.87.917zm-5.226 0c.487 0 .87-.404.87-.917s-.383-.917-.87-.917c-.488 0-.871.404-.871.917s.383.917.87.917zm0 1.833c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm5.226 0c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm-3.484 0c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm5.225 0c.488 0 .871-.403.871-.917 0-.513-.383-.916-.87-.916-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm-3.483 0c.471 0 .845-.377.87-.866v-.05c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.916 0 .514.383.917.87.917zm-5.226 0c.471 0 .845-.377.87-.866v-.05c0-.514-.382-.917-.87-.917s-.871.403-.871.916c0 .514.383.917.87.917zm1.742 1.833c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm1.742 0c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm3.484 0c.487 0 .87-.403.87-.916 0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm-1.742 0c.471 0 .845-.377.87-.865v-.051c0-.514-.383-.917-.87-.917-.488 0-.871.403-.871.917 0 .513.383.916.87.916zm10.451-16.5c.488 0 .871-.403.871-.916 0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-1.742 1.834c.472 0 .846-.377.87-.866l.001-.051c0-.513-.383-.917-.87-.917-.488 0-.872.404-.872.917s.384.917.871.917zm1.742 0c.488 0 .871-.404.871-.917s-.383-.917-.87-.917c-.489 0-.872.404-.872.917s.383.917.871.917zM86.42 8.5c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm3.484 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm5.226 0c.488 0 .871-.403.871-.917 0-.513-.383-.916-.871-.916s-.87.403-.87.916c0 .514.382.917.87.917zm-1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-3.484 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm-3.484 1.833c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm5.226 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm3.484 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-1.742 0c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-5.226 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm1.742 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm1.742 1.834c.488 0 .871-.404.871-.917s-.383-.917-.87-.917c-.489 0-.872.404-.872.917s.383.917.871.917zm-1.742 0c.472 0 .846-.377.87-.866l.001-.051c0-.513-.383-.917-.87-.917-.488 0-.872.404-.872.917s.384.917.871.917zm0 1.833c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm1.742 0c.488 0 .871-.403.871-.917 0-.513-.383-.916-.87-.916-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-1.742 1.833c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.917 0 .513.384.916.871.916zm1.742 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-1.742 1.834c.472 0 .846-.377.87-.866l.001-.051c0-.513-.383-.917-.87-.917-.488 0-.872.404-.872.917s.384.917.871.917zm1.742 0c.488 0 .871-.404.871-.917s-.383-.917-.87-.917c-.489 0-.872.404-.872.917s.383.917.871.917zm1.742 1.833c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm1.742 0c.472 0 .845-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm-5.226 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.488 0-.872.403-.872.916 0 .514.384.917.871.917zm1.742 0c.472 0 .846-.377.87-.866l.001-.05c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.916 0 .514.383.917.871.917zm5.226 0c.488 0 .871-.403.871-.917 0-.513-.383-.916-.871-.916s-.87.403-.87.916c0 .514.382.917.87.917zm-3.484 1.833c.472 0 .845-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm-1.742 0c.472 0 .846-.377.87-.865l.001-.051c0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zm3.484 0c.488 0 .871-.403.871-.916 0-.514-.383-.917-.87-.917-.489 0-.872.403-.872.917 0 .513.383.916.871.916zM103.018 22c1.633 0 2.982-1.35 2.982-3.018A2.955 2.955 0 0 0 103.018 16c-1.704 0-3.018 1.314-3.018 2.982A3.015 3.015 0 0 0 103.018 22z"/>
        </g>
        <g fillRule="evenodd" fill={white ? '#ffffff' : '#000000'}>
          <path d="M5.469 14.062c.611 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM18.564 9.51c.612 0 1.092-.491 1.092-1.117s-.48-1.117-1.092-1.117c-.611 0-1.092.491-1.092 1.117s.48 1.117 1.092 1.117zM16.34 7.235c.592 0 1.06-.46 1.091-1.055l.002-.063c0-.625-.48-1.117-1.092-1.117-.612 0-1.092.492-1.092 1.117 0 .626.48 1.118 1.092 1.118zM14.117 7.235c.591 0 1.06-.46 1.09-1.055l.002-.063c0-.625-.48-1.117-1.092-1.117-.612 0-1.092.492-1.092 1.117 0 .626.48 1.118 1.092 1.118zM14.208 9.51c.59 0 1.06-.459 1.09-1.055l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.117 1.092 1.117zM5.494 9.51c.591 0 1.06-.459 1.09-1.055l.002-.062c0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.117 1.092 1.117z"/>
          <path d="M16.386 9.51c.612 0 1.092-.491 1.092-1.117s-.48-1.117-1.092-1.117c-.612 0-1.092.491-1.092 1.117s.48 1.117 1.092 1.117zM7.673 9.51c.59 0 1.06-.459 1.09-1.055l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117S7.06 9.51 7.673 9.51z"/>
          <path d="M9.85 9.51c.592 0 1.06-.459 1.091-1.055l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117S9.239 9.51 9.85 9.51z"/>
          <path d="M12.03 9.51c.59 0 1.06-.459 1.09-1.055l.001-.062c0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.117 1.092 1.117zM14.223 11.786c.59 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM18.6 11.786c.611 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM20.788 11.786c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM1.092 11.786c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118C.48 9.551 0 10.043 0 10.67c0 .625.48 1.117 1.092 1.117zM7.657 11.786c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM5.469 11.786c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM3.28 11.786c.592 0 1.06-.46 1.09-1.055l.003-.062c0-.626-.481-1.118-1.093-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM16.411 11.786c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM18.6 14.062c.611 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM20.788 14.062c.612 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM1.092 14.062c.612 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM20.788 16.337c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM1.092 16.337c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118C.48 14.102 0 14.594 0 15.22c0 .625.48 1.117 1.092 1.117zM16.411 14.062c.591 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM3.28 14.062c.592 0 1.06-.46 1.09-1.056l.003-.062c0-.626-.481-1.117-1.093-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM18.6 16.337c.611 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM5.469 16.337c.611 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM3.28 16.337c.592 0 1.06-.46 1.09-1.055l.003-.062c0-.626-.481-1.118-1.093-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM16.411 16.337c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM14.208 18.613c.59 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118z"/>
          <path d="M12.03 18.613c.59 0 1.06-.46 1.09-1.056l.001-.062c0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118z"/>
          <path d="M9.85 18.613c.592 0 1.06-.46 1.091-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM14.223 16.337c.59 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM3.316 18.613c.59 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118z"/>
          <path d="M5.494 18.613c.612 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM18.564 18.613c.612 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118z"/>
          <path d="M16.386 18.613c.591 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM16.34 20.888c.612 0 1.093-.492 1.093-1.117 0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117z"/>
          <path d="M14.18 20.888c.592 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM12.034 11.786c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM7.7 20.888c.59 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117z"/>
          <path d="M9.86 20.888c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117z"/>
          <path d="M12.02 20.888c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM5.54 20.888c.59 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM14.196 23.204c.612 0 1.092-.491 1.092-1.117s-.48-1.118-1.092-1.118c-.611 0-1.092.492-1.092 1.118 0 .626.48 1.117 1.092 1.117z"/>
          <path d="M12.012 23.204c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .626.48 1.117 1.092 1.117zM9.828 23.204c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .626.48 1.117 1.092 1.117zM14.223 14.062c.59 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM12.034 14.062c.591 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM9.846 14.062c.591 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118z"/>
          <path d="M7.644 23.204c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .626.48 1.117 1.092 1.117zM7.657 14.062c.592 0 1.06-.46 1.09-1.056l.002-.062c0-.626-.48-1.117-1.092-1.117-.611 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM9.846 11.786c.591 0 1.06-.46 1.09-1.055l.002-.062c0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM3.316 9.51c.59 0 1.06-.459 1.09-1.055l.002-.062c0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.117 1.092 1.117zM7.673 18.613c.611 0 1.092-.492 1.092-1.118 0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM7.657 16.337c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM9.846 16.337c.611 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.612 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM12.034 16.337c.612 0 1.092-.492 1.092-1.117 0-.626-.48-1.118-1.092-1.118-.611 0-1.092.492-1.092 1.118 0 .625.48 1.117 1.092 1.117zM5.54 7.235c.59 0 1.06-.46 1.09-1.055l.002-.063C6.632 5.492 6.152 5 5.54 5c-.612 0-1.092.492-1.092 1.117 0 .626.48 1.118 1.092 1.118zM10.86 25.399c.612 0 1.093-.492 1.093-1.118 0-.626-.48-1.117-1.092-1.117-.612 0-1.092.491-1.092 1.117s.48 1.118 1.092 1.118zM7.763 7.235c.591 0 1.06-.46 1.09-1.055l.002-.063C8.855 5.492 8.375 5 7.763 5c-.611 0-1.092.492-1.092 1.117 0 .626.48 1.118 1.092 1.118z"/>
        </g>
        <path d="M20.331 26C21.793 26 23 24.765 23 23.237c0-1.528-1.175-2.73-2.669-2.73-1.524 0-2.7 1.202-2.7 2.73S18.838 26 20.331 26z" fill="#F000B8"/>
      </g>
    </svg>

  )
}
