"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import {
  Plus,
  Search,
  Flame,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
} from "lucide-react";

export default function AdminMenuPage() {
  const {
    menuItems,
    categories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [gheeOnly, setGheeOnly] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // New Item Form State
  const defaultFormData = {
    title: "",
    category: categories[0]?.name || "Stars of the Morning Show",
    price: 150,
    costPrice: 45,
    description: "",
    image: "/images/food-dosa.jpg",
    prepTime: 6,
    spiceLevel: 1,
    dietary: "Pure Veg",
    isGheeSpecial: false,
    isBestseller: false,
    outlet: "ALL",
    tags: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  // Filtered menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesAvailability =
      availabilityFilter === "all"
        ? true
        : availabilityFilter === "in_stock"
        ? item.isAvailable
        : !item.isAvailable;
    const matchesGhee = !gheeOnly || item.isGheeSpecial;

    return matchesSearch && matchesCategory && matchesAvailability && matchesGhee;
  });

  const handleOpenAdd = () => {
    setFormData(defaultFormData);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
    });
    setIsAddModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please provide a title for the menu item.");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      costPrice: Number(formData.costPrice || 0),
      prepTime: Number(formData.prepTime || 5),
      spiceLevel: Number(formData.spiceLevel || 0),
      isAvailable: editingItem ? editingItem.isAvailable : true,
      tags: typeof formData.tags === "string"
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : formData.tags,
    };

    if (editingItem) {
      updateMenuItem(editingItem.id, payload);
    } else {
      addMenuItem(payload);
    }

    setIsAddModalOpen(false);
    setEditingItem(null);
  };

  const imagePresets = [
    { label: "Crispy Dosa", path: "/images/food-dosa.jpg" },
    { label: "Thatte Idli", path: "/images/food-idli.jpg" },
    { label: "Golden Vada", path: "/images/food-vada.jpg" },
    { label: "Kesari Bath", path: "/images/food-kesaribath.jpg" },
    { label: "Filter Coffee", path: "/images/food-filtercoffee.jpg" },
    { label: "Masala Chai", path: "/images/food-masalachai.jpg" },
    { label: "Papdi Chaat", path: "/images/food-chaat.jpg" },
    { label: "Pani Puri", path: "/images/food-panipuri.jpg" },
    { label: "Samosa", path: "/images/food-samosa.jpg" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Menu & Products Management
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Manage recipes, prices, Nandini ghee badges, stock availability, and dish prep times.
          </p>
        </div>

        <AdminButton
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleOpenAdd}
        >
          Add New Dish
        </AdminButton>
      </div>

      {/* Filter and Search Bar */}
      <AdminCard noPadding className="p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-[#7E7568] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes by name or ingredient..."
              className="w-full bg-espresso border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-cream focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-espresso border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
            >
              <option value="All">All Categories ({menuItems.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Stock status filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="bg-espresso border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream focus:outline-hidden"
            >
              <option value="all">All Availability</option>
              <option value="in_stock">In Stock Only</option>
              <option value="sold_out">86&apos;d / Sold Out Only</option>
            </select>

            {/* Ghee Special Toggle */}
            <button
              type="button"
              onClick={() => setGheeOnly((prev) => !prev)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                gheeOnly
                  ? "bg-gold/20 border-gold text-[#E6BC65] font-bold"
                  : "bg-espresso border-[#2E2721] text-[#A89F91] hover:text-cream"
              }`}
            >
              ✨ Ghee Specials Only
            </button>
          </div>
        </div>
      </AdminCard>

      {/* Menu Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-[#161412] border rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group ${
              item.isAvailable
                ? "border-[#2A241F] hover:border-[#3E342A]"
                : "border-rose-950/40 opacity-75 bg-[#14100E]"
            }`}
          >
            {/* Card Header & Image */}
            <div>
              <div className="relative h-44 w-full bg-[#1F1B17] overflow-hidden">
                <Image
                  src={item.image || "/images/food-dosa.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-[#161412] via-black/20 to-transparent" />

                {/* Badges on Top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.isGheeSpecial && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Pure Ghee
                      </span>
                    )}
                    {item.isBestseller && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/90 text-black shadow-md">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <AdminBadge
                    variant={item.isAvailable ? "success" : "danger"}
                    size="sm"
                    dot={item.isAvailable}
                  >
                    {item.isAvailable ? "Available" : "86'd / Sold Out"}
                  </AdminBadge>
                </div>

                {/* Price tag on image */}
                <div className="absolute bottom-3 left-3 flex items-baseline gap-1">
                  <span className="font-mono text-xl font-bold text-cream">
                    ₹{item.price}
                  </span>
                  {item.costPrice > 0 && (
                    <span className="text-[10px] text-[#A89F91] font-mono">
                      (Cost: ₹{item.costPrice})
                    </span>
                  )}
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm text-cream">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#8E867B]">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gold">
                    {Array.from({ length: item.spiceLevel || 0 }).map((_, i) => (
                      <Flame key={i} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#A89F91] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Dish metadata */}
                <div className="flex items-center justify-between text-[11px] text-[#7E7568] pt-1 border-t border-[#25201B]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Prep: {item.prepTime || 5} mins</span>
                  </div>
                  <span>{item.ordersCount || 0} Orders Served</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-[#13110F] border-t border-[#25201B] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleItemAvailability(item.id)}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center ${
                  item.isAvailable
                    ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                    : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30"
                }`}
              >
                {item.isAvailable ? "Mark Sold Out (86)" : "Restore to Stock"}
              </button>

              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 rounded-xl bg-[#25201B] hover:bg-[#322A23] text-[#D8CEBF] transition-colors cursor-pointer"
                title="Edit details"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove "${item.title}" from the café menu?`)) {
                    deleteMenuItem(item.id);
                  }
                }}
                className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dish Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingItem ? "Edit Dish Recipe & Specs" : "Add New Dish to Repertoire"}
        subtitle="Configure dish pricing, tags, prep time, and pure ghee classification"
        maxWidth="max-w-2xl"
        footer={
          <div className="flex justify-end gap-2.5">
            <AdminButton
              variant="dark"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="primary"
              size="sm"
              onClick={handleSaveItem}
            >
              {editingItem ? "Save Changes" : "Create Dish"}
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          {/* Dish Title */}
          <div>
            <label className="text-xs font-semibold text-cream">
              Dish Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Mysore Ghee Onion Dosa"
              required
              className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
            />
          </div>

          {/* Category & Outlet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Outlet Availability
              </label>
              <select
                value={formData.outlet}
                onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                <option value="ALL">All Outlets</option>
                <option value="Jamakhandi">Jamakhandi Only</option>
                <option value="Rabakavi">Rabakavi Only</option>
              </select>
            </div>
          </div>

          {/* Pricing & Cost */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Menu Price (₹) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream font-mono focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Cost of Goods (₹)
              </label>
              <input
                type="number"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Prep Time (Mins)
              </label>
              <input
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Spice Level (0-3)
              </label>
              <select
                value={formData.spiceLevel}
                onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                <option value={0}>0 (Mild / Sweet)</option>
                <option value={1}>1 (Medium)</option>
                <option value={2}>2 (Spicy / Podi)</option>
                <option value={3}>3 (Fiery Mirchi)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-cream">
              Menu Description & Heritage Story
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the aroma, stone-ground batter, spices, and chutneys..."
              className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl p-3 text-xs text-cream focus:outline-none"
            />
          </div>

          {/* Image preset selector */}
          <div>
            <label className="text-xs font-semibold text-cream block mb-1">
              Select Preset High-Res Café Photography
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {imagePresets.map((preset) => (
                <button
                  key={preset.path}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: preset.path })}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.image === preset.path
                      ? "bg-gold/20 border-gold text-[#E6BC65]"
                      : "bg-[#1C1814] border-[#2A241F] text-[#8E867B] hover:text-cream"
                  }`}
                >
                  <span className="text-[10px] font-medium block truncate">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Badges and Toggles */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-[#25201B]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D8CEBF]">
              <input
                type="checkbox"
                checked={formData.isGheeSpecial}
                onChange={(e) => setFormData({ ...formData, isGheeSpecial: e.target.checked })}
                className="rounded accent-gold"
              />
              <span>100% Pure Nandini Ghee Special</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D8CEBF]">
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                className="rounded accent-gold"
              />
              <span>Highlight as Bestseller</span>
            </label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
