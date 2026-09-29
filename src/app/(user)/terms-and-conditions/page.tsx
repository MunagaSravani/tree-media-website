import { Metadata } from "next";
import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tree Media Talent & Casting Agency",
  description:
    "Official Terms and Conditions of Tree Media Agency Inc. governing website usage, talent submissions, auditions, bookings, rights, payments, and representation.",
};

const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "section-1-acceptance-terms",
    number: "01",
    title: "Acceptance of Terms & Scope",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Binding Agreement:</strong> These Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Talent&quot;, &quot;Client&quot;, or &quot;Production House&quot;) and <strong>Tree Media Agency Inc.</strong> (&quot;Tree Media&quot;, &quot;the Agency&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
        </li>
        <li>
          <strong>Acceptance by Use:</strong> By accessing our website, submitting an audition application, registering an artist profile, browsing talent rosters, or booking talent through our desk, you acknowledge that you have read, understood, and agree to these Terms.
        </li>
        <li>
          <strong>Modifications:</strong> Tree Media reserves the right to modify or update these Terms at any time. Continued use of our website or services following any updates constitutes acceptance of the revised Terms.
        </li>
      </ul>
    ),
  },
  {
    id: "section-2-website-usage-ip",
    number: "02",
    title: "Website Usage & Intellectual Property",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Permitted Access:</strong> Users are granted a limited, revocable, non-exclusive license to view and navigate our website strictly for personal, audition, or casting consultation purposes.
        </li>
        <li>
          <strong>Intellectual Property Rights:</strong> All content on this website—including agency branding, the Tree Media trademark, photographic portfolios, showreels, texts, graphics, code, and design layouts—is the exclusive property of Tree Media or its respective licensors and is protected by copyright and trademark laws.
        </li>
        <li>
          <strong>Prohibited Conduct:</strong> You agree not to copy, reproduce, scrape, harvest, data-mine, redistribute, or reverse-engineer any portion of the website or talent profiles without prior express written authorization from Tree Media.
        </li>
        <li>
          <strong>System Integrity:</strong> You must not introduce viruses, trojans, worms, or other malicious code, nor attempt unauthorized access to our servers, databases, or client accounts.
        </li>
      </ul>
    ),
  },
  {
    id: "section-3-talent-auditions",
    number: "03",
    title: "Talent Submissions & Audition Terms",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Accuracy of Submissions:</strong> Talent applicants warrant that all submitted materials—including legal name, contact details, headshots, measurements, voice samples, and acting credits—are accurate, current, and original.
        </li>
        <li>
          <strong>No Guarantee of Representation or Casting:</strong> Submitting an audition tape, headshot, or representation application does not guarantee acceptance into the agency roster, nor does it guarantee booking in any film, commercial, or theatrical production.
        </li>
        <li>
          <strong>Unsolicited Creative Concepts:</strong> Tree Media does not accept or review unsolicited screenplays, show concepts, or musical compositions. Any unsolicited creative submissions will be discarded without liability.
        </li>
        <li>
          <strong>Minors &amp; Young Performers:</strong> Applications for performers under eighteen (18) years of age must be submitted directly by a verified parent or legal guardian, who must execute all related paperwork.
        </li>
      </ul>
    ),
  },
  {
    id: "section-4-representation-bookings",
    number: "04",
    title: "Talent Representation & Client Bookings",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Formal Agency Representation:</strong> Formal representation of an artist commences only upon the mutual execution of an official, written Tree Media Talent Representation Agreement setting forth specific representation terms.
        </li>
        <li>
          <strong>Client Booking Confirmations:</strong> Any casting engagement or production booking of represented talent requires a formal written deal memo, booking voucher, or production contract authorized by Tree Media.
        </li>
        <li>
          <strong>Professional Standards:</strong> Represented talent agrees to maintain industry-standard professional conduct, adhere strictly to production call times, and comply with all reasonable on-set studio guidelines.
        </li>
      </ul>
    ),
  },
  {
    id: "section-5-rights-likeness-usage",
    number: "05",
    title: "Rights, Likeness & Media Usage",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Promotional License:</strong> By submitting audition materials and portfolios, talent grants Tree Media a worldwide, non-exclusive license to reproduce, format, and display their name, likeness, headshots, and showreels to casting directors and producers for casting considerations.
        </li>
        <li>
          <strong>Commercial Clearances:</strong> Commercial usage of a talent&apos;s name, image, or likeness in finished film, television, print, or digital media is governed strictly by the specific client release agreements and payment terms executed for each project.
        </li>
        <li>
          <strong>No Unauthorized Exploitation:</strong> Clients and third parties are strictly prohibited from using talent likenesses, audition tapes, or sample footage for any purpose outside the specific scope and duration approved in the signed booking contract.
        </li>
      </ul>
    ),
  },
  {
    id: "section-6-payments-commissions",
    number: "06",
    title: "Payments, Commissions & Invoicing",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Agency Commissions:</strong> Tree Media is entitled to standard agency commission fees on all gross earnings received by talent for engagements secured or negotiated through the agency, as outlined in representation agreements.
        </li>
        <li>
          <strong>Client Invoicing &amp; Settlement:</strong> Production studios, advertising agencies, and clients must remit payment in full within thirty (30) days from receipt of invoice, unless different payment milestones are agreed in writing.
        </li>
        <li>
          <strong>Disbursements to Talent:</strong> Talent compensation is disbursed upon verified clearance of client funds, minus applicable statutory tax deductions (TDS) and agency commissions.
        </li>
        <li>
          <strong>Late Payment Interest:</strong> Overdue client invoices may accrue interest at the rate of 1.5% per month or the highest rate permitted by statutory law, in addition to reasonable collection and legal costs.
        </li>
      </ul>
    ),
  },
  {
    id: "section-7-cancellations-non-circumvention",
    number: "07",
    title: "Cancellations, Rescheduling & Non-Circumvention",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Client Cancellation Policy:</strong> Confirmed client bookings cancelled less than forty-eight (48) hours prior to the scheduled call time may be subject to cancellation charges of up to one hundred percent (100%) of the agreed booking fee.
        </li>
        <li>
          <strong>Talent Unavailability:</strong> Talent must notify Tree Media immediately in the event of an unavoidable emergency or illness preventing performance, providing valid supporting documentation where required.
        </li>
        <li>
          <strong>Strict Non-Circumvention:</strong> Clients and production entities introduced to talent through Tree Media agree not to contract, book, or engage said talent directly without routing the engagement and commission through Tree Media for a period of twenty-four (24) months following the initial introduction.
        </li>
      </ul>
    ),
  },
  {
    id: "section-8-liability-disclaimers",
    number: "08",
    title: "Disclaimers & Limitation of Liability",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>&quot;As Is&quot; Basis:</strong> The website and all informational services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express, implied, or statutory.
        </li>
        <li>
          <strong>Limitation of Damages:</strong> In no event shall Tree Media, its officers, directors, agents, or employees be liable for any indirect, special, incidental, punitive, or consequential damages resulting from website access, audition submissions, or casting decisions.
        </li>
        <li>
          <strong>Force Majeure:</strong> Neither Tree Media nor the talent shall be held liable for failure or delay in performance caused by circumstances beyond reasonable control, including natural disasters, acts of civil authority, studio shutdowns, or power failures.
        </li>
      </ul>
    ),
  },
  {
    id: "section-9-governing-law",
    number: "09",
    title: "Governing Law & Dispute Resolution",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Applicable Jurisdiction:</strong> These Terms shall be governed by, interpreted, and construed in accordance with the substantive laws of the Republic of India.
        </li>
        <li>
          <strong>Exclusive Court Venue:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms or agency services shall be subject to the exclusive jurisdiction of the competent courts situated in Hyderabad, Telangana, India.
        </li>
        <li>
          <strong>Amicable Resolution:</strong> Prior to initiating formal litigation, the parties agree to engage in good-faith negotiations to settle any commercial disagreement or contractual claim amicably.
        </li>
      </ul>
    ),
  },
  {
    id: "section-10-contact-notices",
    number: "10",
    title: "Legal Notices & Contact Information",
    content: (
      <ul className="space-y-2.5 list-disc pl-5 text-neutral-200 [&>li>strong]:text-white">
        <li>
          <strong>Formal Inquiries:</strong> Any formal contractual notice, copyright inquiry, or legal correspondence regarding these Terms must be sent in writing to:
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

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      documentTitle="Terms and Conditions"
      documentSubtitle="Official terms governing website access, talent submissions, audition procedures, casting bookings, media rights clearances, commissions, and agency representation."
      documentId="TM-TERMS-REP-2026"
      lastUpdated="September 2026"
      version="3.2"
      activeDoc="terms"
      sections={TERMS_SECTIONS}
    />
  );
}
