"use client";

import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { useState } from "react";
import { personalInfo } from "@/lib/data/portfolio-data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    budget: "Select range",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle Zod validation errors from server
        if (data.details) {
          const firstError = Object.values(data.details)[0] as any;
          throw new Error(firstError?._errors?.[0] || data.error || "Validation failed");
        }
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        budget: "Select range",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };


  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-section-padding pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg lg:gap-gutter">
          {/* Left Column: Information */}
          <div className="flex flex-col gap-stack-md pr-0 lg:pr-12">
            <div>
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary">
                Get In Touch
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mt-4 mb-6">
                Have a project in mind?
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                I am currently open to new opportunities. Whether you have a
                question or just want to say hi, I'll try my best to get back to
                you!
              </p>
            </div>
            <div className="inline-flex items-center gap-3 border border-on-surface px-4 py-2 w-fit">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">
                Available for Freelance
              </span>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <ContactInfoItem
                icon="mail"
                label="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
                isPrimary
              />
              <div className="w-full h-px bg-on-surface"></div>
              <ContactInfoItem
                icon="call"
                label="Phone"
                value={personalInfo.phone}
                href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
              />
              <div className="w-full h-px bg-on-surface"></div>
              <ContactInfoItem
                icon="location_on"
                label="Location"
                value={personalInfo.location}
              />
              <div className="w-full h-px bg-on-surface"></div>
              <ContactInfoItem
                icon="schedule"
                label="Response Time"
                value="Usually within 24 hours"
              />
              <div className="w-full h-px bg-on-surface"></div>
              <ContactInfoItem
                icon="badge"
                label="Status"
                value="Transferable Iqama — Available Immediately"
              />
            </div>
            <div className="flex gap-4 mt-8">
              {["X", "Gh", "In"].map((social) => (
                <a
                  key={social}
                  aria-label={social}
                  className="brutalist-button p-3 bg-surface-container-lowest text-on-surface flex items-center justify-center w-12 h-12 font-bold"
                  href="#"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-surface-container-lowest border border-on-surface p-6 md:p-12 h-fit">
            {status === "success" ? (
              <div className="py-20 text-center flex flex-col items-center gap-6">
                <span className="material-symbols-outlined text-6xl text-primary">
                  check_circle
                </span>
                <h2 className="font-headline-md text-headline-md uppercase">
                  Message Sent Successfully
                </h2>
                <p className="font-body-lg text-on-surface-variant">
                  Thank you for reaching out. I will get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="brutalist-button px-8 py-4 font-label-mono text-label-mono uppercase border border-on-surface hover:bg-surface-variant"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
                {status === "error" && (
                  <div className="bg-error-container text-on-error-container p-4 font-label-mono text-xs uppercase border border-on-surface">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                      htmlFor="subject"
                    >
                      Subject
                    </label>
                    <select
                      className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent appearance-none rounded-none"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option>General Inquiry</option>
                      <option>Project Proposal</option>
                      <option>Consulting</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                      htmlFor="budget"
                    >
                      Budget
                    </label>
                    <select
                      className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent appearance-none rounded-none"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    >
                      <option>Select range</option>
                      <option>&lt; $5k</option>
                      <option>$5k - $10k</option>
                      <option>$10k - $25k</option>
                      <option>$25k+</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent"
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>
                <button
                  disabled={status === "loading"}
                  className={`brutalist-button brutalist-button-primary bg-[#030202] text-[#FFFFFF] font-label-mono text-label-mono uppercase tracking-widest p-6 w-full flex justify-between items-center mt-4 ${status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:bg-primary"}`}
                  type="submit"
                >
                  <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactInfoItem({
  icon,
  label,
  value,
  href,
  isPrimary = false,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
  isPrimary?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className={`material-symbols-outlined mt-1 ${isPrimary ? "text-primary" : "text-on-surface"}`}
      >
        {icon}
      </span>
      <div>
        <span className="block font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant mb-1">
          {label}
        </span>
        {href ? (
          <a
            className={`font-body-lg text-body-lg hover:underline font-bold ${isPrimary ? "text-primary" : "text-on-surface"}`}
            href={href}
          >
            {value}
          </a>
        ) : (
          <span className="font-body-lg text-body-lg text-on-surface font-bold">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}
