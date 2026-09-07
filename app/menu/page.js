import MenuView from "@/components/sections/menu/MenuView";

export const metadata = {
  title: "Menu — The Rameshwaram Cafe | Warning: Cravings Ahead",
  description:
    "Explore the authentic menu at The Rameshwaram Cafe. Ghee Pudi Masala Dosa, Butter Thatte Idli, Crispy Medu Vada, Royal Kesari Bath, and Signature Degree Filter Coffee.",
  openGraph: {
    title: "Menu — The Rameshwaram Cafe | Stars of the Morning Show",
    description:
      "Warning: Cravings Ahead. Pure Nandini cow ghee, freshly stone-ground batters, and South Indian comfort food made round the clock.",
    images: ["/images/food-dosa.jpg"],
  },
};

export default function MenuPage() {
  return <MenuView />;
}
