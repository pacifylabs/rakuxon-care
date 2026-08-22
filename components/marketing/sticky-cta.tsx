"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonClasses } from "@/components/ui/button";
import { useConsent } from "@/lib/hooks/use-consent";
import { useScrolled } from "@/lib/hooks/use-scrolled";

/* §4.17: persistent but unobtrusive. Appears once the hero is behind you,
   hides on the pages whose whole purpose is the same action, and stays out
   of the way until the cookie banner has been dismissed so the two never
   stack. */
export function StickyCta() {
  const pastHero = useScrolled(600);
  const consent = useConsent();
  const pathname = usePathname();

  const suppressed = pathname === "/contact";
  if (suppressed || !pastHero || consent === null) return null;

  return (
    <div className="fixed right-4 bottom-4 z-30 lg:hidden">
      <Link
        href="/contact"
        className={buttonClasses({ className: "shadow-card" })}
      >
        Get in touch
      </Link>
    </div>
  );
}
