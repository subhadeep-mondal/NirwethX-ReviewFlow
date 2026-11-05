import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

type Policy = { title: string; updated: string; sections: { heading: string; body: string }[] }
const content: Record<string, Policy> = {
  privacy: {
    title: 'Privacy Policy', updated: 'Review before launch', sections: [
      { heading: 'Information we process', body: "ReviewFlow processes account details, business profile data, QR activity, customer feedback, and any contact information a customer chooses to provide. Contact consent is optional and is recorded separately." },
      { heading: 'Purpose and lawful handling', body: 'Information is used to provide the review collection service, deliver feedback to the relevant business, maintain account security, provide analytics, process subscriptions, and respond to support requests. Businesses are responsible for providing suitable notices to their customers.' },
      { heading: 'Retention and deletion', body: 'The starter application records a default 365-day consent retention date. An automated deletion/retention enforcement job is not yet included. Production operators must implement retention, deletion, backup expiry, and customer-rights workflows before launch.' },
      { heading: 'Sharing and service providers', body: 'A production deployment may use hosting, database, payment, and email providers to operate the service. Configure provider agreements and publish the actual provider list before collecting live data.' },
      { heading: 'Privacy requests', body: "For access, correction, withdrawal, or deletion requests, contact the business that collected the feedback or use the support/grievance portal. This template must be reviewed and completed with the operator's legal identity and contact details." },
    ],
  },
  terms: {
    title: 'Terms of Service', updated: 'Review before launch', sections: [
      { heading: 'Service', body: 'ReviewFlow provides QR-based customer review links, direct feedback collection, analytics, and business workflow tools. Feature availability may change as the service evolves.' },
      { heading: 'Business responsibilities', body: 'You must provide accurate business information and use only review URLs that you control or are authorized to share. Do not use the service to mislead customers, suppress negative feedback, incentivize reviews in violation of platform rules, or expose customer data.' },
      { heading: 'Fair review collection', body: 'The public Google review option is presented to customers regardless of the rating they select. ReviewFlow is not a Google product and does not create, edit, or guarantee Google reviews.' },
      { heading: 'Billing', body: "Prices shown in the application are ₹349 per month and ₹3,499 per year. Paid access is activated after the payment provider's verified server notification. Refunds and cancellations are governed by the published refund policy and applicable law." },
      { heading: 'Disclaimer', body: 'The service is provided subject to applicable law and the final signed customer agreement. This starter text is not legal advice and must be reviewed before commercial launch.' },
    ],
  },
  refund: {
    title: 'Refund & Cancellation Policy', updated: 'Review before launch', sections: [
      { heading: 'Subscriptions', body: 'The application offers monthly and annual subscriptions. The current checkout implementation creates Razorpay orders and relies on verified payment webhooks to activate paid access.' },
      { heading: 'Cancellation', body: 'For cancellation requests, contact support with the account email and payment reference. A self-service cancellation and automated renewal management screen is not included in this starter build.' },
      { heading: 'Refund requests', body: 'Refund eligibility, timelines, exceptions, and processing fees must be defined by the service operator and reviewed under applicable Indian consumer and payment rules before accepting live payments. Do not treat this template as a final commercial refund promise.' },
      { heading: 'Contact', body: 'Submit a billing support ticket through the Contact page with your registered email and payment reference. Do not send card numbers, CVV, or banking passwords.' },
    ],
  },
  disclaimer: {
    title: 'Website & Service Disclaimer', updated: 'Review before launch', sections: [
      { heading: '1. What ReviewFlow does', body: 'NirwethX ReviewFlow is a software tool that helps businesses create QR-based customer feedback pages, direct private feedback forms, links to third-party review destinations, and dashboards for viewing submitted feedback and activity. The service provides workflow and reporting tools; it does not guarantee customer satisfaction, business growth, ratings, reviews, revenue, search ranking, or any particular business outcome.' },
      { heading: '2. Independent service; no Google affiliation', body: 'NirwethX ReviewFlow is an independent service and is not owned, operated, endorsed, sponsored, or approved by Google. Google, Google Maps, and Google Business Profile are third-party services subject to their own terms, policies, features, and availability. ReviewFlow does not control Google or any other third-party platform, its algorithms, moderation, display decisions, account access, review publication, removal, or service interruptions.' },
      { heading: '3. Customer reviews and feedback', body: 'Customers decide whether to submit feedback or publish a review and are responsible for the content they provide. ReviewFlow does not write, fabricate, guarantee, edit, or publish Google reviews on a customer\'s behalf. A link or copy/paste assistance does not guarantee that a review will be accepted, displayed, or retained by a third-party platform. Businesses must not manipulate ratings, selectively solicit only positive reviews, offer prohibited incentives, suppress negative feedback, or otherwise violate applicable platform policies or law.' },
      { heading: '4. Business owner responsibilities', body: 'Each business is responsible for its account, business profile, QR placement, review destination URL, customer communications, staff access, and use of customer information. Businesses must ensure that they have the rights and lawful basis to collect and use information, provide required notices, obtain and respect consent where required, respond to customer requests, and comply with consumer-protection, privacy, advertising, and other applicable laws. Verify all configured links and business details before sharing them with customers.' },
      { heading: '5. Customer information and privacy', body: 'Information submitted through a business\'s feedback page may be made available to that business through its ReviewFlow workspace. Do not submit passwords, payment-card security codes, government identity numbers, or other highly sensitive information through a feedback form. Businesses are responsible for handling information they receive lawfully and securely. Refer to the Privacy Policy for further information; policy details and operational controls must be kept accurate for the actual deployment.' },
      { heading: '6. Analytics, notifications, and data accuracy', body: 'Dashboard metrics, scan counts, review-link clicks, feedback counts, ratings, and notifications are operational indicators. They may be delayed, incomplete, affected by duplicate or automated activity, browser or network restrictions, outages, configuration, or third-party changes. They should not be treated as independently audited records, proof that a third-party review was published, or a guarantee of business performance.' },
      { heading: '7. Payments, subscriptions, and taxes', body: 'Prices, plan features, billing periods, payment processing, subscription activation, cancellation, and refund eligibility are governed by the current pricing display, applicable checkout terms, and Refund & Cancellation Policy. Payments may be processed by a third-party payment provider. ReviewFlow does not store or need your card PIN, CVV, banking password, or payment-provider credentials. Applicable taxes and statutory rights are handled as required by law.' },
      { heading: '8. Availability, security, and changes', body: 'We aim to keep the service available and secure, but uninterrupted or error-free operation cannot be guaranteed. Access may be affected by maintenance, hosting or network failures, browser compatibility, third-party services, or events beyond our reasonable control. Features, integrations, pricing, and these disclosures may be updated. Check the published policies for the current terms.' },
      { heading: '9. No professional advice; limitation of reliance', body: 'Content, analytics, and tools provided by ReviewFlow are for general business workflow purposes and are not legal, tax, accounting, security, or professional advice. You should obtain advice appropriate to your circumstances. To the extent permitted by applicable law, do not rely on the service as the sole record or control for regulatory compliance, customer consent, review-platform compliance, or business-critical decisions.' },
      { heading: '10. Contact and legal review', body: 'Questions or concerns may be sent through the Contact page. This disclaimer is a general product disclosure, not a substitute for a complete agreement or legal advice. Before commercial launch, the operator should have a qualified lawyer review this text and complete the legal entity name, registered address, grievance officer/contact, jurisdiction, data processor list, retention commitments, liability terms, and any disclosures required for the actual business and deployment.' },
    ],
  },
  retention: {
    title: 'Data Retention', updated: 'Review before launch', sections: [
      { heading: 'Operational records', body: 'Account and business records are retained while the workspace is active, subject to applicable legal and contractual requirements.' },
      { heading: 'Customer feedback', body: 'Feedback submissions store a timestamp and a consent ledger record with a nominal 365-day retention expiry. A scheduled deletion worker and backup purge process must be implemented before production.' },
      { heading: 'Audit and security logs', body: 'Security and audit events should be retained only as long as needed for security, compliance, dispute handling, and legal requirements. Operators must set an explicit schedule.' },
      { heading: 'Deletion requests', body: 'A production operator must provide a verified process for customer and business account deletion, including relevant derived analytics and backup-retention handling.' },
    ],
  },
}

export default function LegalPage() {
  const { policy = 'privacy' } = useParams()
  const item = content[policy] || content.privacy
  return <div className="legal-page">
    <header className="legal-header"><Link to="/" className="landing-logo"><span className="brand-mark"><Sparkles size={17}/></span>NirwethX ReviewFlow</Link><Link to="/" className="back-link"><ArrowLeft size={15}/> Back to home</Link></header>
    <article className="legal-content"><span className="eyebrow">POLICIES & DISCLOSURES</span><h1>{item.title}</h1><p className="legal-updated">{item.updated}</p>
      {item.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      <div className="legal-bottom"><Link to="/contact" className="btn btn-primary">Contact support</Link><Link to="/legal/retention">View retention schedule</Link></div>
    </article>
  </div>
}
