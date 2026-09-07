import ContactView from "@/components/sections/contact/ContactView";

export const metadata = {
  title: "Contact & Addas — The Rameshwaram Cafe | We'd Love to Hear From You",
  description:
    "Got questions? We've got chutney! Find outlets, operating hours, directions, and phone numbers for The Rameshwaram Cafe addas. Inquire for bulk catering and franchise partnerships.",
  openGraph: {
    title: "Contact & Addas — The Rameshwaram Cafe",
    description:
      "Find your nearest Rameshwaram Cafe adda in Bengaluru, Hyderabad, and Jamakhandi. Open 6:00 AM to 1:00 AM.",
    images: ["/images/outlet-ambiance.jpg"],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
