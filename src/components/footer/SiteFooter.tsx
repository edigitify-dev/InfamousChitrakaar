import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { FooterArtistReel } from "@/components/footer/FooterArtistReel";

function Column({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="label mb-4 text-paper/60">{title}</h3>
      <ul className="space-y-2.5 text-[0.85rem]">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-paper/85 transition-colors hover:text-vermilion"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-[5%]">
        <div>
          <BrandLogo size="sm" className="text-paper" />
          <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-paper/70">
            {siteConfig.description}
          </p>
          <p className="mt-4 font-hand text-xl text-sun">
            {siteConfig.tagline}
          </p>
        </div>
        <Column title="Shop" links={siteConfig.footer.shop} />
        <Column title="Info" links={siteConfig.footer.info} />
        <Column title="Follow" links={siteConfig.footer.follow} />
      </div>

      <FooterArtistReel />

      <div className="border-t border-paper/10 px-6 py-5 text-center text-[0.75rem] text-paper/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
