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
      { heading: 'Billing', body: "Prices shown in the application are ₹299 per month and ₹2,999 per year. Paid access is activated after the payment provider's verified server notification. Refunds and cancellations are governed by the published refund policy and applicable law." },
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
      <div className="legal-warning">Template content: complete the operator&apos;s legal name, address, grievance contact, data processors, and operational timelines; obtain legal review before launch.</div>
      {item.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      <div className="legal-bottom"><Link to="/contact" className="btn btn-primary">Contact support</Link><Link to="/legal/retention">View retention schedule</Link></div>
    </article>
  </div>
}
