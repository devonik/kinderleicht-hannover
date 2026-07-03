# Kinderleicht — Raum für Familien und Entwicklung

Buchungswebsite für Familienkurse (Schwangerschaft, Baby- und Kleinkindzeit) in Hannover.

## Über das Projekt

Kinderleicht bietet Präsenzkurse für Familien an — von Schwangerschaftsaustausch über
Babymassage bis zu Eltern-Kind-Kursen nach Montessori. Diese Website ermöglicht direkte
Online-Buchung und Zahlung, mit einem headless CMS im Hintergrund für einfache Content-Pflege.

## Tech-Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **CMS:** [Sanity](https://www.sanity.io/) (Headless CMS)
- **Payment:** [Stripe Checkout](https://stripe.com/) (Kreditkarte, PayPal, SEPA)
- **E-Mail:** Resend
- **Hosting:** [Vercel](https://vercel.com/)

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local   # eigene Keys eintragen
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Umgebungsvariablen

Siehe [`.env.example`](./.env.example) für alle benötigten Keys.

## Lizenz / Nutzung

Privates Projekt. Nicht zur Weiterverwendung ohne Rücksprache.
