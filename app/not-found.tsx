import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <div className="flex max-w-xl flex-col gap-6">
          <span className="text-overline text-ink-500 uppercase">
            Error 404
          </span>
          <h1 className="text-h1">We cannot find that page</h1>
          <p className="text-body-lg text-ink-500">
            The link may be out of date, or the page may have moved. Both of the
            main routes through the site are below.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/care" className={buttonClasses({ tone: "care" })}>
              Find care
            </Link>
            <Link href="/agency" className={buttonClasses({})}>
              For care businesses
            </Link>
            <Link
              href="/contact"
              className={buttonClasses({ variant: "secondary" })}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
