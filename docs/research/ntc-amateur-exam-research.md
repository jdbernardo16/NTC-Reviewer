# NTC Amateur Radio Exam — Research Brief

**Prepared:** 26 Nov 2026
**Purpose:** Ground the online reviewer + mock exam for Philippine Class D and Class C amateur radio licenses.
**Primary sources:** NTC Form 1-01 (rev. 03, 31 Mar 2023), NTC MC 03-08-2012, PARA licensing pages, DX3H seminar decks, CHARL practice exams.

---

## 1. The short answer: which elements?

**Class C (Technician) = Elements 2, 3, and 4.**
**Class D (Foundation) = Element 2 only.**

This is stated on the current NTC application form (Form No. NTC 1-01, rev. 03):

| Amateur class | Examination coverage |
|---|---|
| Class A (Extra) | Elements 8, 9, 10 + Morse Code (5 wpm) |
| Class B (General) | Elements 5, 6, 7 (plus Element 2 if not yet passed) |
| Class C (Technician) | Elements 2, 3, and 4 |
| Class D (Foundation) | Element 2 |

**Why the confusion:** the older 1987 circular (MC 02-03-87) listed Class D as Elements II, III, and IV. The 2012 Revised Amateur Radio Regulations and the current NTC form changed the Class D exam to Element 2 only. Some old reviewers online still repeat the 1987 coverage.

**Important fallback rule (MC 03-08-2012, Sec. IV.4.3):** a Class C candidate who fails Elements 3 and 4 but passes Element 2 is eligible for a Class D license. In practice, someone can sit the full Class C exam, pass only Element 2, and still walk away with Class D.

**Implication for the product:** two tracks.
- **Class D track:** Element 2 only.
- **Class C track:** Elements 2 + 3 + 4, with a Class D fallback result if Element 2 is passed but the overall Class C result is not.

---

## 2. Exam mechanics

| Item | Detail | Confidence |
|---|---|---|
| Passing average | **70%** across the prescribed elements | Official (MC 03-08-2012 §IV.4.1) |
| Element floor | **No element below 50%** | Official (same section) |
| Items per element | **25 multiple-choice questions** per element | Widely reported; not stated in the MC. Confirm with NTC/PARA. |
| Time per element | Commonly simulated at **40 minutes per element** | Practice-exam convention (CHARL); not confirmed official |
| Total items | 25 (Class D) / 75 (Class C) | Derived |
| Format | Paper multiple choice, four options | Practice sources |
| Morse code | Not required for Class D or C; Element 1 is for Class A | Official (PARA / Form 1-01) |
| Retake / failure | Class C → Class D fallback applies | Official (MC §IV.4.3) |
| Results release | Usually same day for regular exams; weeks for special exams | Anecdotal (N2RAC) |

**Scoring rule to implement:**
1. Compute each element's percentage.
2. Class D direct: pass if Element 2 ≥ 70%.
3. Class C: pass if average(E2, E3, E4) ≥ 70 **and** every element ≥ 50%.
4. If Class C fails but E2 ≥ 50%, show **"Class D eligible"**.
5. Otherwise, fail.

> Open interpretation: the MC does not define the exact Element 2 threshold for the Class D fallback. Using ≥50% is the conservative reading of "passes Element II" and matches public guidance. Flag this in the UI as an estimate, not an NTC ruling.

---

## 3. What each element covers

### Element 2 — Rules and Regulations (the only element for Class D)

Highest-yield area. Based on RA 3846 (Radio Control Law) and MC 03-08-2012.

- RA 3846 and the NTC's authority; ITU Region 3; national vs. international frequency allocation
- Definitions: amateur radio service, amateur station (fixed / mobile / portable), repeater, ARSL, RAOC, RAL, RAO, club station, trustee, radio apparatus
- Classes of amateurs and their privileges
- Licensing lifecycle: new, renewal, modification, duplicate, cancellation; validity; lifetime license
- Renewal rules and penalties: <2 years, 2–5 years, ≥5 years; 30-day renewal window
- Call signs: prefixes (DU/4F = A, DV = B, DW = C, DY = D), district numbers, posting requirements
- Permits: Permit to Purchase (PTP), Permit to Possess, Radio Station License (RSL), construction permit
- Club stations: 25 licensed RAOs/RALs, Class A trustee with 5 years
- Examination rules: qualifications, age (9 for D with parental consent; 12 for A/B/C), coverage, passing rating, special candidates
- Operating rules: plain language, no music/profanity/commercial traffic, identification every 10 minutes, third-party traffic, retransmission, false signals
- Prohibited transmissions and penalties
- Emergency channel 145.000 MHz (±25 kHz), one-minute limit, listen before transmitting
- Distress: MAYDAY ×3 + THIS IS/DE; distress message contents; silence during distress traffic
- Urgency and safety signals (PAN PAN, SECURITE), Q codes, phonetic alphabet
- Logbook and document retention; station inspection; EMI/RFI responsibilities
- Data Privacy Act consent on the NTC form (useful for our own form)

### Element 3 — Fundamentals of Electronics and Electricity

- Matter, atoms, charge, conductors / insulators / semiconductors
- Current, voltage, resistance, conductance; units and symbols
- DC vs. AC; frequency, period, wavelength; the 300,000,000 / f relationship
- Ohm's law and power law; series and parallel circuits; battery configurations
- Metric prefixes and unit conversion (k, M, G, m, µ, n, p)
- Test instruments: voltmeter, ammeter, ohmmeter, wattmeter, multimeter; how each is connected
- Resistors: types, color code, tolerance; capacitors; inductors; transformers
- Reactance: XL = 2πfL, XC = 1/(2πfC); impedance; resonance; LC circuits
- Diodes, transistors, rectifiers, power supplies (basic)
- Decibels, gain/loss, harmonics, modulation fundamentals

### Element 4 — Amateur Radio Practice

- Station setup: transceiver, power supply, antenna, feedline, SWR meter, dummy load, ATU
- Antennas: dipole, vertical, beam, mobile/portable; length and trimming; polarization
- Feedlines: coax, connectors (PL-259/SO-239, N-type, BNC), loss, impedance (50 Ω)
- SWR: causes, measurement, acceptable ranges, effect on finals
- RF power measurement with a dummy load; PEP vs. average power
- Modulation: AM, FM, SSB, CW, data; speech processing; deviation; bandwidth
- Receivers: sensitivity, selectivity, S-meter, RIT/clarifier, AGC, filters
- Interference: intermodulation, cross-modulation, harmonics, adjacent-channel, TVI/RFI
- Operating practice: calling CQ, answering, signal reports (RST), QSO procedure, nets, repeaters, offsets, CTCSS
- Q codes, phonetic alphabet, UTC, ITU regions, band plans
- Safety: mains, grounding, lightning, antenna work, RF exposure, batteries, soldering
- Measurement and troubleshooting: oscilloscope, frequency counter, logic probe, field strength, antenna analyzer
- Emergency and public-service operating

---

## 4. Privileges: Class D vs. Class C

| | Class D (Foundation) | Class C (Technician) |
|---|---|---|
| Call prefix | DY | DW |
| Bands | VHF 144–146 MHz only | Some HF + VHF/UHF (incl. 2 m, 70 cm) |
| Power | 50 W fixed VHF; 10 W mobile/portable VHF | 100 W CW / 200 W PEP SSB on HF; 100 W VHF |
| Exam | Element 2 | Elements 2, 3, 4 |
| Min. age | 9 (with parental consent) | 12 |
| Typical use | Local 2 m voice, clubs, emergencies | HF + local VHF/UHF |

Class C HF access is limited; public sources cite 40 m, parts of 15 m, 10 m, 60 m, and 70 cm on a secondary basis. Always verify against the current NTC band plan before publishing a band chart.

---

## 5. Getting licensed (context for the reviewer)

1. **Attend an orientation seminar** by an NTC-recognized amateur club; get a certificate.
2. **File Form NTC 1-01** at an NTC regional office with photos, seminar certificate, valid ID, and the exam fee (≈₱50).
3. **Take the exam.** NCR: weekly (currently Wednesdays/Fridays depending on the office); regions: periodic, often once or twice a year. 2026 example: Tagbilaran City, 8 Aug 2026, filing deadline 24 Jul 2026.
4. **Get the certified result.** Usually same day for regular exams.
5. **Apply for the RAOC** (≈₱65/year, up to 3 years) and/or **ARSL**.
6. **Apply for a Permit to Purchase**, buy and register equipment, and file the RSL modification.

The reviewer should link out to the official form and regional schedules rather than reproduce them.

---

## 6. Product implications

- **Audience:** first-time examinees, club seminar students, and repeat takers. Many are on mobile and on limited data.
- **Two entry paths:** "I'm taking Class D" (Element 2) and "I'm taking Class C" (Elements 2–4). Do not force everyone through 75 questions.
- **Reviewer:** element-by-element lessons, formula sheet, band plan, glossary, flashcards, and short topic quizzes. Cite the source regulation on each fact-heavy card.
- **Mock exam:** pre-exam form (name, email optional, class track, exam date/location), timed elements, no sign-in, auto-save in the browser, and a result page.
- **Result:** overall average, per-element percentage, pass/fail, Class D fallback notice, weak-topic breakdown, and a downloadable PDF.
- **PDF:** name, date, track, per-element scores, overall result, disclaimer that this is a practice result and not an NTC rating, and a review of missed items (optional toggle).
- **No backend needed for MVP:** everything client-side; localStorage for resume; PDF generated in-browser. A backend is only needed for analytics, leaderboards, or a shared question bank.
- **Legal/ethical:** write original questions. Public reviewer pools are of unknown provenance and may be outdated (e.g., the 1987 Class D coverage). Cite official sources. Add a clear "not affiliated with NTC" disclaimer and a Data Privacy Act consent line on the form.

---

## 7. Open questions for the product owner

1. Who is the primary user and what moment is this for — cramming the night before, or starting from zero?
2. Class D + Class C both at launch, or Class C first?
3. Question bank size: 25 per element (one fixed mock) or 100+ per element (randomized mocks)?
4. Should the PDF include a full answer review, or only scores?
5. Stack and hosting: static Nuxt/Vue app on Netlify/Vercel, or something else?
6. Branding and domain.

---

## 8. Sources

- NTC Form No. 1-01, Application for Radio Operator Examination, rev. 03 (31 Mar 2023) — https://region7.ntc.gov.ph/wp-content/uploads/2024/01/Form_No._NTC_1-01_APPLICATION_FOR_RADIO_OPERATOR_EXAMINATION.pdf
- NTC MC 03-08-2012, Revised Amateur Radio Regulations — http://para.org.ph/legacy/NTC%20Memos/MC%2003-08-2012%20Revised%20Amateur%20Regulations.pdf
- NTC MC 02-03-87 (old coverage, for historical context) — https://region7.ntc.gov.ph/wp-content/uploads/2024/01/MC_02-03-87.pdf
- PARA, Getting a Callsign — https://para.org.ph/getting-a-callsign.html
- PARA, Licenses — https://para.org.ph/licenses.html
- DX3H NTC Exam Resources (Element 2, 3, 4 seminar decks and practice exams) — https://www.dx3h.org/ntcexamresources-1
- CHARL NTC Element 2 practice exam (25 items, 40-minute simulation) — https://www.charl.club/ham-radio/orientation-seminar/element-2/
- N2RAC, "How to get an amateur radio license in the Philippines" — https://n2rac.com/how-to-get-an-amateur-radio-license-in-the-philippines-part-1-the-process-2268365756d
- hams.ph Resource Center — https://hams.ph/resources
- NTC Region 11, Licensing / Examination — https://region11.ntc.gov.ph/index.php/licensing
- NTC Region 4A examination schedule — https://ntcr4a.com/category/examination-schedule
