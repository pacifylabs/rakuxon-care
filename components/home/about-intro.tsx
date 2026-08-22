import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { PHOTOS } from "@/lib/images";

/* Reference section 4: centred eyebrow + heading + subtext, then one wide
   rounded feature image beneath. */
export function AboutIntro() {
  return (
    <section id="about" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-pill bg-navy-100 px-3 py-1 text-overline text-navy-800 uppercase">
            About
          </span>
          <h2 className="text-h2">Care that feels like care</h2>
          <p className="measure text-ink-500">
            There is a difference between support that is delivered and support
            that is felt. Rakuxon brings that difference into the home — so
            families get reassurance, and the person being supported keeps their
            dignity.
          </p>
        </div>
        <Photo
          photo={PHOTOS.aboutWide}
          ratio="16/9"
          duotone="navy"
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="mt-10 shadow-card"
        />
      </Container>
    </section>
  );
}
