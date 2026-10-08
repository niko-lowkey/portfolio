export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: "What do you do?",
    a: "I build GoHighLevel systems that help businesses stop losing leads to manual follow-up: appointment booking funnels, automated follow-ups, CRM setups, and GHL ecommerce stores, with basic Zapier and Make integrations when needed.",
  },
  {
    q: "How fast can you start?",
    a: "Small tasks usually start within the week. Bigger projects begin with a kickoff call within two days of approval. I’m in GMT+8 and can work around US and European hours.",
  },
  {
    q: "Do I need to already have GoHighLevel?",
    a: "No. I can build everything inside a GoHighLevel account, whether you already have one or are starting from scratch.",
  },
  {
    q: "How much do you charge?",
    a: "Every business is different. We start with a quick discovery call to see what’s actually needed, then I send a clear proposal with the scope and price. No unnecessary extras.",
  },
  {
    q: "What happens after I write?",
    a: "I review inquiries the same day and reply within one business day. You’ll get a clear plan if I can help, or a straight answer if I can’t.",
  },
]