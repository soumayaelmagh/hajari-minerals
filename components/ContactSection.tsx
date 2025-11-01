"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, BadgeDollarSign, PackageOpen,
  Clock4, MapPin, Paperclip, CheckCircle2, TriangleAlert
} from "lucide-react";

/** ---------- Config ---------- */
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

export default function ContactSection() {
  // core fields
  const [topic, setTopic] = useState("general");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  // sliders + manual numeric inputs
  const [volume, setVolume] = useState<number>(25);
  const [budget, setBudget] = useState<number>(200_000);

  const [message, setMessage] = useState("");

  // fixed channel: email only
  const channel: "email" = "email";

  // UX states
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [errorMsg, setErrorMsg] = useState("");

  // anti-spam honeypot
  const honeyRef = useRef<HTMLInputElement>(null);

  const canSend = useMemo(() => {
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return name.trim().length > 1 && okEmail && message.trim().length > 3;
  }, [name, email, message]);

  async function submitContact() {
    if (!canSend || isSending) return;
    if (honeyRef.current?.value) return; // bot

    setIsSending(true);
    setSent(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _honey: "",
          name,
          company,
          email,
          topic: labelFor(topic),
          volume,
          budget,
          message,
          incoterm: "FOB",
          destination: "",
          channel, // always "email"
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSent("err");
        setErrorMsg(data?.error || "Failed to send");
        return;
      }

      setSent("ok");
      // Optional reset
      // setName(""); setCompany(""); setEmail(""); setMessage("");
      // setVolume(500); setBudget(200000); setTopic("general");
    } catch (e: any) {
      setSent("err");
      setErrorMsg(e?.message || "Network error");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/gold-dust.webp')] bg-cover bg-center pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14">

        {/* LEFT: Conversational form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Connect <span className="text-[#c2a165]">with Our Team</span>
            </h2>
            <p className="text-white/75 max-w-2xl">
              Share your specs, target schedule, and preferences. We’ll align sampling and shipment
              terms (FOB/CIF) and reply with actionable next steps.
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

          {/* Form card */}
          <div className="bg-[#141414]/90 border border-white/10 rounded-2xl p-6 space-y-6">
            {/* Honeypot */}
            <input
              ref={honeyRef}
              type="text"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Your name" value={name} onChange={setName} placeholder="Jane Doe" />
              <Field label="Company" value={company} onChange={setCompany} placeholder="Acme Metals Ltd." />
            </div>
            <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@email.com" />

            {/* Sliders + manual inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <DualNumberField
                label="Estimated monthly volume (metric tons)"
                value={volume}
                onChange={setVolume}
                min={25}
                max={10000}
                step={25}
                unit="mt"
              />
              <DualNumberField
                label="Estimated budget (USD)"
                value={budget}
                onChange={setBudget}
                min={10_000}
                max={1_000_000}
                step={10_000}
                icon={<BadgeDollarSign size={16} className="text-[#c2a165]" />}
                unit="$"
              />
            </div>

            <TextArea
              label="What should we know?"
              value={message}
              onChange={setMessage}
              placeholder="Share grade/purity targets, sizing, timeline, inspection requirements…"
            />

            {/* Preferred channel (email only) */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <span>Preferred contact method:</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c2a165] bg-[#c2a165] text-black">
                <Mail size={16} /> Email
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={submitContact}
                disabled={!canSend || isSending}
                className={`px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition
                  ${!canSend || isSending
                    ? "bg-[#c2a165]/50 text-black/70 cursor-not-allowed"
                    : "bg-[#c2a165] text-black hover:bg-[#a98755]"}`}
              >
                {isSending ? "Sending…" : <> <Mail size={18} /> Send enquiry </>}
              </button>

              <a
                href="/products"
                className="px-5 py-3 rounded-lg bg-[#c2a165] text-black font-semibold hover:bg-[#a98755] transition inline-flex items-center gap-2"
              >
                <PackageOpen size={18} /> View products
              </a>

              <button
                onClick={() => {
                  setName(""); setCompany(""); setEmail(""); setMessage("");
                  setVolume(25); setBudget(200000); setTopic("general");
                  setSent(null); setErrorMsg("");
                }}
                className="px-5 py-3 rounded-lg border border-[#c2a165]/50 text-white hover:bg-[#c2a165] hover:text-black transition"
              >
                Reset
              </button>
            </div>

            {/* Feedback */}
            {sent === "ok" && (
              <p className="mt-3 text-green-400 text-sm inline-flex items-center gap-2">
                <CheckCircle2 size={16} /> Thanks! Your request was sent. We’ll reply shortly.
              </p>
            )}
            {sent === "err" && (
              <p className="mt-3 text-red-400 text-sm inline-flex items-center gap-2">
                <TriangleAlert size={16} /> Couldn’t send. {errorMsg}
              </p>
            )}

            {/* Attachment note */}
            <p className="text-xs text-white/50 flex items-center gap-2">
              <Paperclip size={14} /> Attach technical documents in your reply email, if needed.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Quick info / timeline */}
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <InfoCard
              icon={<MapPin className="text-[#c2a165]" size={22} />}
              title="Logistics"
              body={
                 <ul className="list-inside space-y-1 text-white/75 text-sm">
                  <li>Shipments coordinated via Port Sudan under FOB/CIF.</li>
                  <li>Atayib Salih Street, Manshiya, Khartoum, Sudan.</li>
                  <li>Hai Al Matar, portsudan, Sudan</li> 
                 </ul>}

            />
            <InfoCard
              icon={<Clock4 className="text-[#c2a165]" size={22} />}
              title="Process flow"
              body={
                <ol className="list-decimal list-inside space-y-1 text-white/75 text-sm">
                  <li>Inquiry and Specification: Clients share their mineral requirements, preferred grade, and processing level. Our team reviews specifications and confirms availability from our production sites.</li>
                  <li>Quotation and Agreement: We issue a detailed quotation covering product specifications, delivery terms, and pricing. Once both sides agree, a supply contract is signed under internationally recognized trade terms.</li>
                  <li>Sampling and Quality Verification: Before shipment, we conduct testing to confirm product quality. Samples can be provided for client review or independent verification prior to final order confirmation.</li>
                  <li>Logistics and Export Preparation: Our operations team handles transport to Port Sudan and prepares all required export documentation in line with international standards.</li>
                  <li>Delivery Options: We offer flexible delivery terms. Clients may choose FOB Port Sudan or CIF to destination port, depending on their logistics preference.</li>
                  <li>Payment and After-Sales Support: Payment follows the agreed contract terms. We maintain transparent communication from order to delivery to ensure a smooth and reliable experience.</li>
                </ol>
              }
            />
          </div>

          {/* Slim map banner */}
          <div className="mt-8 p-0.5 rounded-xl bg-linear-to-r from-[#c2a165]/30 to-transparent">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="Port Sudan Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.085195141776!2d37.21036301509894!3d19.61633824142044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16931f0073c4e1ad%3A0x2545a5012634eebc!2sPort%20Sudan%2C%20Sudan!5e0!3m2!1sen!2sus!4v1705250000000!5m2!1sen!2sus"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

/* ---------------- small subcomponents ---------------- */

function Field({
  label, value, onChange, placeholder, type = "text",
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
  label, value, onChange, placeholder,
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

/** Slider + manual number input */
function DualNumberField({
  label, value, onChange, min, max, step, icon, unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  icon?: React.ReactNode;
  unit?: string;
}) {
  function handleTyped(input: string) {
    // Remove commas or spaces, parse to number
    const n = Number(input.replace(/[, ]/g, ""));
    if (Number.isNaN(n)) return;
    onChange(Math.min(max, Math.max(min, n)));
  }

  // Format with commas for display
  const formattedValue = value.toLocaleString();

  return (
    <label className="block text-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white/70">
          {icon} <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {unit && <span className="text-white/40 text-xs">{unit}</span>}
          <input
            type="text"
            inputMode="numeric"
            value={formattedValue}
            onChange={(e) => handleTyped(e.target.value)}
            className="w-28 rounded-md bg-[#0f0f0f] border border-white/10 px-2 py-1.5 text-right text-white
                       focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60"
          />
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#c2a165]"
      />
    </label>
  );
}


function InfoCard({
  icon, title, body,
}: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
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

/* helper */
function labelFor(value: string) {
  return PRODUCT_OPTIONS.find((p) => p.value === value)?.label || "General enquiry";
}
