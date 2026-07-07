# Architektur: Buchungs- & Personendaten (Design-Skizze)

> Status: **Konzept / für später** — noch nicht implementiert. Hält die Entscheidung fest,
> personenbezogene Daten NICHT im (öffentlich lesbaren) Sanity-Dataset zu speichern.

## Grundprinzip: CMS vs. Datenbank

Auf dem Sanity-Free-Tier sind Datasets **public** — veröffentlichte Dokumente sind über die
API von jedem lesbar, der die (nicht geheime) `projectId` kennt. Deshalb strikte Trennung:

| Datenart | Wo | Sichtbarkeit |
|---|---|---|
| Kurse, Termine, Stornoregeln (Website-Inhalt) | **Sanity** (`course`, `session`, `cancellationPolicy`) | öffentlich lesbar — unkritisch |
| Buchungen, Teilnehmer, **Gesundheitsdaten (Art. 9)** | **Supabase/Postgres** | zugriffsgeschützt (Token/RLS), EU-Region, DPA |

`booking` und `participant` wandern damit aus dem Sanity-Schema in die Buchungs-DB. Sanity
behält nur Inhalt, der ohnehin öffentlich sein soll.

## Datenfluss

1. Frontend zeigt Kurse/Termine aus **Sanity** (öffentlicher Read, ok).
2. Nutzer füllt Buchungsformular aus (Pflichtfelder + 4 Checkboxen laut CLAUDE.md).
3. Next.js **Route Handler** (serverseitig) erstellt Stripe Checkout Session.
4. **Stripe-Webhook** bestätigt Zahlung (Karte/PayPal sofort, SEPA nach 1–2 Tagen →
   Status `pending`) und schreibt Buchung + Teilnehmer nach Supabase — mit **Service-Role**,
   niemals aus dem Browser.
5. Auswertungen lesen aus **Supabase** (SQL) bzw. **Stripe Dashboard** (Umsatz/Refunds gratis).

## Verknüpfung Sanity <-> Supabase

- Kein DB-Fremdschlüssel über Systemgrenzen möglich → **weiche Referenz**: die Sanity-Dokument-IDs
  (`sanity_session_id`, `sanity_course_id`) werden als Text in der Buchung gespeichert.
- **Denormalisierung als Beleg:** Kurstitel und bezahlter Preis werden zum Buchungszeitpunkt
  als Snapshot mitgespeichert. Ändert Charly später den Preis, bleibt die alte Buchung korrekt.
  Nebeneffekt: Reports brauchen für die meisten Fälle Sanity gar nicht.

## Schema-Skizze (Postgres / Supabase)

```sql
-- Zahlungsstatus inkl. "pending" für SEPA-Überweisung
create type booking_payment_status as enum ('pending', 'paid', 'cancelled');

-- Teilnehmer (Elternteil + Kind). Gesundheitsdaten mit erzwungener Einwilligung.
create table participants (
  id                 uuid primary key default gen_random_uuid(),
  first_name         text not null,
  last_name          text not null,
  email              text not null,
  phone              text not null,
  street             text not null,
  postal_code        text not null,
  city               text not null,
  child_name         text not null,
  child_birth_date   date not null,
  -- Art. 9 DSGVO: Freitext nur zulaessig, wenn Einwilligung vorliegt (siehe CHECK)
  health_details     text,
  health_consent     boolean not null default false,
  health_consent_at  timestamptz,
  notes              text,
  created_at         timestamptz not null default now(),
  constraint health_requires_consent
    check (health_details is null or health_consent = true)
);

create table bookings (
  id                     uuid primary key default gen_random_uuid(),
  participant_id         uuid not null references participants(id) on delete restrict,
  -- weiche Referenzen ins Sanity-CMS
  sanity_session_id      text not null,
  sanity_course_id       text not null,
  -- Snapshot zum Buchungszeitpunkt (Belegcharakter)
  course_title_snapshot  text not null,
  price_snapshot_cents   integer not null,      -- Geld immer in Cent, nie Float
  currency               text not null default 'eur',
  payment_status         booking_payment_status not null default 'pending',
  stripe_payment_intent_id  text,
  stripe_checkout_session_id text,
  -- Einwilligungs-Zeitstempel (Nachweispflicht), Pflicht-Checkboxen not null
  consent_privacy_at     timestamptz not null,
  consent_terms_at       timestamptz not null,
  consent_withdrawal_at  timestamptz not null,
  consent_newsletter_at  timestamptz,           -- optional, separat, Double-Opt-In
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- Reporting-Indizes
create index on bookings (sanity_session_id);
create index on bookings (payment_status);
create index on bookings (created_at);
```

## Sicherheit / DSGVO

- **Row Level Security (RLS)** in Supabase aktivieren; kein anonymer Zugriff. Lese-/Schreibzugriff
  nur serverseitig mit Service-Role-Key (Next.js), nie mit `NEXT_PUBLIC_*` im Browser.
- **EU-Region** wählen + **AV-Vertrag (DPA)** mit Supabase (und mit Sanity für den Content).
- Optional strenger: `health_details` + `health_consent*` in eine separate Tabelle mit eigener,
  restriktiverer RLS auslagern.

## Beispiel-Auswertungen (laufen in Supabase-SQL)

```sql
-- Auslastung je Termin
select sanity_session_id, count(*) as gebucht
from bookings where payment_status = 'paid'
group by sanity_session_id;

-- Umsatz je Kurs (aus dem Snapshot, ohne Sanity-Abfrage)
select course_title_snapshot, sum(price_snapshot_cents)/100.0 as umsatz_eur
from bookings where payment_status = 'paid'
group by course_title_snapshot;
```

## MVP-Hinweis

Für das MVP deckt das **Stripe Dashboard** die meisten Kunden-Auswertungen bereits ab. Eine
eigene Admin-/Reporting-Ansicht in der Next-App ist bewusst „später" (nicht im MVP-Scope).
```
