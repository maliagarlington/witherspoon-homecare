"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";
import { ChevronDownIcon } from "./icons";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-pink-tint-2 rounded-2xl border border-brand-pink-tint-2 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-lg font-bold text-brand-ink sm:px-7"
              >
                {item.question}
                <ChevronDownIcon
                  className={`h-6 w-6 shrink-0 text-brand-pink-deep transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 text-brand-slate sm:px-7"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
