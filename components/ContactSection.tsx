"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Phone,
  BadgeDollarSign,
  PackageOpen,
  Clock4,
  MapPin,
  Paperclip,
  CheckCircle2,
} from "lucide-react";

/** ============================================
 *  QUICK CONFIG
 *  ============================================ */
const CONTACT_EMAIL = "Maemak.90s@gmail.com"; // Client’s email (from your contract context)
const WHATSAPP_NUMBER = ""; // e.g. "2499XXXXXXXX" (without +). Leave empty to hide the button.

const PRODUCT_OPTIONS = [
  { label: "General enquiry", value: "general" },
  { label: "Iron Ore (Hematite / Magnetite)", value: "iron-ore" },
  { label: "Chromite (High Grade)", value: "chromite" },
  { label: "Tungsten Ore (Wolframite / Scheelite)", value: "tungsten" },
  { label: "Lead Ore", value: "lead-ore" },
  { label: "Manganese Ore", value: "manganese-ore" },
  { label: "Mica (Muscovite / Phlogopite)", value: "mica" },
  { label: "Talc", value: "talc" },
  { label: "Calcium Carbonate (Limestone)", value: "limestone" },
  { label: "Kaolin", value: "kaolin" },
  { label: "Feldspar", value: "feldspar" },
  { label: "Quartz / Silica", value: "quartz" },
];

/** ============================================
 *  VIEW
 *  ============================================ */
export default function ContactSection() {
  const [topic, setTopic] = useState("general");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState(500); // monthly tonnage slider
  const [budget, setBudget] = useState(200000); // USD slider
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `[Hajari Minerals] ${labelFor(topic)} — ${company || name || "New enquiry"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name || "-"}`,
        `Company: ${company || "-"}`,
        `Email: ${email || "-"}`,
        `Topic: ${labelFor(topic)}`,
        `Estimated monthly volume (mt): ${volume}`,
        `Estimated budget (USD): ${budget}`,
        "",
        "Message:",
        message || "-",
      ].join("\n")
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [topic, name, company, email, volume, budget, message]);

  const whatsappHref =
    WHATSAPP_NUMBER &&
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      [
        `Hi Hajari Minerals — I’m interested in ${labelFor(topic)}.`,
        `Name: ${name || "-"}`,
        `Company: ${company || "-"}`,
        `Email: ${email || "-"}`,
        `Volume (mt/month): ${volume}`,
        `Budget (USD): ${budget}`,
        "",
        message || "",
      ].join("\n")
    )}`;

  return (
    <section className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/gold-dust.png')] bg-cover bg-center pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14">
        {/* LEFT: Conversational Form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Let’s talk <span className="text-[#c2a165]">supply</span> & logistics
            </h2>
            <p className="text-white/75 max-w-2xl">
              Tell us what you need and how you like to work. We’ll align specs, sampling, and
              shipment terms (FOB/CIF) and get back with an actionable next step.
            </p>
          </div>

          {/* Topic chips */}
          <div className="flex flex-wrap gap-2">
            {PRODUCT_OPTIONS.map((p) => (
              <button
                key={p.value}
                onClick={() => setTopic(p.value)}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${
                  topic === p.value
                    ? "bg-[#c2a165] text-black border-[#c2a165]"
                    : "border-white/20 text-white/80 hover:border-white/50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Card form */}
          <div className="bg-[#141414]/90 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Your name" value={name} onChange={setName} placeholder="Jane Doe" />
              <Field label="Company" value={company} onChange={setCompany} placeholder="Acme Metals Ltd." />
            </div>
            <Field label="Email" value={email} onChange={setEmail} placeholder="your@email.com" type="email" />

            {/* Sliders */}
            <div className="grid md:grid-cols-2 gap-6">
              <SliderField
                label="Estimated monthly volume (metric tons)"
                value={volume}
                onChange={setVolume}
                min={50}
                max={10000}
                step={50}
              />
              <SliderField
                label="Estimated budget (USD)"
                value={budget}
                onChange={setBudget}
                min={10000}
                max={1000000}
                step={10000}
                icon={<BadgeDollarSign size={16} className="text-[#c2a165]" />}
              />
            </div>

            <TextArea
              label="What should we know?"
              value={message}
              onChange={setMessage}
              placeholder="Share specs, timelines, port preference, inspection requirements..."
            />

            {/* Preferred channel */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-white/70 text-sm">Prefer to be contacted via</span>
              <button
                onClick={() => setChannel("email")}
                className={`px-3 py-1.5 rounded-full border text-sm transition inline-flex items-center gap-2 ${
                  channel === "email"
                    ? "bg-[#c2a165] text-black border-[#c2a165]"
                    : "border-white/20 text-white/80 hover:border-white/50"
                }`}
              >
                <Mail size={16} /> Email
              </button>
              {!!WHATSAPP_NUMBER && (
                <button
                  onClick={() => setChannel("whatsapp")}
                  className={`px-3 py-1.5 rounded-full border text-sm transition inline-flex items-center gap-2 ${
                    channel === "whatsapp"
                      ? "bg-[#c2a165] text-black border-[#c2a165]"
                      : "border-white/20 text-white/80 hover:border-white/50"
                  }`}
                >
                  <MessageCircle size={16} /> WhatsApp
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={channel === "whatsapp" && whatsappHref ? whatsappHref : mailtoHref}
                className="px-5 py-3 rounded-lg bg-[#c2a165] text-black font-semibold hover:bg-[#a98755] transition inline-flex items-center gap-2"
              >
                {channel === "whatsapp" ? (
                  <>
                    <MessageCircle size={18} /> Start conversation
                  </>
                ) : (
                  <>
                    <Mail size={18} /> Send enquiry
                  </>
                )}
              </a>

              <a
                href="/products"
                className="px-5 py-3 rounded-lg bg-[#c2a165] text-black font-semibold hover:bg-[#a98755] transition inline-flex items-center gap-2"
              >
                <PackageOpen size={18} /> View products
              </a>
              <button
                onClick={() => {
                  // quick reset
                  setName(""); setCompany(""); setEmail(""); setMessage("");
                  setVolume(500); setBudget(200000); setTopic("general"); setChannel("email");
                }}
                className="px-5 py-3 rounded-lg border border-[#c2a165]/50 text-white hover:bg-[#c2a165] hover:text-black transition inline-flex items-center gap-2"
              >
                <CheckCircle2 size={18} /> Reset
              </button>
            </div>

            {/* Attachment note */}
            <p className="text-xs text-white/50 flex items-center gap-2">
              <Paperclip size={14} /> Attach technical documents in your email reply, if needed.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Quick Info / Timeline */}
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <InfoCard
              icon={<Mail className="text-[#c2a165]" size={22} />}
              title="Email us"
              body={
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-[#c2a165]/60 underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              }
            />
            <InfoCard
              icon={<MapPin className="text-[#c2a165]" size={22} />}
              title="Logistics"
              body={<>Shipments coordinated through <strong>Port Sudan</strong> under FOB/CIF.</>}
            />
            <InfoCard
              icon={<Clock4 className="text-[#c2a165]" size={22} />}
              title="Typical flow"
              body={
                <ol className="list-decimal list-inside space-y-1 text-white/75 text-sm">
                  <li>Share specs & target schedule</li>
                  <li>Sampling / indicative analysis</li>
                  <li>Commercial terms & documentation</li>
                  <li>Shipment & tracking updates</li>
                </ol>
              }
            />
            {!!WHATSAPP_NUMBER && (
              <InfoCard
                icon={<Phone className="text-[#c2a165]" size={22} />}
                title="WhatsApp"
                body={
                  <a
                    href={whatsappHref || "#"}
                    className="underline decoration-[#c2a165]/60 underline-offset-4"
                  >
                    Message on WhatsApp
                  </a>
                }
              />
            )}
          </div>

          {/* Slim map banner */}
          <div className="h-36 rounded-xl overflow-hidden border border-white/10 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/maps/port-sudan.jpg"
              alt="Port Sudan map"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-3 text-sm">
              <span className="px-2 py-1 rounded bg-white text-black">Port Sudan</span>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

/** ============================================
 *  SMALL SUB-COMPONENTS
 *  ============================================ */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-white/70">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-white/70">{label}</span>
      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60 resize-y"
      />
    </label>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <div className="flex items-center gap-2 text-white/70">
        {icon} <span>{label}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-[#c2a165]"
        />
        <span className="px-2 py-1 rounded bg-white/10 border border-white/10">
          {value.toLocaleString()}
        </span>
      </div>
    </label>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="bg-[#141414]/90 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <div className="text-white/75 text-sm">{body}</div>
    </div>
  );
}

/** helpers */
function labelFor(value: string) {
  return PRODUCT_OPTIONS.find((p) => p.value === value)?.label || "General enquiry";
}
