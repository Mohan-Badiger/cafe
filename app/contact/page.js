import ContactView from "@/components/sections/contact/ContactView";

export const metadata = {
  title: "Contact & Outlets",
  description:
    "Find your nearest Chaat & Chill Café outlet. Check opening hours, addresses, phone numbers, and reserve your table in Jamakhandi, Rabakavi, and beyond.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Outlets — Chaat & Chill Café | Visit Our Addas",
    description:
      "Got questions? We've got chutney! Find outlets, operating hours, directions, and reserve a table.",
    url: "https://chaatandchill.cafe/contact",
    images: ["/images/outlet-ambiance.jpg"],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
