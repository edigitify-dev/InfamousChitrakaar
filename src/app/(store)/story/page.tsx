import type { Metadata } from "next";
import { IMAGES } from "@/config/images";
import { siteConfig } from "@/config/site";
import { storyContent as s } from "@/data/story";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ArtMotif } from "@/components/ui/Doodles";
import { ButtonLink } from "@/components/ui/Button";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Polaroid } from "@/components/ui/Polaroid";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How The Infamous Chitrakar started, plus shipping, returns, FAQ and contact details.",
};

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 text-[0.92rem] leading-relaxed text-ink/80">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-vermilion" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function StoryPage() {
  return (
    <div className="paper min-h-screen px-6 pb-24 pt-32 lg:px-[5%]">
      <div className="mx-auto max-w-[1100px]">
        {/* Story */}
        <section className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="label text-ink/60">About</p>
            <div className="mt-2">
              <AccentHeading text={s.heading} />
            </div>
            <div className="mt-6 max-w-xl space-y-4 text-[0.98rem] leading-relaxed text-ink/80">
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <HandwrittenNote rotate={-3} className="mt-8 inline-block text-[14px]">
              {s.note}
            </HandwrittenNote>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Polaroid
              src={IMAGES.signature.artist}
              alt="The artist at work"
              caption="At the desk"
              rotate={3}
              placeholder={<ArtMotif kind="face" className="mx-auto h-full w-4/5 p-3" />}
            />
          </div>
        </section>

        {/* Process */}
        <section className="mt-24 grid gap-8 sm:grid-cols-3" aria-label="How it's made">
          {s.process.map((p, i) => (
            <div key={p.title} className="border-t-2 border-ink pt-4">
              <p className="label text-ink/50">0{i + 1}</p>
              <h2 className="mt-1 font-display text-2xl italic">{p.title}</h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/75">{p.body}</p>
            </div>
          ))}
        </section>

        {/* Shipping + Returns */}
        <div className="mt-24 grid gap-14 lg:grid-cols-2">
          <section id="shipping" className="scroll-mt-28">
            <h2 className="font-display text-3xl">
              Shipping<em className="text-vermilion">.</em>
            </h2>
            <PolicyList items={s.shipping} />
          </section>
          <section id="returns" className="scroll-mt-28">
            <h2 className="font-display text-3xl">
              Returns<em className="text-vermilion">.</em>
            </h2>
            <PolicyList items={s.returns} />
          </section>
        </div>

        {/* FAQ */}
        <section id="faq" className="mt-24 scroll-mt-28">
          <h2 className="font-display text-3xl">
            FAQ<em className="text-vermilion">.</em>
          </h2>
          <div className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg">
                  {f.q}
                  <span aria-hidden className="text-vermilion transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-24 scroll-mt-28 bg-ink p-8 text-paper sm:p-12">
          <h2 className="font-display text-3xl">
            Say <em className="text-vermilion">hello.</em>
          </h2>
          <p className="mt-3 max-w-md text-[0.92rem] text-paper/75">{s.contact.reply}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${s.contact.email}`} variant="red" arrow>
              {s.contact.email}
            </ButtonLink>
            <ButtonLink href={siteConfig.instagramUrl} variant="light" arrow>
              {s.contact.instagram}
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}
