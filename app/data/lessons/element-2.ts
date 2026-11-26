import type { Lesson } from '../lesson-types'

export const element2Lesson: Lesson = {
  element: 2,
  intro:
    'Element 2 is the gatekeeper. It is the only written element for a Class D license, and every Class C candidate must pass it too. The questions are not deep engineering — they reward precise recall of the law, the paperwork, the numbers, and the operating rules. If you know the regulation, you can answer most items in seconds.',
  examNote:
    'Expect definition questions, “which document” questions, age and validity questions, frequency and power limits, and scenario questions about interference and distress traffic. The most common traps are mixing up 30 days with 60 or 90, nine districts with ten, and the Class D power limits with the Class C limits.',
  sections: [
    {
      id: 'law-and-regulator',
      title: 'The law and the regulator',
      blocks: [
        {
          type: 'p',
          text: 'The Philippine amateur radio service is governed by Act No. 3846, the Radio Control Law, as amended by Commonwealth Act Nos. 571 and 546. The National Telecommunications Commission (NTC) is the agency that regulates the service, issues licenses, and enforces the rules. The current framework is NTC Memorandum Circular No. 03-08-2012, the Revised Amateur Radio Regulations.',
        },
        {
          type: 'table',
          head: ['Instrument', 'What it does'],
          rows: [
            ['Act No. 3846', 'Radio Control Law — the base statute'],
            ['MC 03-08-2012', 'Revised Amateur Radio Regulations — the main rules'],
            ['MC 02-06-2019', 'Frequency band allocation and emission types by license class'],
            ['NTC Form 1-01', 'Application for Radio Operator Examination'],
            ['RA 10713', 'Data Privacy Act — consent on the NTC application form'],
          ],
        },
        {
          type: 'p',
          text: 'The Philippines is in ITU Region 3. Frequency allocation follows the International Table of Radio Frequency Allocation and the National Radio Frequency Allocation Table. The Philippine Amateur Radio Association (PARA) is the only recognized national amateur radio society under the regulations.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Three names to lock in',
          text: 'Act No. 3846 is the Radio Control Law. The NTC is the regulator. MC 03-08-2012 is the Revised Amateur Radio Regulations. If a question asks for the law or the agency, these are almost always the answer.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Amateur Radio Consultative Panel (ARCP)',
              def: 'NTC personnel and Class A amateurs from the national organization who help formulate policies, rules, regulations, and exam questions.',
            },
            {
              term: 'Amateur Radio Inspector',
              def: 'A Class A operator with at least five years on his own station, deputized by the NTC to inspect amateur stations.',
            },
            {
              term: 'Question Pool Committee',
              def: 'The ARCP plus NTC-designated offices that formulate and periodically update the amateur exam question pool.',
            },
          ],
        },
      ],
    },
    {
      id: 'classes-and-privileges',
      title: 'Classes and privileges',
      blocks: [
        {
          type: 'p',
          text: 'There are four amateur classes. Each class has its own call-sign prefix, examination coverage, and operating privileges. The NTC prescribes the bands and power limits, and you may operate only within the privileges of the license you hold.',
        },
        {
          type: 'table',
          head: ['Class', 'Name', 'Prefix', 'Exam', 'Headline privilege'],
          rows: [
            ['A', 'Extra', 'DU / 4F', 'Elements 8, 9, 10 + 5 wpm Morse', 'All bands; HF up to 1 kW CW or 2 kW PEP SSB'],
            ['B', 'General', 'DV', 'Elements 5, 6, 7', 'Most bands; HF up to 500 W CW or 1 kW PEP SSB'],
            ['C', 'Technician', 'DW', 'Elements 2, 3, 4', 'Selected HF plus VHF/UHF; 100 W CW or 200 W PEP SSB on HF; 100 W VHF'],
            ['D', 'Foundation', 'DY', 'Element 2 only', 'VHF 144–146 MHz only; 50 W fixed, 10 W mobile or portable'],
          ],
        },
        {
          type: 'p',
          text: 'The Class C band list is narrower than Class B and wider than Class D. Public guidance commonly cites 40 m, parts of 15 m and 10 m, 60 m, and 70 cm on a secondary basis. Because the exact list is set in the annexes of MC 02-06-2019, learn the principle — selected HF plus VHF/UHF — and check the current annex before operating.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Class D is VHF only',
          text: 'A Class D license does not authorize HF operation, even at low power. The 50 W limit applies to a fixed VHF station; mobile or portable VHF is limited to 10 W. Do not carry Class C’s 100 W VHF limit into a Class D question.',
        },
        {
          type: 'p',
          text: 'A licensee may operate only on frequencies allocated to his or her class. Frequencies are shared on a non-interference basis, and stations on a secondary allocation must not cause harmful interference to primary users.',
        },
      ],
    },
    {
      id: 'licensing',
      title: 'Licenses, renewal, and changes',
      blocks: [
        {
          type: 'p',
          text: 'Two documents matter. An Amateur Radio Station License (ARSL) is the authority to own and operate an amateur station. A Radio Amateur Operator Certificate (RAOC) is the authority to operate; it can be issued even if you have no registered equipment. Both are issued only after passing the appropriate NTC examination.',
        },
        {
          type: 'list',
          items: [
            'Validity: a new or renewed license is valid for at least one year, with the expiration date falling on the licensee’s birth date. Licenses are commonly issued for up to three years.',
            'Lifetime license: available at age 60 to a licensed amateur who has at least 15 years as a Class A operator prior to application.',
            'Renewal window: file at least 30 days before the expiration date.',
            'Expired less than 2 years: pay the annual fee, arrears for every year or fraction, and a penalty equal to the annual fee for every year or fraction.',
            'Expired 2 to 5 years: same payments; a different call sign may be assigned if the old one is no longer available.',
            'Expired 5 years or more: same payments, plus a seminar on current radio laws and radio ethics with the national organization; a different call sign may be assigned.',
          ],
        },
        {
          type: 'table',
          head: ['Situation', 'What to file'],
          rows: [
            ['Upgrade to a higher class', 'Modification of license'],
            ['Change of name', 'Modification of license'],
            ['Transfer of fixed station location', 'Modification of license'],
            ['Add or delete a transceiver', 'Modification of license'],
            ['Lost, mutilated, or destroyed license', 'Duplicate license'],
            ['Ordinary renewal with no changes', 'Renewal application'],
          ],
        },
        {
          type: 'p',
          text: 'If a duplicate is issued and the original is later found, the duplicate must be returned to the NTC immediately. A license or certificate that has expired for five years or more also requires the seminar, even if the licensee wants to renew without changing any particulars.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Thirty days, not ninety',
          text: 'The renewal deadline is at least 30 days before expiration. Questions often offer 60 or 90 days as distractors. The 30-day figure is also the filing window, not the grace period after expiry.',
        },
      ],
    },
    {
      id: 'papers-and-inspection',
      title: 'Permits, posting, and inspection',
      blocks: [
        {
          type: 'p',
          text: 'No amateur station or club station may be operated without a valid RAOC or ARSL. A license must be posted conspicuously at the station, or a certified copy carried by the amateur. The call sign must also be displayed conspicuously at the authorized station location, or on the equipment itself for a portable station.',
        },
        {
          type: 'list',
          items: [
            'Permit to Purchase (PTP): required before buying an amateur transceiver from an accredited dealer. Sellers need it to issue a receipt and validate the sale.',
            'Permit to Possess: authorizes possession of radio transmitting equipment.',
            'Radio Station License (RSL): authorizes the station itself.',
            'Construction permit: required for certain station construction or major changes under NTC rules.',
            'Inspection: make the station and documents available upon reasonable request by an authorized NTC representative with written authority.',
            'Law enforcement: present the original station license or a certified copy upon reasonable request.',
          ],
        },
        {
          type: 'p',
          text: 'A fixed station may be authorized only in a place under the control of the licensee. It may not be located in a place controlled by a foreign national, except under the foreign-amateur provisions of the regulations. Mobile equipment may be installed in a vehicle or vessel owned or controlled by the licensee, with the correct call sign shown.',
        },
        {
          type: 'p',
          text: 'Only NTC-accredited dealers may sell and import amateur transceivers. A licensed amateur may sell or transfer a registered transceiver to another licensed amateur, provided the buyer has the appropriate permit to purchase. Personal imports require an NTC permit and payment of customs duties.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'License posted, certificate carried',
          text: 'The station license is posted at the station; the operator certificate is carried. In practice, keep a certified copy of both available for inspection and law-enforcement requests.',
        },
      ],
    },
    {
      id: 'callsigns-and-districts',
      title: 'Call signs and districts',
      blocks: [
        {
          type: 'p',
          text: 'The NTC grants a unique call sign after you pass the exam and meet the licensing conditions. The call sign appears on both the ARSL and the RAOC. The NTC may also issue vanity or special call signs. The prefix identifies the class, the number identifies the district, and the suffix identifies the station.',
        },
        {
          type: 'table',
          head: ['District', 'Coverage'],
          rows: [
            ['1', 'National Capital Region and Region IV'],
            ['2', 'Region I, Region II, and CAR'],
            ['3', 'Region III'],
            ['4', 'Region V'],
            ['5', 'Region VIII'],
            ['6', 'Region VI'],
            ['7', 'Region VII'],
            ['8', 'Region IX, Region X, and Region XII'],
            ['9', 'Region XI, Region XIII, and ARMM'],
          ],
          caption: 'The Philippines is divided into nine amateur radio districts.',
        },
        {
          type: 'p',
          text: 'Portable and mobile operation has its own identification format. In radiotelephony, use the station call sign, then the word “portable” or “mobile,” then the district number — for example, DU9RG portable 8 or DU2JJT mobile 9. The last figure may be omitted when operating in your home district. In radiotelegraphy, use the call sign, a fraction bar, and the district number — for example, DU1EV/2.',
        },
        {
          type: 'p',
          text: 'Portable operation in another area must not exceed one month without specific authority for continued operation. If operation will exceed four months continuously in that location, a modification of the station license is required.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Nine districts, not ten',
          text: 'The regulations divide the Philippines into nine amateur radio districts. District 1 covers NCR and Region IV; District 2 covers Regions I and II plus CAR. Memorize the count and the first two districts — they are common exam items.',
        },
      ],
    },
    {
      id: 'exam-rules',
      title: 'Examination rules',
      blocks: [
        {
          type: 'p',
          text: 'An applicant must be a Filipino citizen, or a citizen of a country that extends the same examination privilege to Filipinos. The minimum age is 12 for Classes A, B, and C, and 9 for Class D with an affidavit of parental consent. The applicant must be able to transmit and receive messages in Filipino, English, or any Philippine language.',
        },
        {
          type: 'p',
          text: 'The written examination covers ten elements: I Morse Code, II Rules and Regulations, III Fundamentals of Electronics and Electricity, IV Amateur Radio Practice, V Signals, Frequencies and Emission, VI Circuit Components, VII Operating Procedures, VIII Practical Circuits, IX Antennas and Transmission Lines, and X Radio Wave Propagation.',
        },
        {
          type: 'table',
          head: ['Class', 'Elements required'],
          rows: [
            ['A', '8, 9, 10 plus Morse Code at 5 wpm'],
            ['B', '5, 6, 7 (plus Element 2 if not already passed)'],
            ['C', '2, 3, 4'],
            ['D', '2'],
          ],
        },
        {
          type: 'p',
          text: 'To pass, a candidate must obtain an average of 70% across the prescribed elements, with no rating below 50% in any element. The average is not a substitute for the floor: a candidate with 90%, 90%, and 40% still fails. If a Class C candidate fails Elements III and IV but passes Element II, the candidate is eligible for a Class D license.',
        },
        {
          type: 'p',
          text: 'Special candidates have a shorter path. A registered Electronics and Communications Engineer, or a holder of a valid first-class commercial radiotelephone operator certificate, may hold Class B after passing Element II without taking the Class C exam. A holder of a first- or second-class commercial radiotelegraph operator certificate needs only Element II.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Average versus floor',
          text: '70% is the average; 50% is the per-element floor. The Class D fallback is separate: fail Elements 3 and 4 but pass Element 2, and you may still be eligible for Class D.',
        },
      ],
    },
    {
      id: 'operating-rules',
      title: 'Operating rules',
      blocks: [
        {
          type: 'p',
          text: 'Transmissions must be in plain language — English, Filipino, or any Philippine dialect. Q codes may be used in voice communication. Every transmission must be identified by call sign. The regulations encourage identification at least once every ten minutes of transmission; for radioteletype, identification in Morse at the start, end, and at least every ten minutes is mandatory.',
        },
        {
          type: 'list',
          items: [
            'No music, profane or indecent language, or communications intended to facilitate a criminal act.',
            'No commercial messages or signals. Amateurs may not receive, levy, or collect a toll or other remuneration for a service performed by the station.',
            'No broadcasting of information intended solely for licensed amateurs outside the amateur bands, and no rebroadcast of radio or television programs intended for the general public.',
            'No false or misleading identification. Intentional jamming is prohibited and can lead to suspension or revocation.',
            'A licensee may let another person speak, but must directly control the entire operation, and only the licensee’s call sign may be used.',
            'An unlicensed person may use the transmitter only under the direct supervision or control of the licensee.',
            'Communications with foreign amateurs must be in plain language and limited to technical or personal matters that do not require public telecommunications.',
            'If your station causes harmful interference, cease operation immediately. The NTC may limit power or hours, suspend operation, or close the station.',
          ],
        },
        {
          type: 'p',
          text: 'Power output must not exceed the limit for your class. Equipment capable of more than 500 W RF output must have a means to measure the anode voltage and current of the stage supplying the antenna. For radioteletype, the frequency shift must not exceed 850 Hz. Amateur television above 50 MHz requires specific NTC authorization.',
        },
        {
          type: 'p',
          text: 'Below 144 MHz, the transmitter frequency must be suppressed during reception. Except for brief tests and adjustments identified by the station call sign, an unmodulated carrier is not permitted below 144 MHz. Transmission stability less than that obtainable with crystal control is prohibited.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Voice versus RTTY identification',
          text: 'In voice, identification every ten minutes is encouraged. In radioteletype, it is mandatory at the start, end, and at least every ten minutes. Exam questions often blur the two.',
        },
      ],
    },
    {
      id: 'emergency-and-distress',
      title: 'Emergency and distress traffic',
      blocks: [
        {
          type: 'p',
          text: 'The emergency channel is 145.000 MHz, with a tolerance of plus or minus 25 kHz. It is used only for emergency communication and general calling for radiotelephony. To keep it clear for distress calls, all transmissions on the frequency must be kept to a minimum and must not exceed one minute. Before transmitting, listen for a reasonable period to make sure no distress traffic is in progress. This listening requirement does not apply to a station in distress.',
        },
        {
          type: 'p',
          text: 'The radiotelephone distress call consists of the distress signal MAYDAY spoken three times, followed by the words THIS IS (or DE, spoken as DELTA ECHO if language is a problem), and the station identification. The distress message contains the distress signal MAYDAY, the name or identification of the station, its position, the nature of the distress, the assistance desired, and any other information that may help the rescue.',
        },
        {
          type: 'table',
          head: ['Signal', 'Meaning', 'Use'],
          rows: [
            ['MAYDAY', 'Distress', 'Immediate danger to life or vessel'],
            ['SOS', 'Distress (radiotelegraphy)', 'Morse distress signal'],
            ['PAN PAN', 'Urgency', 'Urgent but not immediate danger'],
            ['SECURITE', 'Safety', 'Important navigation or safety message'],
          ],
        },
        {
          type: 'p',
          text: 'A station that hears distress traffic and cannot assist must not transmit on the frequency until it receives a message that normal working may resume. Distress traffic has absolute priority. False distress signals are prohibited and punishable.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'One minute on 145.000',
          text: 'The emergency channel is 145.000 MHz ±25 kHz. Transmissions are kept to a minimum and must not exceed one minute. Listen before transmitting.',
        },
      ],
    },
    {
      id: 'bands',
      title: 'Bands and frequencies',
      blocks: [
        {
          type: 'p',
          text: 'The NTC allocates the amateur bands. Primary allocations give protection from harmful interference; secondary allocations must not cause interference to primary users and cannot claim protection from them. The table below covers the bands most likely to appear on the exam.',
        },
        {
          type: 'table',
          head: ['Band', 'Frequency', 'Status'],
          rows: [
            ['160 m', '1.800 – 2.000 MHz', 'Primary (non-interference basis to Loran)'],
            ['80 m', '3.500 – 3.900 MHz', 'Primary'],
            ['40 m', '7.000 – 7.200 MHz', 'Primary'],
            ['40 m', '7.201 – 7.300 MHz', 'Secondary'],
            ['20 m', '14.000 – 14.350 MHz', 'Primary'],
            ['15 m', '21.000 – 21.450 MHz', 'Primary'],
            ['10 m', '28.000 – 29.700 MHz', 'Primary'],
            ['6 m', '50.000 – 54.000 MHz', 'Primary'],
            ['2 m', '144.000 – 146.000 MHz', 'Primary'],
            ['70 cm', '430.000 – 440.000 MHz', 'Secondary'],
          ],
        },
        {
          type: 'p',
          text: 'Class D is limited to the 2 m band. Class C has selected HF access plus VHF/UHF. The precise class-by-class table is in the annexes of MC 02-06-2019; use the current NTC band plan when operating, and do not rely on an old reviewer for band edges.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: '70 cm is 430–440 MHz here',
          text: 'The Philippine allocation is 430.000–440.000 MHz on a secondary basis. Some international band plans show a wider 70 cm range; the exam follows the NTC table.',
        },
      ],
    },
    {
      id: 'penalties-and-repeaters',
      title: 'Penalties, clubs, and repeaters',
      blocks: [
        {
          type: 'p',
          text: 'A license or certificate may be suspended or revoked, after due notice and hearing, for violation of the Radio Control Law or its regulations, false statements in an application or report, failure to comply with license conditions, or intentional harmful interference or jamming. An unlicensed jammer may be barred from obtaining any license or certificate.',
        },
        {
          type: 'p',
          text: 'A club station license is issued to a club, society, or association with at least 25 licensed RAOs and/or RALs and a designated trustee. The trustee must be a Class A amateur with a valid ARSL who has been licensed as Class A for at least five years. The trustee is responsible for the station and may allow lower-class amateurs to operate only under direct supervision. Club fixed stations are generally for training and communication with other districts or foreign amateurs.',
        },
        {
          type: 'p',
          text: 'Only duly recognized amateur associations, clubs, societies, or schools may be authorized to install and operate repeaters. A repeater license is separate from the ARSL or club station license, and a certified copy must be posted at the repeater location. Repeaters operate on a non-interference basis.',
        },
        {
          type: 'p',
          text: 'A foreign visitor may operate temporarily with a valid amateur certificate from the home country, proof that the home country extends the same privilege to Filipinos, an endorsement from the recognized national organization, and payment of the required fees. A temporary permit is valid for one year.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Club numbers to remember',
          text: 'Club station: at least 25 licensed RAOs/RALs. Trustee: Class A for at least 5 years. Repeaters: recognized associations, clubs, societies, or schools only.',
        },
      ],
    },
  ],
}
