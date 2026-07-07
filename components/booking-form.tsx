"use client";

import { useState } from "react";

/**
 * Buchungsformular-GERÜST.
 *
 * Enthält alle Pflichtfelder + die 4 einzelnen Einwilligungs-Checkboxen laut CLAUDE.md.
 * WICHTIG (Art. 9 DSGVO): Das Feld „Allergien/gesundheitliche Besonderheiten" ist eine
 * besondere Kategorie personenbezogener Daten und erfordert eine EIGENE, ausdrückliche
 * Einwilligung – nicht die allgemeine Datenschutz-Checkbox. Deshalb ist das Feld erst
 * nach Setzen der separaten Gesundheits-Einwilligung ausfüllbar.
 *
 * Der tatsächliche Absende-Weg (Entwurf in Supabase anlegen → Stripe Checkout starten)
 * ist noch NICHT angebunden (blockiert, siehe CLAUDE.md). `onSubmit` validiert nur und
 * zeigt einen ehrlichen Platzhalter. Es werden KEINE Daten übertragen.
 */

type CourseOption = { slug: string; title: string };

type FormState = {
  courseSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  childName: string;
  childBirthdate: string;
  healthConsent: boolean;
  healthInfo: string;
  notes: string;
  acceptPrivacy: boolean;
  acceptTerms: boolean;
  acceptWithdrawal: boolean;
  newsletter: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState = (defaultSlug: string): FormState => ({
  courseSlug: defaultSlug,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  postalCode: "",
  city: "",
  childName: "",
  childBirthdate: "",
  healthConsent: false,
  healthInfo: "",
  notes: "",
  acceptPrivacy: false,
  acceptTerms: false,
  acceptWithdrawal: false,
  newsletter: false,
});

const inputClass =
  "w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-anthracite outline-none transition-colors focus:border-eucalyptus focus:ring-2 focus:ring-eucalyptus/20 disabled:cursor-not-allowed disabled:bg-sand/40 disabled:text-anthracite/50";

function validate(state: FormState): Errors {
  const errors: Errors = {};
  const required: [keyof FormState, string][] = [
    ["courseSlug", "Bitte einen Kurs wählen."],
    ["firstName", "Bitte Vornamen angeben."],
    ["lastName", "Bitte Nachnamen angeben."],
    ["email", "Bitte E-Mail-Adresse angeben."],
    ["phone", "Bitte Telefonnummer angeben."],
    ["street", "Bitte Straße und Hausnummer angeben."],
    ["postalCode", "Bitte Postleitzahl angeben."],
    ["city", "Bitte Ort angeben."],
    ["childName", "Bitte den Namen des Kindes angeben."],
    ["childBirthdate", "Bitte das Geburtsdatum des Kindes angeben."],
  ];
  for (const [key, message] of required) {
    if (!String(state[key]).trim()) errors[key] = message;
  }
  if (state.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = "Bitte eine gültige E-Mail-Adresse angeben.";
  }
  // Art. 9: Gesundheitsangaben nur mit ausdrücklicher Einwilligung.
  if (state.healthInfo.trim() && !state.healthConsent) {
    errors.healthConsent =
      "Für Gesundheitsangaben ist deine ausdrückliche Einwilligung nötig.";
  }
  if (!state.acceptPrivacy)
    errors.acceptPrivacy = "Bitte der Datenschutzerklärung zustimmen.";
  if (!state.acceptTerms)
    errors.acceptTerms = "Bitte den Teilnahmebedingungen zustimmen.";
  if (!state.acceptWithdrawal)
    errors.acceptWithdrawal =
      "Bitte der Widerrufsbelehrung / dem vorzeitigen Kursbeginn zustimmen.";
  return errors;
}

export function BookingForm({
  courses,
  defaultSlug,
}: {
  courses: CourseOption[];
  defaultSlug: string;
}) {
  const [state, setState] = useState<FormState>(() =>
    initialState(defaultSlug),
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Zum ersten Fehler scrollen wäre hier ein späterer Ausbau.
      return;
    }
    // TODO: Buchungsentwurf in Supabase anlegen und Stripe Checkout starten
    // (blockiert bis Klärung Selbständigkeit + Stripe-Konto). Bis dahin nur Bestätigung.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-sand bg-white/60 p-8 text-center">
        <h2 className="font-serif text-2xl font-medium text-eucalyptus">
          Fast geschafft!
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-anthracite/80">
          Deine Angaben sind vollständig. Die direkte Online-Buchung mit Zahlung
          (Kreditkarte, PayPal, SEPA) wird in Kürze freigeschaltet – dann kannst
          du den Kurs hier verbindlich buchen. Bis dahin melden wir uns bei
          Rückfragen gern persönlich.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-eucalyptus underline underline-offset-2 hover:text-anthracite"
        >
          Angaben nochmal ansehen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Kursauswahl */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-medium text-anthracite">
          Kurs
        </legend>
        <Field label="Kurs" error={errors.courseSlug} htmlFor="courseSlug">
          <select
            id="courseSlug"
            className={inputClass}
            value={state.courseSlug}
            onChange={(e) => update("courseSlug", e.target.value)}
          >
            <option value="" disabled>
              Bitte wählen …
            </option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      {/* Kontaktdaten */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-medium text-anthracite">
          Deine Kontaktdaten
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Vorname" error={errors.firstName} htmlFor="firstName">
            <input
              id="firstName"
              className={inputClass}
              value={state.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              autoComplete="given-name"
            />
          </Field>
          <Field label="Nachname" error={errors.lastName} htmlFor="lastName">
            <input
              id="lastName"
              className={inputClass}
              value={state.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              autoComplete="family-name"
            />
          </Field>
          <Field label="E-Mail" error={errors.email} htmlFor="email">
            <input
              id="email"
              type="email"
              className={inputClass}
              value={state.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
          </Field>
          <Field label="Telefon" error={errors.phone} htmlFor="phone">
            <input
              id="phone"
              type="tel"
              className={inputClass}
              value={state.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
            />
          </Field>
        </div>
        <Field
          label="Straße und Hausnummer"
          error={errors.street}
          htmlFor="street"
        >
          <input
            id="street"
            className={inputClass}
            value={state.street}
            onChange={(e) => update("street", e.target.value)}
            autoComplete="street-address"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
          <Field label="PLZ" error={errors.postalCode} htmlFor="postalCode">
            <input
              id="postalCode"
              className={inputClass}
              value={state.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
              autoComplete="postal-code"
              inputMode="numeric"
            />
          </Field>
          <Field label="Ort" error={errors.city} htmlFor="city">
            <input
              id="city"
              className={inputClass}
              value={state.city}
              onChange={(e) => update("city", e.target.value)}
              autoComplete="address-level2"
            />
          </Field>
        </div>
      </fieldset>

      {/* Angaben zum Kind */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-medium text-anthracite">
          Angaben zum Kind
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name des Kindes"
            error={errors.childName}
            htmlFor="childName"
          >
            <input
              id="childName"
              className={inputClass}
              value={state.childName}
              onChange={(e) => update("childName", e.target.value)}
            />
          </Field>
          <Field
            label="Geburtsdatum des Kindes"
            error={errors.childBirthdate}
            htmlFor="childBirthdate"
          >
            <input
              id="childBirthdate"
              type="date"
              className={inputClass}
              value={state.childBirthdate}
              onChange={(e) => update("childBirthdate", e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      {/* Gesundheitsangaben – Art. 9 DSGVO, separate Einwilligung */}
      <fieldset className="space-y-4 rounded-2xl border border-sky/50 bg-sky/10 p-5">
        <legend className="px-2 font-serif text-xl font-medium text-anthracite">
          Gesundheitsangaben <span className="text-sm">(optional)</span>
        </legend>
        <p className="text-sm text-anthracite/70">
          Angaben zu Allergien oder gesundheitlichen Besonderheiten sind
          besondere personenbezogene Daten. Sie sind freiwillig und werden nur
          mit deiner ausdrücklichen Einwilligung verarbeitet.
        </p>
        <Consent
          checked={state.healthConsent}
          error={errors.healthConsent}
          onChange={(checked) => {
            update("healthConsent", checked);
            if (!checked) update("healthInfo", ""); // Feld leeren, wenn Einwilligung entzogen
          }}
        >
          Ich willige ausdrücklich ein, dass die angegebenen Gesundheitsdaten
          meines Kindes zum Zweck der sicheren Kursdurchführung verarbeitet
          werden (Art. 9 Abs. 2 lit. a DSGVO).
        </Consent>
        <Field
          label="Allergien / gesundheitliche Besonderheiten"
          htmlFor="healthInfo"
        >
          <textarea
            id="healthInfo"
            rows={3}
            className={inputClass}
            value={state.healthInfo}
            disabled={!state.healthConsent}
            placeholder={
              state.healthConsent
                ? "z. B. Allergien, Unverträglichkeiten …"
                : "Erst nach Einwilligung oben ausfüllbar"
            }
            onChange={(e) => update("healthInfo", e.target.value)}
          />
        </Field>
      </fieldset>

      {/* Sonstige Hinweise */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-medium text-anthracite">
          Sonstige Hinweise <span className="text-sm">(optional)</span>
        </legend>
        <Field label="Anmerkungen" htmlFor="notes">
          <textarea
            id="notes"
            rows={3}
            className={inputClass}
            value={state.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </Field>
      </fieldset>

      {/* Einwilligungen */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-medium text-anthracite">
          Einwilligungen
        </legend>
        <Consent
          checked={state.acceptPrivacy}
          error={errors.acceptPrivacy}
          onChange={(c) => update("acceptPrivacy", c)}
        >
          Ich habe die <LegalLink href="/datenschutz">Datenschutzerklärung</LegalLink>{" "}
          gelesen und stimme ihr zu. <Req />
        </Consent>
        <Consent
          checked={state.acceptTerms}
          error={errors.acceptTerms}
          onChange={(c) => update("acceptTerms", c)}
        >
          Ich akzeptiere die Teilnahmebedingungen. <Req />
        </Consent>
        <Consent
          checked={state.acceptWithdrawal}
          error={errors.acceptWithdrawal}
          onChange={(c) => update("acceptWithdrawal", c)}
        >
          Ich stimme zu, dass der Kurs ggf. vor Ablauf der 14-tägigen
          Widerrufsfrist beginnt, und habe die Widerrufsbelehrung zur Kenntnis
          genommen. <Req />
        </Consent>
        <Consent
          checked={state.newsletter}
          onChange={(c) => update("newsletter", c)}
        >
          Ich möchte den Newsletter erhalten (freiwillig, jederzeit abbestellbar).
        </Consent>
      </fieldset>

      <div className="border-t border-sand pt-6">
        <button
          type="submit"
          className="w-full rounded-full bg-eucalyptus px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-anthracite sm:w-auto"
        >
          Weiter zur Buchung
        </button>
        <p className="mt-3 text-xs text-anthracite/50">
          Mit „Weiter zur Buchung“ gelangst du künftig zur Zahlung. Die
          Online-Zahlung wird derzeit noch eingerichtet.
        </p>
      </div>
    </form>
  );
}

/** Label + Feld + Fehlermeldung. */
function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-anthracite/80"
      >
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-terracotta">{error}</p> : null}
    </div>
  );
}

/** Einzelne Einwilligungs-Checkbox (nie vorausgewählt). */
function Consent({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-anthracite/85">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-sand text-eucalyptus accent-eucalyptus"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="mt-1 pl-8 text-sm text-terracotta">{error}</p>
      ) : null}
    </div>
  );
}

function Req() {
  return (
    <span className="text-terracotta" title="Pflichtfeld">
      *
    </span>
  );
}

function LegalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-eucalyptus underline underline-offset-2 hover:text-anthracite"
    >
      {children}
    </a>
  );
}
