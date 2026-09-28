"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Inbox,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  ExternalLink,
  MessageSquare,
  User,
  Mail,
  Phone,
  Calendar,
  Save,
  Loader2,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "completed" | "closed";
  adminNotes?: string | null;
  createdAt: string;
  serviceTitle?: string | null;
  profileName?: string | null;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "auditions" | "general">("all");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  async function fetchEnquiries() {
    setLoading(true);
    try {
      const url = statusFilter === "all" ? "/api/enquiries" : `/api/enquiries?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        if (selectedEnquiry) {
          const updated = data.enquiries.find((e: EnquiryItem) => e.id === selectedEnquiry.id);
          if (updated) setSelectedEnquiry(updated);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
        );
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSaveNotes() {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, adminNotes: notes } : null));
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, adminNotes: notes } : e))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const auditionTotal = enquiries.filter((e) => e.subject.toLowerCase().includes("audition")).length;
  const generalTotal = enquiries.length - auditionTotal;

  const filtered = enquiries.filter((e) => {
    const isAudition = e.subject.toLowerCase().includes("audition");
    if (categoryFilter === "auditions" && !isAudition) return false;
    if (categoryFilter === "general" && isAudition) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      (e.phone && e.phone.toLowerCase().includes(q)) ||
      e.message.toLowerCase().includes(q)
    );
  });

  const STATUS_BADGES: Record<string, string> = {
    new: "bg-emerald-50 text-emerald-700 border-emerald-200",
    in_progress: "bg-amber-50 text-amber-800 border-amber-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    closed: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminHeader
        title="Inquiries & Booking Inbox"
        subtitle="Manage client casting requests, representation inquiries, and agency correspondence"
      />

      <div className="p-8 max-w-7xl space-y-6">
        {/* Controls bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-panel bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Status & Type Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category / Source Segments */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({enquiries.length})
              </button>
              <button
                onClick={() => setCategoryFilter("auditions")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  categoryFilter === "auditions"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-purple-700 hover:bg-purple-50"
                }`}
              >
                <span>Auditions</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-900 font-bold">
                  {auditionTotal}
                </span>
              </button>
              <button
                onClick={() => setCategoryFilter("general")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "general"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                General ({generalTotal})
              </button>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: "all", label: "All Statuses" },
                { id: "new", label: "New" },
                { id: "in_progress", label: "In Progress" },
                { id: "completed", label: "Completed" },
                { id: "closed", label: "Closed" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === tab.id
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, email, role, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Enquiry List */}
          <div className="col-span-5 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                <span className="text-xs text-slate-500">Loading inquiries...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="glass-panel bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
                No inquiries found matching current filters.
              </div>
            ) : (
              filtered.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                return (
                  <div
                    key={enq.id}
                    onClick={() => {
                      setSelectedEnquiry(enq);
                      setNotes(enq.adminNotes || "");
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-emerald-50/80 border-emerald-300 shadow-xs"
                        : "glass-panel bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[140px]">
                          {enq.name}
                        </span>
                        {enq.subject.toLowerCase().includes("audition") && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                            Audition
                          </span>
                        )}
                      </div>
                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full border shrink-0 ${
                          STATUS_BADGES[enq.status]
                        }`}
                      >
                        {enq.status.replace("_", " ")}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-emerald-700 truncate">{enq.subject}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                      <span>{enq.email}</span>
                      <span>{formatDateTime(enq.createdAt)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Enquiry Details & Action Panel */}
          <div className="col-span-7">
            {selectedEnquiry ? (
              <div className="glass-panel bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
                {/* Header with status controls */}
                <div className="flex items-start justify-between pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-slate-900">{selectedEnquiry.subject}</h2>
                      {selectedEnquiry.subject.toLowerCase().includes("audition") && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          Audition Candidate Application
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      Received on {formatDateTime(selectedEnquiry.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 font-semibold focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="new">NEW</option>
                      <option value="in_progress">IN PROGRESS</option>
                      <option value="completed">COMPLETED</option>
                      <option value="closed">CLOSED</option>
                    </select>

                    <button
                      onClick={() => handleDelete(selectedEnquiry.id)}
                      className="p-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Client Contact Details */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Sender</span>
                      <span className="text-xs font-semibold text-slate-900">{selectedEnquiry.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="truncate">
                      <span className="text-[10px] text-slate-500 block">Email</span>
                      <a
                        href={`mailto:${selectedEnquiry.email}`}
                        className="text-xs font-semibold text-emerald-700 hover:underline truncate block"
                      >
                        {selectedEnquiry.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Phone</span>
                      <span className="text-xs font-semibold text-slate-900">
                        {selectedEnquiry.phone || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Associations: Profile / Service */}
                {(selectedEnquiry.profileName || selectedEnquiry.serviceTitle) && (
                  <div className="flex items-center gap-4 text-xs">
                    {selectedEnquiry.profileName && (
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
                        Target Talent: <strong>{selectedEnquiry.profileName}</strong>
                      </div>
                    )}
                    {selectedEnquiry.serviceTitle && (
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 font-medium">
                        Target Service: <strong>{selectedEnquiry.serviceTitle}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Body */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Inquiry Message
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Internal Admin Notes */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Internal Management Notes
                    </h4>
                    <button
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      {savingNotes ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Save className="w-3.5 h-3.5" />
                      )}
                      <span>Save Notes</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Enter private agency follow-up notes, call summaries, or offer details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="glass-panel bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs space-y-2 shadow-xs">
                <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
                <p>Select an inquiry from the list to view complete correspondence details and update status.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
