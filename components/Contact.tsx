"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 md:py-40 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 scroll-mt-20 border-t border-foreground/10">
      <div className="space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-foreground/50 block">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
            Let&apos;s talk.
          </h2>
          <p className="text-base sm:text-xl text-foreground/60 max-w-xl font-normal pt-2">
            The fastest way to reach me is email.
          </p>
        </div>

        {/* Large Prominent Email Link */}
        <div>
          <a
            href="mailto:delatorcaleb3@gmail.com"
            className="inline-block text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground hover:text-accent underline underline-offset-8 decoration-foreground/20 hover:decoration-accent transition-colors"
          >
            delatorcaleb3@gmail.com
          </a>
        </div>

        {/* Links & Subnote */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm">
          {/* Social Links */}
          <div className="flex items-center space-x-6 font-mono text-foreground/70">
            <a
              href="https://github.com/IncreasonJr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub ↗
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/caleb-delator-78675b411"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Tiny note */}
          <p className="text-xs font-mono text-foreground/40">
            Or find me on GitHub —{" "}
            <a
              href="https://github.com/IncreasonJr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground/70 transition-colors"
            >
              github.com/IncreasonJr
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
