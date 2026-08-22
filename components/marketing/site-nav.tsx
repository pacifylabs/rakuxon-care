"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/marketing/logo";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/marketing/theme-toggle";

export interface NavCluster {
  label: string;
  links: { label: string; href: string }[];
}

export interface NavLane {
  /** Mega-menu trigger, e.g. "For individuals & families". */
  trigger: string;
  eyebrow: string;
  label: string;
  href: string;
  blurb: string;
  clusters: NavCluster[];
}

/* 04_SITE_ARCHITECTURE §2 — global nav. Home is kept ahead of the two lane
   menus at the user's request; the doc's list starts at the lane menus. */
const TAIL_LINKS = [
  { label: "About & CQC", href: "/about" },
];

function LaneMenu({ lane, care }: { lane: NavLane; care: boolean }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="group inline-flex min-h-11 items-center gap-1.5 rounded-pill px-2.5 text-body whitespace-nowrap text-ink-700 transition-colors hover:bg-navy-50 hover:text-navy-800 data-[state=open]:bg-navy-50 data-[state=open]:text-navy-800 xl:px-3">
        {lane.trigger}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </NavigationMenu.Trigger>

      {/* Width clamped to the viewport so the panel can never overflow. */}
      <NavigationMenu.Content className="absolute top-full left-1/2 z-50 w-[min(64rem,calc(100vw-3rem))] -translate-x-1/2">
        <div className="mt-3 rounded-lg border border-navy-100 bg-paper-100 p-6 shadow-card">
          <NavigationMenu.Link asChild>
            <Link
              href={lane.href}
              className={cn(
                "block rounded-md p-4 transition-colors",
                care
                  ? "bg-care-50 hover:bg-care-100"
                  : "bg-navy-50 hover:bg-navy-100",
              )}
            >
              <span
                className={cn(
                  "block text-overline uppercase",
                  care ? "text-care-700" : "text-navy-800",
                )}
              >
                {lane.eyebrow}
              </span>
              <span className="font-display mt-1 block text-h4 text-ink-900">
                {lane.label}
              </span>
              <span className="mt-1 block text-small text-ink-500">
                {lane.blurb}
              </span>
            </Link>
          </NavigationMenu.Link>

          <div
            className={cn(
              "mt-5 grid gap-x-6 gap-y-5",
              lane.clusters.length > 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {lane.clusters.map((c) => (
              <div key={c.label} className="flex min-w-0 flex-col gap-1">
                <p
                  className={cn(
                    "px-3 text-overline uppercase",
                    care ? "text-care-700" : "text-navy-800",
                  )}
                >
                  {c.label}
                </p>
                <ul className="flex min-w-0 flex-col">
                  {c.links.map((l) => (
                    <li key={l.href} className="min-w-0">
                      <NavigationMenu.Link asChild>
                        <Link
                          href={l.href}
                          className="group/link flex min-h-11 min-w-0 items-center justify-between gap-2 rounded-md px-3 py-2 text-ink-700 transition-colors hover:bg-paper-0 hover:text-navy-800"
                        >
                          {/* Wraps rather than truncating — several cluster
                              labels are longer than a third of the panel and
                              an ellipsis hides which service the link is. */}
                          <span>{l.label}</span>
                          <ChevronRight
                            className="size-4 shrink-0 text-ink-300 opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

export function SiteNav({
  lanes,
}: {
  lanes: { care: NavLane; agency: NavLane };
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const scrolled = useScrolled(8);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-paper-50/90 backdrop-blur transition-shadow",
        scrolled && "shadow-card",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[padding] duration-200",
            scrolled ? "py-2" : "py-3 md:py-4",
          )}
        >
          <Link
            href="/"
            aria-label="Rakuxon Care — home"
            className="flex min-h-11 shrink-0 items-center rounded-sm py-1"
          >
            <Logo variant="auto" priority className="h-8 md:h-10" />
          </Link>

          {/* Desktop nav. Careers and Contact left the bar, so the four
              remaining items fit from lg; the drawer covers below that. */}
          <NavigationMenu.Root
            className="relative hidden lg:flex lg:flex-1 lg:justify-center"
            delayDuration={0}
          >
            <NavigationMenu.List className="flex items-center gap-0.5">
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    href="/"
                    className="inline-flex min-h-11 items-center rounded-pill px-3 text-body whitespace-nowrap text-ink-700 transition-colors hover:bg-navy-50 hover:text-navy-800"
                  >
                    Home
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <LaneMenu lane={lanes.care} care />
              <LaneMenu lane={lanes.agency} care={false} />

              {TAIL_LINKS.map((l) => (
                <NavigationMenu.Item key={l.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-11 items-center rounded-pill px-3 text-body whitespace-nowrap text-ink-700 transition-colors hover:bg-navy-50 hover:text-navy-800"
                    >
                      {l.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className={cn(buttonClasses({ size: "sm" }), "whitespace-nowrap")}
            >
              Get in touch
            </Link>
          </div>

          {/* ---------------- Below xl ---------------- */}
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <ThemeToggle className="lg:hidden" />
            <Dialog.Trigger
              aria-label="Open menu"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-pill border-2 border-navy-800 px-3 text-small font-semibold text-navy-800 transition-colors hover:bg-navy-50 sm:px-4 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
              <span className="hidden sm:inline">Menu</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-900/40 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-96 flex-col overflow-y-auto bg-paper-50 shadow-card focus:outline-none">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="flex items-center justify-between border-b border-navy-100 px-5 py-3">
                  <Logo variant="auto" className="h-8" />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center rounded-pill text-ink-700 transition-colors hover:bg-navy-50"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </div>

                <div className="flex flex-col gap-6 px-5 py-6">
                  {/* Lane split first — 04_SITE_ARCHITECTURE §2. */}
                  <div className="grid gap-3">
                    {[
                      { lane: lanes.care, care: true },
                      { lane: lanes.agency, care: false },
                    ].map(({ lane, care }) => (
                      <Link
                        key={lane.href}
                        href={lane.href}
                        onClick={closeDrawer}
                        className={cn(
                          "rounded-md p-4 transition-colors",
                          care
                            ? "bg-care-50 hover:bg-care-100"
                            : "bg-navy-50 hover:bg-navy-100",
                        )}
                      >
                        <span
                          className={cn(
                            "block text-overline uppercase",
                            care ? "text-care-700" : "text-navy-800",
                          )}
                        >
                          {lane.eyebrow}
                        </span>
                        <span className="font-display mt-1 block text-h4 text-ink-900">
                          {lane.label}
                        </span>
                        <span className="mt-1 block text-small text-ink-500">
                          {lane.blurb}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Collapsed by default. Expanding every cluster inline
                      put ~39 links in one scroll; as an accordion the drawer
                      opens to 8 rows and the reader chooses what to expand. */}
                  {[
                    { lane: lanes.care, care: true },
                    { lane: lanes.agency, care: false },
                  ].map(({ lane, care }) => (
                    <div key={lane.href} className="flex flex-col gap-2">
                      <p
                        className={cn(
                          "px-3 text-overline uppercase",
                          care ? "text-care-700" : "text-navy-800",
                        )}
                      >
                        {lane.label}
                      </p>
                      <Accordion.Root
                        type="multiple"
                        className="flex flex-col gap-2"
                      >
                        {lane.clusters.map((c) => (
                          <Accordion.Item
                            key={c.label}
                            value={`${lane.href}-${c.label}`}
                            className="overflow-hidden rounded-md border border-navy-100 bg-paper-100"
                          >
                            <Accordion.Header>
                              <Accordion.Trigger className="group flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left text-ink-900 transition-colors hover:bg-navy-50">
                                <span className="flex min-w-0 items-center gap-2">
                                  <span
                                    className={cn(
                                      "size-1.5 shrink-0 rounded-pill",
                                      care ? "bg-brand-care" : "bg-brand-navy",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {c.label}
                                </span>
                                <span className="flex shrink-0 items-center gap-2">
                                  <span className="text-small text-ink-500">
                                    {c.links.length}
                                  </span>
                                  <ChevronDown
                                    className="size-4 text-ink-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                              <ul className="flex flex-col px-2 pb-2">
                                {c.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      onClick={closeDrawer}
                                      className="group/link flex min-h-11 items-center justify-between gap-2 rounded-md px-3 text-ink-700 transition-colors hover:bg-paper-0 hover:text-navy-800"
                                    >
                                      <span>{l.label}</span>
                                      <ChevronRight
                                        className="size-4 shrink-0 text-ink-300 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-navy-800"
                                        aria-hidden="true"
                                      />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Content>
                          </Accordion.Item>
                        ))}
                      </Accordion.Root>
                    </div>
                  ))}

                  <ul className="flex flex-col border-t border-navy-100 pt-4">
                    {[{ label: "Home", href: "/" }, ...TAIL_LINKS].map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={closeDrawer}
                          className="flex min-h-11 items-center rounded-md px-3 text-ink-700 transition-colors hover:bg-paper-0"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-3 border-t border-navy-100 pt-5">
                    <Link
                      href="/contact"
                      onClick={closeDrawer}
                      className={buttonClasses({})}
                    >
                      Get in touch
                    </Link>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}
