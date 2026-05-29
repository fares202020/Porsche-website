import LegalPage from "../../components/Legal/LegalPage";

const sections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We may collect information you choose to provide when you create an account, save a vehicle, submit a form, or contact the service. This can include your name, email address, password, profile details, and any message you send through the app.",
      "We may also collect information automatically when you browse the site, such as device type, browser information, pages visited, approximate location derived from your connection, and usage data that helps us understand how the experience is performing.",
    ],
    bullets: [
      "Account details and profile settings",
      "Saved vehicles, favorites, and form submissions",
      "Device, browser, and session information",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: [
      "We use information to provide the service, keep your account secure, support saved preferences, and respond to questions or requests. We may also use aggregate information to improve the app layout, product presentation, and overall user experience.",
      "When needed, information can be used to prevent misuse, enforce our terms, or maintain the stability and security of the platform.",
    ],
    bullets: [
      "Operate accounts and form features",
      "Personalize saved views and preferences",
      "Improve site performance and content",
    ],
  },
  {
    title: "Cookies and Analytics",
    paragraphs: [
      "The site may use cookies, local storage, or similar technologies to remember session state, keep you signed in, and measure how features are used. These tools help the app work smoothly and can reduce the need to re-enter settings on repeat visits.",
      "Analytics tools may collect generalized usage patterns so we can understand what content is helpful and where the experience can be improved.",
    ],
  },
  {
    title: "Sharing of Information",
    paragraphs: [
      "We may share information with service providers that help operate the site, such as hosting, analytics, communications, or security partners. We may also disclose information if required to comply with law, respond to a legal process, or protect the rights, safety, and integrity of the service.",
      "If the business is reorganized, merged, or sold, information may be transferred as part of that transaction subject to applicable safeguards.",
    ],
  },
  {
    title: "Data Retention and Security",
    paragraphs: [
      "We retain information for as long as needed to provide the service, support your account, comply with legal obligations, or resolve disputes. We use reasonable safeguards to help protect information, but no online service can guarantee complete security.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You can update many account details through the app, and you can clear cookies or adjust browser settings if you prefer not to store them. You may also stop using the service at any time and request account-related help through the support options available in the app.",
    ],
  },
  {
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this policy from time to time to reflect product changes, operational needs, or legal requirements. When we do, the updated version will be posted on this page with a revised date.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains how the site collects, uses, and protects information when you browse vehicles, create an account, save favorites, or submit a request."
      updatedOn="May 26, 2026"
      summaryTitle="Privacy at a glance"
      summaryItems={[
        "We collect account and browsing data to run the service.",
        "Cookies and analytics help improve performance and usability.",
        "You can update account details and manage browser settings.",
        "We keep information only as long as it is needed for the service.",
      ]}
      relatedLabel="Read the Terms of Service"
      relatedTo="/terms-of-service"
      relatedText="For service rules and usage expectations, review the Terms of Service."
      sections={sections}
    />
  );
}
