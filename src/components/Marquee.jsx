const rowA = ['APEXGAME', 'bytecode', 'Protosphere', 'Artist & Illustrator', 'RealmForge', 'Pixel Forge', 'MetaForm', 'VR Innovations']
const rowB = ['Motion Design', 'Product Render', 'Brand Identity', '3D Animation', 'Character Art', 'Game Assets', 'UI / UX', 'Environment']

const Track = ({ items, reverse = false, speed = 22 }) => {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', display: 'flex' }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        animation: `marquee${reverse ? 'R' : 'L'} ${speed}s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, margin: '0 28px' }}>
            <span style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: reverse ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)',
              transition: 'color 0.2s',
            }}>
              {item}
            </span>
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: reverse ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)',
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <>
      {/* Dark marquee – after hero */}
      <div style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '18px 0' }}>
        <Track items={rowA} speed={24} />
      </div>

      {/* Light marquee – between sections */}
      <div id="marquee-light" style={{ background: '#f5f5f5', padding: '18px 0' }}>
        <Track items={rowB} reverse speed={20} />
      </div>
    </>
  )
}
