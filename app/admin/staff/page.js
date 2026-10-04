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
  Star,
  Users,
  UserCheck,
} from "lucide-react";

export default function AdminStaffPage() {
  const {
    staff,
    selectedOutlet,
    updateStaffStatus,
    addToast,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "Tawa Master",
    outlet: selectedOutlet === "ALL" ? "Jamakhandi" : selectedOutlet,
    phone: "+91 ",
    shift: "Morning (06:00 AM – 02:30 PM)",
    salary: "₹28,000 / mo",
  });

  const filteredStaff = staff.filter((s) => {
    const matchesOutlet = selectedOutlet === "ALL" || s.outlet === "ALL" || s.outlet === selectedOutlet;
    const matchesShift = shiftFilter === "all" || s.status.toLowerCase().includes(shiftFilter.toLowerCase());
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);
    return matchesOutlet && matchesShift && matchesSearch;
  });

  const onDutyCount = staff.filter((s) => s.status === "On Duty").length;

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name) return;
    staff.unshift({
      id: "stf-" + Date.now(),
      joinDate: "Just now",
      performance: 5.0,
      status: "On Duty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      ...newStaff,
    });
    addToast(`Staff member ${newStaff.name} added to roster`, "success");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-google-sans font-bold tracking-tight text-cream">
            Staff, Kitchen Crew & Shift Roster
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-0.5">
            Manage live tawa cooks, coffee baristas, floor stewards, and attendance logs.
          </p>
        </div>

        <AdminButton
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Crew Member
        </AdminButton>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161412] border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
              Currently On Duty
            </p>
            <p className="text-2xl font-bold font-mono text-cream mt-1">
              {onDutyCount} Staff Members
            </p>
          </div>
          <UserCheck className="w-8 h-8 text-emerald-400/40" />
        </div>

        <div className="bg-[#161412] border border-[#2A241F] p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#A89F91] uppercase font-bold tracking-wider">
              Total Roster Strength
            </p>
            <p className="text-2xl font-bold font-mono text-cream mt-1">
              {staff.length} Persons
            </p>
          </div>
          <Users className="w-8 h-8 text-[#8E867B]/40" />
        </div>

        <div className="bg-[#161412] border border-gold/20 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gold uppercase font-bold tracking-wider">
              Average Team Rating
            </p>
            <p className="text-2xl font-bold font-mono text-[#E6BC65] mt-1">
              4.9 / 5.0 ★
            </p>
          </div>
          <Star className="w-8 h-8 text-gold/40" />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredStaff.map((person) => (
          <AdminCard
            key={person.id}
            className="hover:border-[#3E342A] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 bg-[#25201B] shrink-0 relative">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={48}
                    height={48}
                    quality={85}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-semibold text-sm text-cream truncate">
                      {person.name}
                    </h3>
                    <AdminBadge
                      variant={
                        person.status === "On Duty"
                          ? "success"
                          : person.status === "On Break"
                          ? "warning"
                          : "default"
                      }
                      size="sm"
                      dot={person.status === "On Duty"}
                    >
                      {person.status}
                    </AdminBadge>
                  </div>
                  <p className="text-xs text-gold font-medium">
                    {person.role}
                  </p>
                  <p className="text-[11px] text-[#8E867B]">
                    Outlet: {person.outlet}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="p-3 rounded-xl bg-[#141210] border border-[#25201B] text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#A89F91]">
                  <span>Shift Schedule:</span>
                  <span className="text-cream font-medium">{person.shift}</span>
                </div>
                <div className="flex items-center justify-between text-[#A89F91]">
                  <span>Monthly Compensation:</span>
                  <span className="text-[#E6BC65] font-mono">{person.salary}</span>
                </div>
                <div className="flex items-center justify-between text-[#A89F91]">
                  <span>Direct Phone:</span>
                  <a
                    href={`tel:${person.phone}`}
                    className="text-emerald-400 hover:underline"
                  >
                    {person.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Attendance Toggle Footer */}
            <div className="mt-4 pt-3 border-t border-[#25201B] flex items-center justify-between">
              <span className="text-[11px] text-[#8E867B]">
                Since {person.joinDate}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => updateStaffStatus(person.id, "On Duty")}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${
                    person.status === "On Duty"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-[#8E867B] hover:text-cream"
                  }`}
                >
                  On Duty
                </button>

                <button
                  type="button"
                  onClick={() => updateStaffStatus(person.id, "On Break")}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${
                    person.status === "On Break"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "text-[#8E867B] hover:text-cream"
                  }`}
                >
                  Break
                </button>

                <button
                  type="button"
                  onClick={() => updateStaffStatus(person.id, "Off Duty")}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold cursor-pointer ${
                    person.status === "Off Duty"
                      ? "bg-[#25201B] text-[#D8CEBF] border border-[#3C332A]"
                      : "text-[#8E867B] hover:text-cream"
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Add Staff Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Kitchen or Floor Crew Member"
        subtitle="Register new chef, cashier or barista"
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
              onClick={handleAddStaff}
            >
              Add Staff
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Staff Full Name *
              </label>
              <input
                type="text"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                placeholder="e.g. Ramesh Pujari"
                required
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Role / Responsibility
              </label>
              <select
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                <option value="Head Chef & Tawa Master">Head Chef & Tawa Master</option>
                <option value="Tawa Cook">Tawa Cook</option>
                <option value="Master Barista & Chai Maker">Master Barista & Chai Maker</option>
                <option value="Cashier & Billing Steward">Cashier & Billing Steward</option>
                <option value="Floor Steward / Host">Floor Steward / Host</option>
                <option value="Branch Manager">Branch Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-cream">
                Phone Number
              </label>
              <input
                type="text"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                placeholder="+91 94480 00000"
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cream">
                Assigned Outlet
              </label>
              <select
                value={newStaff.outlet}
                onChange={(e) => setNewStaff({ ...newStaff, outlet: e.target.value })}
                className="w-full mt-1.5 bg-[#1C1814] border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none"
              >
                <option value="Jamakhandi">Jamakhandi Flagship</option>
                <option value="Rabakavi">Rabakavi Adda</option>
                <option value="ALL">All Outlets</option>
              </select>
            </div>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
