import MenuView from "@/components/sections/menu/MenuView";

export const metadata = {
  title: "Menu",
  description:
    "Explore the delicious menu at Chaat & Chill Café. Artisanal Papdi Chaat, Pani Puri Tasting Flights, Ghee Pudi Masala Dosa, Crispy Medu Vada, and Handcrafted Filter Chai.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu — Chaat & Chill Café | Artisanal Street Food & Modern Café Delights",
    description:
      "Warning: Cravings Ahead! Pure ingredients, traditional recipes, and vibrant street food flavors crafted round the clock.",
    url: "https://chaatandchill.cafe/menu",
    images: ["/images/food-dosa.jpg"],
  },
};

export default function MenuPage() {
  return <MenuView />;
}
