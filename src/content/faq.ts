// FAQ content for the Services page — also powers FAQPage JSON-LD schema.
// Answers are written as plain, specific factual statements (good for AI/LLM
// citation per the LLMO checklist), built only from confirmed source material.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "What areas does Witherspoon Home Care serve?",
    answer:
      "Witherspoon Home Care provides in-home care services throughout Forsyth County, NC, including Winston-Salem and the surrounding communities.",
  },
  {
    question: "What services do your caregivers provide?",
    answer:
      "Our caregivers provide companion care and safety sitting, rehab support for PT/OT home exercises, medication reminders, meal prep and hydration/feeding help, help with dressing and daily hygiene, errands like pharmacy and grocery runs, and light housekeeping.",
  },
  {
    question: "How much does in-home care cost compared to a facility?",
    answer:
      "In-home care in North Carolina averages around $28 per hour, which is often far less over a month than the average cost of an assisted living facility (about $5,769 per month), while allowing your loved one to stay in their own home.",
  },
  {
    question: "Is in-home care a good option for a loved one with dementia?",
    answer:
      "Yes. Staying in familiar surroundings can reduce anxiety and confusion for people living with dementia or cognitive decline, which is one of the reasons families choose in-home care over relocating a loved one.",
  },
  {
    question: "How do I get started with Witherspoon Home Care?",
    answer:
      "Call 336-842-9744 or email witherspoonhomecare@gmail.com to talk through your family's needs. You can also fill out the form on our Contact page and we'll follow up with you.",
  },
  {
    question: "Do you provide medical care or nursing services?",
    answer:
      "Witherspoon Home Care focuses on non-medical daily support — companionship, safety supervision, medication reminders, and help with daily activities. We support and reinforce the plan set by your loved one's medical team rather than replacing skilled nursing or clinical care.",
  },
];
