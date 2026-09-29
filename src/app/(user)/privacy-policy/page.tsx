import { Metadata } from "next";
import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Tree Media Talent & Casting Agency",
  description:
    "Official Privacy Policy of Tree Media Agency Inc. outlining data collection, processing, protection, and privacy rights for artists, clients, and website visitors.",
};

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "section-1-overview",
    number: "01",
    title: "Overview & Scope",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Data Controller:</strong> This Privacy Policy applies to personal information collected and processed by <strong>Tree Media Agency Inc.</strong> (&quot;Tree Media&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), having its registered office in Hyderabad, India.
        </li>
        <li>
          <strong>Scope of Applicability:</strong> This policy governs data collected through our website, audition portals, casting calls, representation inquiries, and artist management services.
        </li>
        <li>
          <strong>Covered Individuals:</strong> This policy applies to website visitors, audition applicants, contracted models, actors, voice artists, directors, and casting or studio partners.
        </li>
        <li>
          <strong>Commitment to Privacy:</strong> We are committed to maintaining the confidentiality, integrity, and security of all personal details, digital likenesses, and creative materials entrusted to us.
        </li>
      </ul>
    ),
  },
  {
    id: "section-2-information-we-collect",
    number: "02",
    title: "Information We Collect",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Personal Identification Data:</strong> Full legal name, stage name, email address, telephone number, mailing address, date of birth, and government identification for age and legal verification.
        </li>
        <li>
          <strong>Talent &amp; Audition Materials:</strong> Professional headshots, portfolios, digital showreels, voice demo clips, audition self-tapes, physical attributes (height, measurements), and guild or union memberships.
        </li>
        <li>
          <strong>Professional Background:</strong> Acting resume, training credits, previous studio bookings, representation history, and artistic skills.
        </li>
        <li>
          <strong>Billing &amp; Payment Data:</strong> Bank account numbers, PAN or tax identification, invoicing details, and payment histories required for casting disbursements and agency commissions.
        </li>
        <li>
          <strong>Technical &amp; Usage Data:</strong> Internet Protocol (IP) address, browser version, operating system, pages viewed, time spent on pages, and device diagnostic information collected automatically via cookies.
        </li>
      </ul>
    ),
  },
  {
    id: "section-3-how-we-use-information",
    number: "03",
    title: "How We Use Your Information",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Casting Evaluation &amp; Audition Processing:</strong> Reviewing audition submissions, portfolios, and reels to evaluate talent suitability for agency representation and upcoming film, commercial, and television roles.
        </li>
        <li>
          <strong>Talent Promotion &amp; Client Pitches:</strong> Presenting approved headshots, profiles, and demo reels to film directors, casting directors, production houses, and commercial brand advertisers.
        </li>
        <li>
          <strong>Booking Administration:</strong> Preparing, executing, and managing artist representation contracts, call sheets, production schedules, and engagement terms.
        </li>
        <li>
          <strong>Financial Administration:</strong> Calculating agency commissions, executing talent payment disbursements, and fulfilling statutory accounting and taxation duties.
        </li>
        <li>
          <strong>Agency Communications:</strong> Sending audition invitations, callback schedules, booking confirmations, and important administrative updates.
        </li>
        <li>
          <strong>Legal &amp; Regulatory Compliance:</strong> Fulfilling applicable legal, tax, and entertainment regulatory requirements and defending legal rights where necessary.
        </li>
      </ul>
    ),
  },
  {
    id: "section-4-information-sharing",
    number: "04",
    title: "Information Sharing & Disclosure",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Casting Directors &amp; Studios:</strong> We share talent promotional materials (headshots, reels, measurements, and resumes) with authorized casting directors, producers, and client brands strictly for casting and booking purposes.
        </li>
        <li>
          <strong>Service Providers:</strong> We collaborate with vetted third-party vendors for secure cloud hosting, media streaming, database management, and accounting under strict non-disclosure and data protection terms.
        </li>
        <li>
          <strong>No Sale of Personal Data:</strong> Tree Media does not sell, rent, lease, or monetize your personal information or media assets to third-party data brokers or marketing firms.
        </li>
        <li>
          <strong>Legal Authorities:</strong> We disclose personal data only when required by valid court order, subpoena, law enforcement inquiry, or statutory obligation under applicable law.
        </li>
      </ul>
    ),
  },
  {
    id: "section-5-data-security",
    number: "05",
    title: "Data Security & Storage",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Technical Safeguards:</strong> Personal information and digital audition materials are stored in secure cloud environments utilizing industry-standard encryption protocols (SSL/TLS in transit, AES-256 at rest).
        </li>
        <li>
          <strong>Restricted Access:</strong> Access to talent portfolios, financial details, and personal records is strictly restricted to authorized agency agents, casting managers, and legal personnel.
        </li>
        <li>
          <strong>Vulnerability Management:</strong> We conduct periodic system assessments, data backup procedures, and security monitoring to prevent unauthorized access, alteration, or disclosure.
        </li>
      </ul>
    ),
  },
  {
    id: "section-6-data-retention",
    number: "06",
    title: "Data Retention Periods",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Contracted Artists:</strong> Personal data and contractual records are retained throughout the representation term and for seven (7) years following contract termination to satisfy tax and legal statutory obligations.
        </li>
        <li>
          <strong>Unrepresented Audition Applicants:</strong> Submitted audition materials, resumes, and contact details are retained for up to twenty-four (24) months to consider talent for future casting calls, after which they are safely purged.
        </li>
        <li>
          <strong>Secure Deletion:</strong> Upon expiration of required retention periods or upon a verified erasure request, digital records and media files are permanently and irreversibly destroyed.
        </li>
      </ul>
    ),
  },
  {
    id: "section-7-your-privacy-rights",
    number: "07",
    title: "Your Privacy Rights & Choices",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Right to Access:</strong> You may request confirmation of whether we process your personal data and obtain a copy of the records held about you.
        </li>
        <li>
          <strong>Right to Rectification:</strong> You have the right to request updates or corrections to any inaccurate, incomplete, or outdated personal information or talent portfolio assets.
        </li>
        <li>
          <strong>Right to Erasure:</strong> You may request the deletion of your personal records and audition tapes, subject to statutory retention requirements for completed financial contracts.
        </li>
        <li>
          <strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw your consent at any time without affecting the lawfulness of prior processing.
        </li>
        <li>
          <strong>Exercise of Rights:</strong> To exercise any of these rights, please submit a written request to <strong>info@teensitsolutions.com</strong>.
        </li>
      </ul>
    ),
  },
  {
    id: "section-8-cookies-tracking",
    number: "08",
    title: "Cookies & Tracking Technologies",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Essential Cookies:</strong> Strictly necessary for authenticating sessions, securing forms, and delivering core site functionality.
        </li>
        <li>
          <strong>Performance &amp; Analytics Cookies:</strong> Collect anonymous aggregate statistics on site navigation to help optimize page performance, loading speed, and user experience.
        </li>
        <li>
          <strong>Managing Preferences:</strong> You can manage or disable cookie preferences directly through your browser settings. Disabling essential cookies may impact certain interactive features of the website.
        </li>
      </ul>
    ),
  },
  {
    id: "section-9-young-performers",
    number: "09",
    title: "Young Performers & Minors' Privacy",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Parental Consent Required:</strong> Tree Media does not knowingly collect personal information or audition tapes from individuals under eighteen (18) years of age without explicit written consent from a parent or legal guardian.
        </li>
        <li>
          <strong>Parental Supervision:</strong> All casting submissions, communications, and representation contracts for minors must be managed directly through the designated parent or legal guardian.
        </li>
        <li>
          <strong>Heightened Protections:</strong> Audition materials and records of minor performers are subject to heightened confidentiality and stringent safeguards in compliance with child entertainment protection laws.
        </li>
      </ul>
    ),
  },
  {
    id: "section-10-updates-contact",
    number: "10",
    title: "Policy Updates & Contact Information",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Periodic Updates:</strong> We may revise this Privacy Policy periodically to reflect changes in our operational practices, new technology, or statutory requirements. Updated versions will be posted here with a revised effective date.
        </li>
        <li>
          <strong>Privacy Inquiries:</strong> If you have any questions or concerns regarding our privacy practices, please contact our Legal &amp; Data Protection Officer at:
        </li>
        <li className="list-none pl-4 pt-1 space-y-1 text-neutral-300">
          <div><strong className="text-white">Tree Media Agency Inc.</strong></div>
          <div>Unit No: 303 B, 3rd Floor, New Mark House, Plot No: 56, Patrika Nagar, Madhapur Village, Sherlingampally Mandal, Hyderabad - 500081.</div>
          <div>Email: <a href="mailto:info@teensitsolutions.com" className="text-[#DC8B20] font-semibold hover:underline">info@teensitsolutions.com</a></div>
          <div>Phone: <a href="tel:+918125524545" className="text-[#DC8B20] font-semibold hover:underline">+91 8125524545</a></div>
        </li>
      </ul>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      documentTitle="Privacy Policy"
      documentSubtitle="This policy outlines how Tree Media Agency Inc. collects, processes, protects, and handles personal data, audition materials, and digital portfolios for artists, clients, and website visitors."
      documentId="TM-POL-PRIV-2026"
      lastUpdated="September 2026"
      version="3.2"
      activeDoc="privacy"
      sections={PRIVACY_SECTIONS}
    />
  );
}
