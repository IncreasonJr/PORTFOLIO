"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate sending email api query
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 relative scroll-mt-20 border-t border-card-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-highlight mx-auto rounded-full mb-4" />
          <p className="max-w-xl mx-auto text-foreground/75 text-pretty text-sm sm:text-base">
            Have a project in mind or want to collaborate? Fill out the form below or reach out via socials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left panel: Info & Socials */}
          <div className="lg:col-span-2 space-y-8 lg:pr-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Connection Details
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed text-pretty">
                Feel free to email me directly or explore my open-source repositories and online profile. I am always open to discussing new models, tools, or architectural layouts.
              </p>
            </div>

            {/* Communication details list */}
            <div className="space-y-5">
              <div className="flex items-center space-x-4 p-4 rounded-2xl glass border border-card-border">
                <div className="p-2.5 rounded-xl border border-accent/15 bg-accent/5 text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wide">
                    Email Address
                  </h4>
                  <a href="mailto:delatorcaleb3@gmail.com" className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
                    delatorcaleb3@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels (min-width: 44px tap targets) */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wide">
                Social Profiles
              </h4>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/IncreasonJr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass border border-card-border text-foreground/80 hover:text-accent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/caleb-delator-78675b411"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass border border-card-border text-foreground/80 hover:text-accent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="inline-flex p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full mb-2">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70 max-w-sm mx-auto">
                      Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold shadow hover:scale-105 transition-transform"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Name & Email Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-foreground/80 tracking-wide uppercase">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          disabled={status === "sending"}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-card-border bg-card-bg/40 text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50 text-sm [&:user-invalid]:border-red-500 [&:user-valid]:border-green-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-foreground/80 tracking-wide uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          disabled={status === "sending"}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-card-border bg-card-bg/40 text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50 text-sm [&:user-invalid]:border-red-500 [&:user-valid]:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-foreground/80 tracking-wide uppercase">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={status === "sending"}
                        placeholder="Collaboration Opportunities"
                        className="w-full px-4 py-3 rounded-xl border border-card-border bg-card-bg/40 text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50 text-sm [&:user-invalid]:border-red-500 [&:user-valid]:border-green-500"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-foreground/80 tracking-wide uppercase">
                        Message Content
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={status === "sending"}
                        placeholder="Describe your project, team, or request..."
                        className="w-full px-4 py-3 rounded-xl border border-card-border bg-card-bg/40 text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50 text-sm resize-none [&:user-invalid]:border-red-500 [&:user-valid]:border-green-500"
                      />
                    </div>

                    {/* Submit Button (min-width: 44px tap target height) */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-4.5 px-6 rounded-xl bg-accent text-accent-foreground font-semibold flex items-center justify-center space-x-2.5 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-accent/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 min-h-[48px]"
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
