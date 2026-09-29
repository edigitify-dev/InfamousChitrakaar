"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { IMAGES } from "@/config/images";
import { ArtImage } from "@/components/ui/ArtImage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { SectionContent } from "@/types/homepage";

type Status = "idle" | "loading" | "done" | "error";

export function NewsletterSection({ content }: { content: SectionContent }) {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(({ gsap, reduced, desktop }) => {
    if (desktop && !reduced) {
      gsap.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.12, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
    gsap.from("[data-news]", {
      opacity: 0,
      y: reduced ? 0 : 24,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
    });
  }, ref);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} aria-label="Newsletter" className="relative isolate overflow-hidden bg-[#1a1420] text-paper">
      <div ref={bgRef} className="absolute inset-0 -z-10 will-change-transform">
        <ArtImage
          src={IMAGES.newsletter.skyline}
          alt=""
          fallback="linear-gradient(180deg,#2a2036 0%,#5a3a4a 45%,#c9673f 78%,#1a1420 100%)"
          className="h-full w-full"
        />
      </div>
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <p data-news className="label mb-4 text-paper/70">{content.subheading ?? "Join the chaos"}</p>
        <h2 data-news className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-tight">{content.heading}</h2>
        <p data-news className="mt-4 text-[0.9rem] text-paper/80">{content.description}</p>
        <form data-news onSubmit={submit} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <Input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1"
          />
          <Button type="submit" variant="red" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : (content.ctaText ?? "Subscribe")}
          </Button>
        </form>
        <p role="status" className="mt-3 h-5 text-[0.8rem] text-paper/80">
          {status === "done" && "You're in. Welcome to the studio."}
          {status === "error" && "Something went wrong. Try again."}
        </p>
      </div>
    </section>
  );
}
