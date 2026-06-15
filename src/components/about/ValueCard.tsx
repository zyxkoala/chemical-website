export function ValueCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="border border-border-light rounded-card p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-xl text-gold" aria-hidden="true">★</span>
      </div>
      <h3 className="text-why-title text-navy-deep mb-2">{title}</h3>
      <p className="text-body text-gray-body">{copy}</p>
    </div>
  );
}
