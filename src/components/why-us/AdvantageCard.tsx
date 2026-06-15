export function AdvantageCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl text-gold" aria-hidden="true">★</span>
      </div>
      <h3 className="text-why-title text-navy-deep mb-3">{title}</h3>
      <p className="text-body text-gray-body">{body}</p>
    </div>
  );
}
