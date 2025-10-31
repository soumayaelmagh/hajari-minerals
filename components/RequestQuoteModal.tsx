"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, Mail, CheckCircle2, TriangleAlert } from "lucide-react";

type RequestQuoteModalProps = {
  open: boolean;
  product: { slug: string; name: string } | null;
  onClose: () => void;
  autoCloseMs?: number; // default: 1200
};

const PREFS_KEY = "rq_prefs_v1"; // localStorage key

type Prefs = {
  destination?: string;
  incoterm?: "FOB" | "CIF";
};

export default function RequestQuoteModal({
  open,
  product,
  onClose,
  autoCloseMs = 1200,
}: RequestQuoteModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState<number>(200);
  const [destination, setDestination] = useState("");
  const [incoterm, setIncoterm] = useState<"FOB" | "CIF">("FOB");
  const [message, setMessage] = useState("");

  // fixed channel (email-only)
  const [channel] = useState<"email">("email");

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // honeypot
  const honeyRef = useRef<HTMLInputElement>(null);

  // Load saved prefs on first open
  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs: Prefs = JSON.parse(raw);
        if (prefs.destination) setDestination(prefs.destination);
        if (prefs.incoterm) setIncoterm(prefs.incoterm);
      }
    } catch {}
  }, [open]);

  // Persist prefs whenever user changes them
  useEffect(() => {
    if (!open) return;
    const prefs: Prefs = { destination, incoterm };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {}
  }, [open, destination, incoterm]);

  // reset transient states when modal opens
  useEffect(() => {
    if (open) {
      setSent(null);
      setErrorMsg("");
      setShowToast(false);
    }
  }, [open, product]);

  const canSend = useMemo(() => {
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return !!product && name.trim().length > 1 && okEmail && destination.trim().length > 1;
  }, [product, name, email, destination]);

  async function submitQuote() {
    if (!canSend || isSending || !product) return;
    if (honeypotFilled(honeyRef)) return;

    setIsSending(true);
    setSent(null);
    setErrorMsg("");

    const topic = `Quote request — ${product.name}`;
    const composedMessage =
      message?.trim()
        ? `Additional notes:\n${message.trim()}`
        : "—";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _honey: "",
          name,
          company,
          email,
          topic,
          volume,
          budget: "",
          message: `Product: ${product.name}\nIncoterm: ${incoterm}\nDestination: ${destination}\nPreferred channel: ${channel}\n\n${composedMessage}`,
          incoterm,
          destination,
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
      setShowToast(true);

      // Auto-close after a short delay
      const timer = window.setTimeout(() => {
        setShowToast(false);
        onClose();
      }, autoCloseMs);

      // clear on unmount or reopen
      return () => window.clearTimeout(timer);
    } catch (e: any) {
      setSent("err");
      setErrorMsg(e?.message || "Network error");
    } finally {
      setIsSending(false);
    }
  }

  if (!open || !product) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-80 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/70" />

      {/* Panel */}
      <div className="relative w-full sm:max-w-xl bg-[#141414] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">
            Request quote — <span className="text-[#c2a165]">{product.name}</span>
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* honeypot */}
          <input ref={honeyRef} type="text" className="hidden" tabIndex={-1} aria-hidden="true" />

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Your name" value={name} onChange={setName} placeholder="Jane Doe" />
            <Field label="Company" value={company} onChange={setCompany} placeholder="Acme Metals Ltd." />
          </div>
          <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@email.com" />

          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Estimated volume (mt)"
              value={String(volume)}
              onChange={(v) => setVolume(Number(v) || 0)}
              type="number"
              placeholder="200"
            />
            <Field
              label="Destination (city, country)"
              value={destination}
              onChange={setDestination}
              placeholder="Jebel Ali, UAE"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              label="Incoterm"
              value={incoterm}
              onChange={(v) => setIncoterm(v as "FOB" | "CIF")}
              options={[
                { label: "FOB", value: "FOB" },
                { label: "CIF", value: "CIF" },
              ]}
            />

            {/* Static info since channel is email-only */}
            <div className="text-sm text-white/60 self-end">
              Preferred contact method:{" "}
              <span className="text-[#c2a165] font-medium">Email</span>
            </div>
          </div>

          <TextArea
            label="Notes (grade, sizing, timing, inspection…) — optional"
            value={message}
            onChange={setMessage}
            placeholder="e.g., Cr2O3 40%+, lumpy 10–50mm, shipment within 30 days"
          />

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={submitQuote}
              disabled={!canSend || isSending}
              className={`px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition
                ${!canSend || isSending
                  ? "bg-[#c2a165]/50 text-black/70 cursor-not-allowed"
                  : "bg-[#c2a165] text-black hover:bg-[#a98755]"}`}
            >
              {isSending ? "Sending…" : (<><Mail size={18}/> Send request</>)}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-[#c2a165]/50 text-white hover:bg-[#c2a165] hover:text-black transition"
            >
              Cancel
            </button>
          </div>

          {sent === "ok" && (
            <p className="mt-1 text-green-400 text-sm inline-flex items-center gap-2">
              <CheckCircle2 size={16}/> Thanks! Your quote request was sent.
            </p>
          )}
          {sent === "err" && (
            <p className="mt-1 text-red-400 text-sm inline-flex items-center gap-2">
              <TriangleAlert size={16}/> Couldn’t send. {errorMsg}
            </p>
          )}
        </div>
      </div>

      {/* Toast (bottom center) */}
      {showToast && (
        <div className="pointer-events-none fixed bottom-5 inset-x-0 flex justify-center z-85">
          <div className="rounded-lg bg-black/80 text-white border border-white/10 px-4 py-2 text-sm shadow">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Request sent — we’ll contact you shortly.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- helpers & inputs ---------------- */

function honeypotFilled(ref: React.MutableRefObject<HTMLInputElement | null>) {
  return !!ref.current?.value;
}

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
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
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

function Select({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block text-sm">
      <span className="text-white/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg bg-[#0f0f0f] border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#c2a165]/60"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
