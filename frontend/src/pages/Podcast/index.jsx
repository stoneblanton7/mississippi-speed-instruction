export default function Podcast() {
  return (
    <>
      <section className="relative bg-bg pt-32 pb-12 lg:pt-44 lg:pb-16 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The MSI Podcast
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}
          >
            Get the latest
            <br />
            on MSI.
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed">
            Long-form conversations with coaches, athletes, and the parents
            behind them — straight from the studio in Jackson.
          </p>
        </div>
      </section>

      <section className="bg-bg py-24 lg:py-32 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-accent mb-8"
          />
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Coming Soon
          </p>
          <h2 className="font-heading text-4xl lg:text-6xl uppercase mt-6 leading-[1.0]">
            The first episodes drop soon.
          </h2>
          <p className="font-body text-text-muted text-lg mt-8 leading-relaxed">
            We're producing five episodes right now and rolling them out over
            the coming weeks. Check back here — or follow{' '}
            <span className="text-text font-semibold">@mississippispeed</span>{' '}
            on YouTube to catch the launch.
          </p>
        </div>
      </section>
    </>
  );
}
