/**
 * Chaat & Chill Café — Content Configuration
 * All site copy in one place for easy editing / CMS migration.
 */

export const siteConfig = {
  name: "Chaat & Chill Café",
  tagline: "Sip. Snack. Smile.",
  description:
    "Where India's vibrant street food culture meets modern café vibes. Every bite tells a story, every sip sparks a smile.",
  url: "https://chaatandchill.cafe",
  ogImage: "/images/hero-chai.jpg",
  socials: {
    instagram: "https://instagram.com/chaatandchill",
    twitter: "https://twitter.com/chaatandchill",
    facebook: "https://facebook.com/chaatandchill",
    youtube: "https://youtube.com/@chaatandchill",
  },
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#footer" },
];

export const heroContent = {
  eyebrow: "Welcome to",
  headline: "Chaat & Chill Café",
  subheadline: "Sip. Snack. Smile.",
  description:
    "Where India's street food soul meets modern café culture. Discover flavors that make you feel at home.",
  cta: { label: "Reserve a Table", href: "#locations" },
  scrollText: "SCROLL TO EXPLORE",
};

export const brandStory = {
  eyebrow: "OUR STORY",
  headline: "Tradition on a Plate, Joy in Every Bite.",
  description:
    "Chaat & Chill Café was born from a simple dream — to bring the electric energy of India's street food culture to a warm, welcoming space. We started with a tiny stall, a family recipe for the perfect pani puri, and an unshakeable belief that great food brings people together. Today, every dish we serve carries that same fire — crafted with love, served with a smile, and spiced with memories of bustling bazaars and evening chai with friends.",
  cta: { label: "About Us", href: "#philosophy" },
  image: "/images/brand-story.jpg",
};

export const philosophy = {
  eyebrow: "OUR PHILOSOPHY",
  statement:
    "We believe food is not just nourishment — it is connection, celebration, and culture. Every chaat we craft, every chai we pour, carries the spirit of India's streets — vibrant, generous, and alive. We don't just serve food. We serve memories.",
  backgroundImage: "/images/philosophy-bg.jpg",
};

export const menuItems = [
  {
    id: 1,
    title: "Papdi Chaat",
    description:
      "Crispy papdi topped with spiced potatoes, chickpeas, tangy chutneys, and a generous dollop of creamy yogurt. A burst of flavors in every bite.",
    price: "₹180",
    tag: "Bestseller",
    image: "/images/food-chaat.jpg",
  },
  {
    id: 2,
    title: "Classic Samosa",
    description:
      "Golden, flaky pastry stuffed with spiced potatoes and peas. Served piping hot with mint and tamarind chutneys.",
    price: "₹120",
    tag: "House Favorite",
    image: "/images/food-samosa.jpg",
  },
  {
    id: 3,
    title: "Pani Puri",
    description:
      "Crispy puris filled with tangy, spiced water, chickpeas, and tamarind — the ultimate Indian street food experience.",
    price: "₹150",
    tag: "Iconic",
    image: "/images/food-panipuri.jpg",
  },
  {
    id: 4,
    title: "Vada Pav",
    description:
      "Mumbai's beloved street snack — a spiced potato fritter in a soft pav bun with fiery garlic and green chutneys.",
    price: "₹100",
    tag: "Street Classic",
    image: "/images/food-vadapav.jpg",
  },
  {
    id: 5,
    title: "Dahi Vada",
    description:
      "Soft lentil fritters soaked in creamy yogurt, topped with sweet tamarind and spicy green chutneys. Pure comfort.",
    price: "₹160",
    tag: "Comfort Food",
    image: "/images/food-dahivada.jpg",
  },
  {
    id: 6,
    title: "Masala Chai",
    description:
      "Hand-brewed with whole spices — cardamom, cinnamon, ginger, and cloves. Poured from a height for that perfect frothy finish.",
    price: "₹80",
    tag: "Signature Brew",
    image: "/images/food-masalachai.jpg",
  },
];

export const awards = [
  "Best Street Food Café 2024",
  "Zomato Top Rated",
  "Times Food Award",
  "Swiggy Super Star",
  "India Today Best Café",
  "CNN Travel's Must-Try",
  "National Restaurant Award",
  "Culinary Excellence 2025",
];

export const pressMentions = [
  {
    publication: "The Times of India",
    date: "March 2026",
    headline: "Chaat & Chill: Redefining India's Street Food Scene",
    excerpt:
      "A café that transforms humble street food into an elevated dining experience without losing its soul.",
    link: "#",
  },
  {
    publication: "Food & Travel Magazine",
    date: "January 2026",
    headline: "The Café That Made Pani Puri Premium",
    excerpt:
      "Walking into Chaat & Chill feels like stepping into a modern bazaar — warm, aromatic, and irresistibly inviting.",
    link: "#",
  },
  {
    publication: "Hindustan Times",
    date: "November 2025",
    headline: "From Street Stall to Style Statement",
    excerpt:
      "What started as a passion project has become one of India's most loved café chains, one chaat at a time.",
    link: "#",
  },
  {
    publication: "Condé Nast Traveller",
    date: "August 2025",
    headline: "10 Cafés That Are Changing Indian Food Culture",
    excerpt:
      "Chaat & Chill makes the list for its bold reimagining of classic Indian street food in a stunning setting.",
    link: "#",
  },
];

export const timeline = [
  {
    year: "2024",
    title: "Award Season",
    description:
      "Recognized with national culinary awards and featured in top food publications. Our masala chai became the most Instagrammed drink in India.",
  },
  {
    year: "2025",
    title: "Culinary Innovation",
    description:
      "Launched our fusion street food menu, introducing dishes like Cheese Pav Bhaji Sliders and Samosa Chaat Tacos, bridging the gap between traditional spices and modern formats.",
  },
  {
    year: "2026",
    title: "The Movement",
    description:
      "Today, Chaat & Chill is more than a café — it's a movement. With 12 outlets and counting, we continue to celebrate the soul of Indian street food.",
  },
];

export const locations = [
  {
    name: "Chat and Chill, Jamakhandi",
    address: "Near KSRTC Bus Stand, Jamakhandi, Karnataka 587301",
    hours: "10:00 AM – 10:30 PM",
    phone: "+91 8353 220123",
    mapLink: "https://maps.google.com/?q=Jamakhandi",
  },
  {
    name: "Shrishailam, Rabakavi",
    address: "Main Road, Rabakavi Banhatti, Karnataka 587311",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 8351 230456",
    mapLink: "https://maps.google.com/?q=Rabakavi",
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    text: "The papdi chaat here is a religious experience. I've tried chaat all over India, and nothing comes close to Chaat & Chill. The ambiance is the cherry on top!",
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    rating: 5,
    text: "Finally, a place that takes street food seriously. The vada pav tastes like it was made by a Mumbai street vendor who also happens to be a Michelin chef.",
  },
  {
    name: "Ananya Krishnan",
    location: "Delhi",
    rating: 5,
    text: "The masala chai alone is worth the trip. But stay for the pani puri — it's an explosion of flavors that will leave you speechless.",
  },
  {
    name: "Vikram Desai",
    location: "Hyderabad",
    rating: 4,
    text: "Brought my parents here — they said the dahi vada reminded them of their childhood. That's the highest compliment any food can get.",
  },
  {
    name: "Sneha Patel",
    location: "Bangalore",
    rating: 5,
    text: "The interiors are gorgeous, the staff is warm, and the food? Absolutely divine. This is my happy place.",
  },
];
