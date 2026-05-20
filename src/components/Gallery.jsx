/* Eager-load every image in src/assets/a1/ */
const glob = import.meta.glob('../assets/a1/*.webp', {
  eager: true,
  import: 'default',
})

const images = Object.entries(glob)
  .sort(([a], [b]) => {
    const na = Number((a.match(/g(\d+)\.webp$/) || [])[1] || 0)
    const nb = Number((b.match(/g(\d+)\.webp$/) || [])[1] || 0)
    return na - nb
  })
  .map(([, url]) => url)

const half = Math.ceil(images.length / 2)
const rowTop = images.slice(0, half)
const rowBot = images.slice(half)

function Row({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          gap: 'clamp(12px, 1.4vw, 22px)',
          animation: `${reverse ? 'marqueeR' : 'marqueeL'} 55s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            data-cursor
            style={{
              flexShrink: 0,
              width: 'clamp(220px, 24vw, 360px)',
              aspectRatio: '4 / 3',
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#0a0a0a',
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: 'block', userSelect: 'none',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      style={{
        background: '#000',
        padding: '0 0 clamp(40px, 7vh, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Flat, continuously moving two-row showcase (marquee style) */}
      <Row items={rowTop} />
      <div style={{ height: 'clamp(12px, 1.4vw, 22px)' }} />
      <Row items={rowBot} reverse />
    </section>
  )
}
