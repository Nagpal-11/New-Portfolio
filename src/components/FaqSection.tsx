import React, { useState } from 'react';
import { FAQ_LIST } from '../data/portfolioData';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 sm:py-36 bg-[#f3f3f0] border-b border-neutral-200/80">
      {/* Structural Architectural Grid Lines */}
      <div className="architectural-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header Meta */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase pb-6 border-b border-neutral-200/80">
          <span className="w-2 h-2 bg-blue-600 inline-block" />
          <span className="text-neutral-900">05 // CANDID DIALOGUE</span>
          <span className="text-neutral-300">/</span>
          <span>HIRING & COLLABORATION FAQ</span>
        </div>

        {/* Section Headline matching Brikken */}
        <div className="pt-10 pb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-neutral-950">
            Questions worth asking before we work together.
          </h2>
          <p className="text-base sm:text-xl text-neutral-600 max-w-3xl leading-relaxed">
            Not the usual generic FAQs. Just the honest questions engineering leads and technical recruiters often ask when evaluating talent for high-impact teams.
          </p>
        </div>

        {/* Accordion List with Hairline Borders */}
        <div className="border-t border-neutral-300">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-neutral-300 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-8 text-left flex items-start justify-between gap-6 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm text-neutral-400 font-semibold pt-1">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 text-neutral-700 group-hover:border-black transition-colors">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {/* Answer Drawer */}
                {isOpen && (
                  <div className="pb-8 pl-8 sm:pl-12 pr-4 sm:pr-12 text-neutral-700 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-base sm:text-lg font-bold text-neutral-950">
                      {faq.answerPrefix}
                    </p>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl">
                      {faq.answerBody}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
