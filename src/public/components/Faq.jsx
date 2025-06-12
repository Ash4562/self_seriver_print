import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does it work?",
    answer:
      "OpenPhone uses Internet to provide you with additional phone numbers on top of your existing devices. Download OpenPhone on your mobile or use it on the web to make and receive calls and messages.",
  },
  {
    question: "What devices do you support?",
    answer: "We support Android, iOS, Windows, and MacOS platforms.",
  },
  {
    question: "What devices do you support?",
    answer: "We support Android, iOS, Windows, and MacOS platforms.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-white p-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 text-transparent bg-gradient-to-r from-[#00AFEF] to-[#ED008D] bg-clip-text font-jura">
          Frequently asked questions
        </h2>
        <p className="text-sm text-gray-700 mb-10">
          Can’t find the answer here? Reach out to us
        </p>
      </div>

      <div className="max-w-5xl mx-auto divide-y border-t border-b">
        {faqs.map((faq, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span
                className={`text-sm md:text-xl font-semibold ${
                  index === openIndex
                    ? "text-pink-500"
                    : "text-blue-500 hover:text-pink-500"
                }`}
              >
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  index === openIndex ? "rotate-180" : ""
                }`}
              />
            </button>

            {index === openIndex && (
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
