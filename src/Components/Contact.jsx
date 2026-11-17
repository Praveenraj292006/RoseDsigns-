import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

/*
  Placeholders to replace: the email, phone and location below, and the
  submit handler (see `send`). Spacing is inline so it survives a global
  `* { margin:0; padding:0 }` reset.
*/

const ease = [0.22, 1, 0.36, 1];

const details = [
  { icon: Mail, label: "admin@rosedsigns.com", href: "mailto:admin@rosedsigns.com" },
  { icon: Phone, label: "+91 8939250383", href: "tel:+918939250383" },
  { icon: MapPin, label: "Chennai, Tamil Nadu", href: null },
];

const topics = ["Website", "Branding", "Social media", "SEO", "Video & graphics", "Not sure yet"];


function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline = false,
}) {
  const [focus, setFocus] = useState(false);

  const lifted = focus || value.length > 0;
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={{
          y: lifted ? -26 : 0,
          scale: lifted ? 0.8 : 1,
          color: focus
            ? "var(--color-deep-burgundy)"
            : "rgba(72,32,42,0.65)",
        }}
        transition={{ duration: 0.3, ease }}
        style={{
          originX: 0,
          top: 26,
        }}
        className="pointer-events-none absolute left-0 font-body text-sm font-medium"
      >
        {label}
      </motion.label>

      <Tag
        id={id}
        type={multiline ? undefined : type}
        rows={multiline ? 4 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full resize-none bg-transparent font-body text-base text-deep-burgundy outline-none placeholder:text-deep-burgundy/40"
        style={{
          padding: "26px 0 12px",
        }}
      />

      {/* Default underline */}
      <div
        className="absolute bottom-0 left-0 h-px w-full bg-deep-burgundy/25"
        aria-hidden="true"
      />

      {/* Animated focus underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-deep-burgundy"
        style={{ originX: 0 }}
        animate={{ scaleX: focus ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        aria-hidden="true"
      />

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="absolute top-full pt-1.5 font-body text-xs font-medium text-deep-burgundy"
        >
          {error}
        </p>
      )}
    </div>
  );
}


export default function Contact() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [picked, setPicked] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (t) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "A few more words, please.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // TODO: connect to your backend, Formspree, EmailJS, etc. Currently simulated.
  const send = async () => {
    await new Promise((r) => setTimeout(r, 1300));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    await send({ ...form, topics: picked });
    setStatus("sent");
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setPicked([]);
    setErrors({});
    setStatus("idle");
  };

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-ivory text-rose-black"
      style={{ padding: "clamp(96px, 12vw, 170px) clamp(20px, 6vw, 96px) clamp(80px, 10vw, 140px)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24"
        style={{ maxWidth: 1440 }}
      >
        {/* Left: invitation */}
        <div className="flex flex-col gap-10 lg:sticky lg:top-28">
          <motion.p
            {...reveal()}
            className="flex items-center gap-4 font-body text-[10px] font-semibold tracking-[0.25em] text-antique-gold"
          >
            <span className="h-px w-10 bg-antique-gold" aria-hidden="true" />
            LET'S TALK
          </motion.p>

          <h2
            className="font-heading font-medium tracking-tight text-deep-burgundy"
            style={{ fontSize: "clamp(2.9rem, 6vw, 5.4rem)", lineHeight: 1.03 }}
          >
            {["Let's make something"].map((line) => (
              <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.1em" }}>
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block italic text-antique-rose">
            <motion.span
                className="block"
                initial={reduced ? false : { y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: 0.12, ease }}
            >
                Worth Remembering.
            </motion.span>
            </span>
          </h2>

          <motion.p {...reveal(0.1)} className="max-w-md font-body text-sm text-muted" style={{ lineHeight: 2 }}>
            Tell us a little about your brand and where you want it to go.
            We'll come back with thoughts, not a sales pitch.
          </motion.p>

          <motion.ul {...reveal(0.2)} className="flex max-w-md flex-col">
            {details.map(({ icon: Icon, label, href }) => {
              const inner = (
                <>
                  <span className="flex items-center gap-4 font-body text-sm text-rose-black">
                    <Icon size={17} strokeWidth={1.5} className="text-antique-gold" />
                    {label}
                  </span>
                  {href && (
                    <ArrowUpRight
                      size={16}
                      className="text-antique-gold opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  )}
                </>
              );
              return (
                <li key={label} className="border-t border-soft-border last:border-b">
                  {href ? (
                    <a href={href} className="group flex items-center justify-between" style={{ padding: "18px 0" }}>
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between" style={{ padding: "18px 0" }}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </motion.ul>

          <motion.p {...reveal(0.3)} className="flex items-center gap-3 font-body text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-antique-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-antique-gold" />
            </span>
            We usually reply within 24 hours.
          </motion.p>
        </div>

        {/* Right: form card */}
       <motion.div
  {...reveal(0.1)}
  className="relative border border-deep-burgundy/20 bg-antique-gold shadow-[0_30px_80px_rgba(72,32,42,0.12)]"
  style={{
    borderRadius: "28px",
    padding: "clamp(28px, 4vw, 56px)",
  }}
>
  <div
    aria-hidden="true"
    className="absolute left-10 right-10 top-0 h-px"
    style={{
      background:
        "linear-gradient(90deg, transparent, var(--color-champagne), transparent)",
    }}
  />

          <AnimatePresence mode="wait" initial={false}>
            {status !== "sent" ? (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-9"
              >
                <Field id="name" label="Your name" value={form.name} onChange={set("name")} error={errors.name} />
                <Field id="email" type="email" label="Email address" value={form.email} onChange={set("email")} error={errors.email} />

                <fieldset className="flex flex-col gap-4">
                 <legend
                className="font-body text-xs font-semibold tracking-[0.12em] text-deep-burgundy"
                style={{ paddingBottom: 14 }}
                >
                I'M INTERESTED IN
                </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {topics.map((t) => {
                      const on = picked.includes(t);
                      return (
                        <motion.button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(t)}
                          whileTap={{ scale: 0.95 }}
                          className={`rounded-full border font-body text-xs transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold ${
                            on
                              ? "border-deep-burgundy  text-light-gold"
                              : "border-soft-border text-antique-gold bg-deep-burgundy hover:border-antique-gold hover:text-light-gold"
                          }`}
                          style={{ padding: "9px 18px" }}
                        >
                          {t}
                        </motion.button>
                      );
                    })}
                  </div>
                </fieldset>

                <Field id="message" label="Tell us about your project" multiline value={form.message} onChange={set("message")} error={errors.message} />
            <button
            type="submit"
            disabled={status === "sending"}
            className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-deep-burgundy font-body text-[11px] font-semibold tracking-[0.14em] text-champagne transition-colors duration-500 hover:text-deep-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-burgundy disabled:opacity-80"
            style={{ padding: "0 32px", marginTop: 8 }}
            >
            <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0"
            />

            <span className="relative flex items-center gap-3">
                {status === "sending" ? "SENDING…" : "SEND MESSAGE"}

                {status === "sending" ? (
                <motion.span
                    className="block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                    }}
                />
                ) : (
                <ArrowUpRight size={16} />
                )}
            </span>
            </button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center"
                role="status"
              >
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden="true">
                  <motion.circle
                    cx="42" cy="42" r="38" stroke="#B08A57" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease }}
                  />
                  <motion.path
                    d="M26 43 L37 54 L58 31" stroke="#672D39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7, ease }}
                  />
                </svg>
                <h3 className="font-heading text-4xl font-medium text-deep-burgundy">
                  Thank you, <span className="italic text-antique-rose">{form.name.split(" ")[0]}</span>.
                </h3>
                <p className="max-w-sm font-body text-sm text-muted" style={{ lineHeight: 1.9 }}>
                  Your message is with us. Expect a reply within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="border-b border-antique-gold font-body text-[10px] font-semibold tracking-[0.16em] text-antique-gold transition-colors hover:text-deep-burgundy"
                  style={{ paddingBottom: 6 }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}