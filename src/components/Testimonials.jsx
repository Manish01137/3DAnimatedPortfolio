const reviews = [
  {
    name: 'Akash Mehta',  company: 'Founder, Tech Startup',
    avatar: 'https://i.pravatar.cc/120?img=33',
    text: 'Amazing experience working with Rahul. The graphic designs were modern, premium, and perfectly matched our brand identity. Delivery was fast, professional, and highly creative throughout.',
  },
  {
    name: 'Priya Sharma', company: 'Marketing Lead, FashionFlux',
    avatar: 'https://i.pravatar.cc/120?img=47',
    text: 'Rahul created outstanding social media creatives for our business. Every design looked eye-catching, professional, and helped improve our online engagement and overall brand presence significantly.',
  },
  {
    name: 'Rohan Verma',  company: 'CEO, NovaCommerce',
    avatar: 'https://i.pravatar.cc/120?img=52',
    text: 'The website banners and advertisement creatives were absolutely stunning. Rahul understands modern design trends and delivers high-quality work with excellent communication and timely project completion.',
  },
  {
    name: 'Sneha Iyer',   company: 'Brand Director, Aurum & Co.',
    avatar: 'https://i.pravatar.cc/120?img=45',
    text: 'Very professional designer with incredible creativity. The logo, branding, and packaging designs exceeded our expectations and gave our company a strong premium visual identity online.',
  },
  {
    name: 'Karan Singh',  company: 'Product Manager, Pixel Studio',
    avatar: 'https://i.pravatar.cc/120?img=57',
    text: 'Working with Rahul was smooth and stress-free. He quickly understood our requirements and delivered high-quality UI/UX designs that looked modern, clean, and user-friendly.',
  },
  {
    name: 'Neha Kapoor',  company: 'Co-Founder, GlowSkin Beauty',
    avatar: 'https://i.pravatar.cc/120?img=49',
    text: 'The social media posts designed by Rahul helped our business attract more customers online. Every creative looked premium, engaging, and professionally designed for marketing campaigns.',
  },
  {
    name: 'Aditya Rao',   company: 'Marketing Head, Velocity Motors',
    avatar: 'https://i.pravatar.cc/120?img=11',
    text: 'Rahul delivered exceptional video editing and motion graphics work. The visuals were cinematic, creative, and perfectly aligned with our brand’s modern marketing style and audience.',
  },
  {
    name: 'Megha Joshi',  company: 'E-commerce Lead, BloomCrafts',
    avatar: 'https://i.pravatar.cc/120?img=44',
    text: 'Highly impressed with the product mockups and Amazon listing images. The designs looked realistic, premium, and professionally optimized to improve customer attraction and sales performance.',
  },
  {
    name: 'Vikram Patel', company: 'Director, Trinity Architects',
    avatar: 'https://i.pravatar.cc/120?img=15',
    text: 'Excellent communication, creative ideas, and fast delivery. Rahul handled our branding project professionally and delivered designs that truly represented our company vision and business goals.',
  },
  {
    name: 'Anjali Desai', company: 'Founder, Saffron Foods',
    avatar: 'https://i.pravatar.cc/120?img=26',
    text: 'The packaging designs created by Rahul looked world-class and premium. Our products now stand out beautifully in the market and attract more customer attention consistently.',
  },
  {
    name: 'Saurabh Khan', company: 'CTO, Quantum Labs',
    avatar: 'https://i.pravatar.cc/120?img=60',
    text: 'Rahul designed an amazing website interface for our company. The layouts were modern, responsive, visually attractive, and provided a smooth user experience across all devices.',
  },
  {
    name: 'Riya Malhotra',company: 'Studio Head, Bloom Creative',
    avatar: 'https://i.pravatar.cc/120?img=32',
    text: 'We loved the creative concepts and attention to detail in every project. Rahul consistently delivers professional-quality designs that make businesses look modern and trustworthy online.',
  },
]

const Row = ({ items, reverse = false }) => {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', display: 'flex' }}>
      <div style={{
        display: 'flex', gap: 20,
        animation: `${reverse ? 'marqueeR' : 'marqueeL'} 60s linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((r, i) => (
          <div key={i} style={{
            flexShrink: 0, width: 440,
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
                &ldquo;{r.text}&rdquo;
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
  const half = Math.ceil(reviews.length / 2)
  const rowTop = reviews.slice(0, half)
  const rowBot = reviews.slice(half)

  return (
    <section style={{
      background: '#000', padding: '120px 0 100px', overflow: 'hidden',
      borderRadius: '40px 40px 0 0', marginTop: -2, position: 'relative', zIndex: 2,
    }}>
      {/* Header */}
      <div style={{ padding: '0 8vw 70px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '0 0 8px' }}>
            What clients say
          </p>
          <h2 style={{ fontFamily: '"Bebas Neue"', fontSize: 'clamp(48px, 7vw, 96px)', color: '#fff', margin: 0, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            REAL WORDS,<br />REAL RESULTS.
          </h2>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.4)', maxWidth: 260, textAlign: 'right', lineHeight: 1.65, margin: 0 }}>
          A few of the kind words from brands and founders I've had the joy of designing for.
        </p>
      </div>

      <Row items={rowTop} />
      <div style={{ height: 20 }} />
      <Row items={rowBot} reverse />
    </section>
  )
}
