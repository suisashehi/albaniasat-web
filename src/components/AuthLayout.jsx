const facts = [
  { value: '7', label: 'Land cover classes' },
  { value: '10 m', label: 'Resolution' },
  { value: '80.94 %', label: 'Accuracy' },
]

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side: contour lines */}
      <div className="relative hidden overflow-hidden bg-neutral-950 md:flex md:w-1/2">
        <svg className="drift absolute -inset-40 h-[calc(100%+20rem)] w-[calc(100%+20rem)] opacity-30">
          <filter id="topo" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.005" numOctaves="3" seed="12">
              {/* Slowly changes the terrain so the lines flow */}
              <animate
                attributeName="baseFrequency"
                values="0.003 0.005; 0.0036 0.0056; 0.003 0.005"
                dur="30s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" />
            <feComponentTransfer>
              <feFuncA
                type="discrete"
                tableValues="0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1"
              />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#topo)" />
        </svg>

        {/* Red glow bottom left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 0% 100%, rgba(191,30,45,0.55), transparent 60%)',
          }}
        />

        <div className="relative flex w-full flex-col justify-between p-12 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">AlbaniaSAT</p>

          <div>
            <h2 className="max-w-md text-4xl font-bold leading-tight">
              {"Europe couldn't see Albania. Now it can."}
            </h2>
            <div className="mt-10 flex gap-10">
              {facts.map((f) => (
                <div key={f.label}>
                  <p className="text-2xl font-bold">{f.value}</p>
                  <p className="text-xs uppercase tracking-wider text-white/60">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: form */}
      <div className="flex w-full items-center justify-center bg-white px-6 md:w-1/2">
        <div className="w-full max-w-md">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-brand md:hidden">
            AlbaniaSAT
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 mb-8 text-gray-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}