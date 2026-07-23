import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the School Management System?",
    answer:
      "The School Management System is a platform that helps schools manage students, teachers, classes, attendance, examinations, and reports from one centralized dashboard.",
  },
  {
    question: "Who can use this system?",
    answer:
      "Administrators, teachers, and school staff can use the system. Each user receives different permissions based on their assigned role.",
  },
  {
    question: "Can teachers manage attendance?",
    answer:
      "Yes. Teachers can record daily attendance, track student participation, and administrators can review attendance reports.",
  },
  {
    question: "Does it support examinations and grades?",
    answer:
      "Yes. The system allows schools to manage exams, record scores, calculate grades, and generate student reports.",
  },
  {
    question: "Is user information secure?",
    answer:
      "Yes. Authentication and role-based authorization help protect school information and control user access.",
  },
  {
    question: "Can I access it from mobile devices?",
    answer:
      "Yes. The interface is responsive and can be used on desktop, tablet, and mobile devices.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <HelpCircle size={16} />
            FAQ
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about our school management platform.
          </p>
        </div>

        {/* FAQ Items */}
        <Accordion className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-6
                shadow-sm
                transition
                hover:border-blue-300
                hover:shadow-md
              "
            >
              <AccordionTrigger
                className="
                  py-6
                  text-left
                  text-lg
                  font-semibold
                  text-slate-900
                  hover:no-underline
                "
              >
                {faq.question}
              </AccordionTrigger>

              <AccordionContent
                className="
                  pb-6
                  text-base
                  leading-7
                  text-slate-600
                "
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
