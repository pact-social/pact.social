import Logo from "../svg/logo";

export default function DefaultImage ({
  height,
}: {
  height?: number;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(125deg, rgba(240,0,184,1) 0%, rgba(21,21,236,1) 100%)',
      // borderRadius: '18px',
      // boxShadow: ' 10px 10px 80px rgba(0,0,0,0.4)',
      justifyContent: 'center',
    }}>
      <Logo height={height || 120} white />
    </div>
  )
}
