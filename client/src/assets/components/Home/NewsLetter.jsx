import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function NewsLetter() {
  const [mail, setMail] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for subscribing to ReWear!");
    setMail("");
  };

  return (
    <section className="raleway flex justify-center bg-[#7c3aed]">
      <div className="my-10 w-full max-w-3xl px-6 text-center">

        <div className="flex justify-center mb-4">
          <div className="bg-white/10 p-3 rounded-full">
            <Mail size={30} className="text-white" />
          </div>
        </div>

        <h2 className="text-xl md:text-3xl font-bold text-white mb-4">
          Stay Updated with ReWear
        </h2>

        <p className="text-sm md:text-base text-purple-100 mx-auto max-w-xl">
          Get updates about new clothing listings, swap opportunities,
          and sustainable fashion tips directly in your inbox.
        </p>

        <form
          onSubmit={handleOnSubmit}
          className="flex mx-auto w-full max-w-md rounded-xl overflow-hidden bg-white shadow-sm my-8"
        >
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-3 text-sm border-none outline-none text-gray-700"
          />

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-3 text-white bg-purple-900 hover:bg-purple-950 transition font-semibold"
          >
            <span>Subscribe</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-xs text-purple-200">
          Wear. Swap. Repeat. ♻️
        </p>

      </div>
    </section>
  );
}