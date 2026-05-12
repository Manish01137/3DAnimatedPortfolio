const reviews = [
  {
    name: 'Michael T.',  company: 'Protosphere Innovations',
    avatar: 'https://i.pravatar.cc/120?img=33',
    text: 'Alex brought our product concept to life in a way we never thought possible. The 3D model was so detailed and realistic, it helped us secure investors and streamline the manufacturing process. Highly recommend!',
  },
  {
    name: 'David R.',    company: 'Apex Interactive',
    avatar: 'https://i.pravatar.cc/120?img=52',
    text: "Alex's 3D character designs exceeded every expectation. The level of detail, responsiveness throughout the process was outstanding. Our game wouldn't be the same without their contributions.",
  },
  {
    name: 'Rachel M.',   company: 'MetaForm Creations',
    avatar: 'https://i.pravatar.cc/120?img=47',
    text: "Alex's unique 3D designs made our NFT collection a huge success. The art was breathtaking, and their professionalism made the entire process smooth and enjoyable. Looking forward to collaborating again!",
  },
  {
    name: 'Dr. Amanda K.', company: 'MedTech Visuals',
    avatar: 'https://i.pravatar.cc/120?img=45',
    text: 'Alex created detailed 3D models for our medical training program, and the quality was outstanding. The models were precise, realistic, and incredibly useful for our team. We are thrilled with the outcome.',
  },
  {
    name: 'James K.',    company: 'InnovaVR',
    avatar: 'https://i.pravatar.cc/120?img=57',
    text: 'The 3D prototype Alex delivered was perfect for pitching to investors. The detail and precision made our concepts come to life and move forward with funding.',
  },
  {
    name: 'Chris B.',    company: 'RealmForge Studios',
    avatar: 'https://i.pravatar.cc/120?img=11',
    text: 'Working with Alex was an absolute pleasure. The renders elevated our entire brand identity — cinematic quality delivered on time with zero revisions needed.',
  },
]

const Row = ({ items, reverse = false }) => {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', display: 'flex' }}>
      <div style={{
        display: 'flex', gap: 20,
        animation: `${reverse ? 'marqueeR' : 'marqueeL'} 32s linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((r, i) => (
          <div key={i} style={{
            flexShrink: 0, width: 420,
            background: '#111', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24, padding: '28px 28px 24px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20,
          }}>
            {/* Top: avatar + text */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <img src={r.avatar} alt={r.name}
                style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <p style={{
                fontFamily: 'Inter', fontWeight: 400, fontSize: 13.5,
                color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0,
              }}>
                {r.text}
              </p>
            </div>
            {/* Bottom: name */}
            <p style={{
              fontFamily: 'Inter', fontWeight: 800, fontSize: 11,
              color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0,
            }}>
              {r.name}, <span style={{ color: 'rgba(255,255,255,0.4)' }}>{r.company}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ background: '#000', padding: '100px 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '0 8vw 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Social Proof
          </p>
          <h2 style={{ fontFamily: '"Bebas Neue"', fontSize: 'clamp(40px, 6vw, 80px)', color: '#fff', margin: 0, lineHeight: 1 }}>
            WHAT CLIENTS SAY
          </h2>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 220, textAlign: 'right', lineHeight: 1.6, margin: 0 }}>
          50+ happy clients across 12 countries
        </p>
      </div>

      {/* Row 1 — left */}
      <Row items={reviews} />

      {/* Gap */}
      <div style={{ height: 20 }} />

      {/* Row 2 — right */}
      <Row items={[...reviews].reverse()} reverse />
    </section>
  )
}
