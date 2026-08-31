export function TestimonialCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <figure className="rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm sm:p-8">
      <blockquote className="text-lg text-brand-ink">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-4 font-heading font-bold text-brand-pink-deep">
        {author}
      </figcaption>
    </figure>
  );
}
