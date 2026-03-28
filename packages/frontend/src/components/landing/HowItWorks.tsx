const steps = [
  {
    number: '01',
    title: 'Ma\'lumot kiriting',
    description: 'Uy maydoni, xona soni va arxitektura uslubini tanlang',
  },
  {
    number: '02',
    title: 'AI ishlaydi',
    description: 'GPT-4o modelimiz professional uy rejasini yaratadi',
  },
  {
    number: '03',
    title: 'Natijani oling',
    description: '2D plan, rasm va batafsil tavsifni yuklab oling',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Qanday <span className="gradient-text">ishlaydi?</span>
          </h2>
          <p className="text-white/60 text-lg">3 oddiy qadam bilan professional uy rejangizni yarating</p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-4rem)] bg-gradient-to-b from-primary-500/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex gap-6 items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/50">{step.description}</p>
                </div>
                <div className="flex-shrink-0 w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center">
                  <span className="text-primary-400 font-bold text-lg">{step.number}</span>
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
