type Step = { num: string; title: string };

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <section className="py-20 bg-navy-deep text-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mb-3">
                <span className="text-card-title text-gold font-semibold">{step.num}</span>
              </div>
              <h3 className="text-why-title text-white">{step.title}</h3>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[154px] h-[2px] bg-gold/50" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
