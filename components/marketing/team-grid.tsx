import type { TeamMember } from "@/lib/cms";

/*
 * Currently unused. The team section is commented out in app/about/page.tsx
 * because no team members are named on any source, and inventing people for a
 * regulated care service is not acceptable. The component is kept ready so
 * restoring it is a matter of populating TEAM in lib/cms/data.ts and
 * uncommenting the section. TeamMember carries no photo field yet; add one
 * alongside the real headshots. See TODO.md.
 */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (!members.length) return null;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <li
          key={m.name}
          className="flex flex-col gap-4 rounded-lg bg-paper-100 p-5 shadow-card"
        >
          <div className="flex flex-col gap-1">
            <p className="font-display text-h4 text-ink-900">{m.name}</p>
            <p className="text-small text-care-700">{m.role}</p>
          </div>
          <p className="text-small text-ink-500">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}
