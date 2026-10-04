"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin/adminStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  UtensilsCrossed,
  Sparkles,
  Coffee,
  Sun,
  Flame,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const {
    categories,
    menuItems,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", icon: "Sun", isActive: true });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", icon: "Sun", isActive: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, icon: cat.icon || "Sun", isActive: cat.isActive });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Menu Category Structure
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Organize digital menu sections, customer ordering flow, and category banners.
          </p>
        </div>

        <AdminButton
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleOpenAdd}
        >
          Add Category
        </AdminButton>
      </div>

      {/* Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => {
          const itemsInCat = menuItems.filter((m) => m.category === cat.name);
          return (
            <AdminCard
              key={cat.id}
              className="hover:border-[#3E342A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 text-[#E6BC65] flex items-center justify-center font-bold text-sm">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-cream">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[#8E867B]">
                        {itemsInCat.length} Dishes Linked
                      </p>
                    </div>
                  </div>

                  <AdminBadge
                    variant={cat.isActive ? "success" : "default"}
                    size="sm"
                  >
                    {cat.isActive ? "Active" : "Hidden"}
                  </AdminBadge>
                </div>

                {/* Preview dishes */}
                <div className="text-xs text-[#A89F91] bg-[#141210] p-2.5 rounded-xl border border-[#25201B] space-y-1">
                  <p className="text-[10px] text-[#7E7568] uppercase font-bold tracking-wider">
                    Included Dishes:
                  </p>
                  <p className="line-clamp-2 text-[11px]">
                    {itemsInCat.length > 0
                      ? itemsInCat.map((i) => i.title).join(", ")
                      : "No dishes assigned yet."}
                  </p>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-4 pt-3 border-t border-[#25201B] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => updateCategory(cat.id, { isActive: !cat.isActive })}
                  className={`text-xs font-medium cursor-pointer ${cat.isActive ? "text-amber-400 hover:underline" : "text-emerald-400 hover:underline"
                    }`}
                >
                  {cat.isActive ? "Hide from Menu" : "Publish to Menu"}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg bg-[#25201B] hover:bg-[#322A23] text-[#D8CEBF] transition-colors cursor-pointer"
                    title="Edit category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete category "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Create New Menu Category"}
        subtitle="Manage category naming and visibility in customer views"
        footer={
          <div className="flex justify-end gap-2.5">
            <AdminButton
              variant="dark"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="primary"
              size="sm"
              onClick={handleSave}
            >
              Save Category
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-cream">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Traditional Thalis & Combos"
              required
              className="w-full mt-1.5 bg-[#1C1814] border border-[#2E2721] rounded-xl px-3 py-2 text-xs text-cream focus:border-gold focus:outline-hidden"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D8CEBF] pt-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded accent-gold"
            />
            <span>Active on public website menu</span>
          </label>
        </form>
      </AdminModal>
    </div>
  );
}
