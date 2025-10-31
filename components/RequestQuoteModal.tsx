"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";

type Product = {
  name: string;
  slug: string;
  specs?: string[];
};

export default function RequestQuoteModal({
  open,
  onClose,
  product,
  toEmail = "Maemak.90s@gmail.com", // where enquiries go
}: {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  toEmail?: string;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [incoterm, setIncoterm] = useState<"FOB" | "CIF">("FOB");
  const [volume, setVolume] = useState<number | "">("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");

  const initialFocusRef = useRef<HTMLInputElement>(null);

  // focus first field when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => initialFocusRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const mailtoHref = () => {
    if (!product) return "#";
    const subject = encodeURIComponent(`[Quote Request] ${product.name} — ${company || name || ""}`);
    const body = encodeURIComponent(
      [
        `Product: ${product.name}`,
        `Incoterm: ${incoterm}`,
        `Est. Monthly Volume (mt): ${volume || "-"}`,
        `Destination Port / City: ${destination || "-"}`,
        "",
        `Name: ${name || "-"}`,
        `Company: ${company || "-"}`,
        `Email: ${email || "-"}`,
        "",
        "Message:",
        message || "-",
      ].join("\n")
    );
    return `mailto:${toEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="fixed inset-0 z-80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            aria-hidden
          />
          {/* dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative bg-[#111] text-white w-[92vw] max-w-xl rounded-2xl border border-white/10 p-6 shadow-2xl"
            initial={{ scale: 0.98, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 12, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 p-2 rounded-lg hover:bg-white/5 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-1">
              Request Quote — <span className="text-[#c2a165]">{product.name}</span>
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Share a few details and we’ll respond with specs, sampling, and shipment options.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <Field
                label="Your name"
                value={name}
                onChange={setName}
                ref={initialFocusRef}
                placeholder="Jane Doe"
              />
              <Field
                label="Company"
                value={company}
                onChange={setCompany}
                placeholder="Acme Metals Ltd."
              />
              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="you@email.com"
                type="email"
              />
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm">
                  <span className="text-white/70">Incoterm</span>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value as "FOB" | "CIF")}
                    className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60"
                  >
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="text-white/70">Est. monthly volume (mt)</span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value === "" ? "" : Number(e.target.value))}
                    className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60"
                    placeholder="500"
                  />
                </label>
              </div>
              <Field
                label="Destination port / city"
                value={destination}
                onChange={setDestination}
                placeholder="Jebel Ali / Mundra / Alexandria…"
              />
              <TextArea
                label="Message (optional)"
                value={message}
                onChange={setMessage}
                placeholder="Specs, timeline, grade/purity, sampling/inspection…"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mailtoHref()}
                className="px-5 py-3 rounded-lg bg-[#c2a165] text-black font-semibold hover:bg-[#a98755] transition inline-flex items-center gap-2"
                onClick={onClose}
              >
                <Mail size={18} /> Send request
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-lg border border-[#c2a165]/50 text-white hover:bg-[#c2a165] hover:text-black transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- small inputs ---------- */
type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
};
const Field = Object.assign(
  (
    { label, value, onChange, placeholder, type = "text" }: FieldProps,
    ref?: React.Ref<HTMLInputElement>
  ) => (
    <label className="block text-sm">
      <span className="text-white/70">{label}</span>
      <input
        ref={ref as any}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60"
      />
    </label>
  )
);

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
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60 resize-y"
      />
    </label>
  );
}
