import { stats } from "@/content/site-content";

export function StatBar() {
  return (
    <section
      aria-label="North Carolina in-home care statistics"
      className="bg-brand-plum py-14"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-heading text-4xl font-extrabold text-brand-gold">
              {stat.value}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {stat.label}
            </p>
            <p className="mt-0.5 text-sm text-white/70">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
