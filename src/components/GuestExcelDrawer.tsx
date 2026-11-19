import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Copy,
  Download,
  Eye,
  FileSpreadsheet,
  MailOpen,
  Plus,
  Search,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { Guest } from '../types/wedding';
import {
  downloadSampleExcelTemplate,
  exportGuestsWithLinksExcel,
  parseGuestsFromExcel,
} from '../utils/excelGuests';
import { buildGuestInviteUrl, formatGuestDisplay } from '../utils/urlGuest';

interface GuestExcelDrawerProps {
  open: boolean;
  guests: Guest[];
  activeGuest: Guest;
  onClose: () => void;
  onSelectGuest: (guest: Guest, replayEnvelope?: boolean) => void;
  onImportGuests: (imported: Guest[], replaceExisting: boolean) => void;
  onAddManualGuest: (guest: Guest) => void;
  onDeleteGuest: (id: string) => void;
  onNotify: (message: string) => void;
}

export const GuestExcelDrawer: React.FC<GuestExcelDrawerProps> = ({
  open,
  guests,
  activeGuest,
  onClose,
  onSelectGuest,
  onImportGuests,
  onAddManualGuest,
  onDeleteGuest,
  onNotify,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [replaceMode, setReplaceMode] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Manual quick add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('Anh');
  const [newName, setNewName] = useState('');
  const [newCompanion, setNewCompanion] = useState('');
  const [newGroup, setNewGroup] = useState('Bạn bè');
  const [newNote, setNewNote] = useState('');

  const filteredGuests = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.title.toLowerCase().includes(q) ||
        g.group.toLowerCase().includes(q)
    );
  }, [guests, search]);

  const handleFile = async (file: File | undefined | null) => {
    if (!file) return;
    setErrorMsg(null);
    try {
      const parsed = await parseGuestsFromExcel(file);
      onImportGuests(parsed, replaceMode);
      onNotify(`Đã import thành công ${parsed.length} khách mời từ "${file.name}"!`);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Không thể đọc file Excel. Vui lòng thử lại.'
      );
    }
  };

  const handleCopyLink = async (guest: Guest) => {
    const url = buildGuestInviteUrl(guest);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(guest.id);
      onNotify(`Đã sao chép link thiệp riêng cho ${formatGuestDisplay(guest)}`);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      onNotify('Không thể copy tự động — hãy chọn Xem thiệp để lấy link trên thanh địa chỉ.');
    }
  };

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const guest: Guest = {
      id: `manual-${Date.now()}`,
      title: newTitle.trim() || 'Quý khách',
      name: newName.trim(),
      companion: newCompanion.trim(),
      group: newGroup.trim() || 'Khách mời',
      note: newNote.trim(),
    };
    onAddManualGuest(guest);
    setNewName('');
    setNewCompanion('');
    setNewNote('');
    setShowAddForm(false);
    onNotify(`Đã thêm khách mời "${formatGuestDisplay(guest)}"`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex justify-end bg-espresso/60 backdrop-blur-sm"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-xl flex-col bg-ivory shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/30 bg-champagne/80 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy text-gold-light shadow">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-burgundy">
                    Quản Lý Khách Mời
                  </h2>
                  <p className="text-xs text-taupe">
                    Import danh sách từ Excel (.xlsx / .xls / .csv) &amp; tạo link thiệp riêng
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng bảng khách mời"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 bg-ivory text-taupe transition hover:border-burgundy hover:text-burgundy"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {/* Excel Drag & Drop Upload Box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  void handleFile(e.dataTransfer.files?.[0]);
                }}
                className={`rounded-2xl border-2 border-dashed p-5 text-center transition ${
                  isDragging
                    ? 'border-burgundy bg-burgundy/5'
                    : 'border-gold/55 bg-champagne/40 hover:border-burgundy/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={(e) => {
                    void handleFile(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-espresso">
                  Kéo thả file Excel vào đây hoặc chọn từ máy tính
                </p>
                <p className="mt-1 text-xs text-taupe">
                  Hỗ trợ cột: <strong>Danh xưng</strong>, <strong>Tên khách mời</strong>,{' '}
                  <strong>Đi kèm</strong>, <strong>Nhóm</strong>, <strong>Lời mời riêng</strong>
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-burgundy px-4 py-2 text-xs font-medium text-ivory shadow transition hover:bg-burgundy-deep"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Chọn file Excel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      downloadSampleExcelTemplate();
                      onNotify('Đã tải file Excel mẫu (.xlsx)!');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gold/60 bg-ivory px-4 py-2 text-xs font-medium text-espresso transition hover:border-burgundy hover:text-burgundy"
                  >
                    <Download className="h-3.5 w-3.5 text-gold-dark" />
                    <span>Tải file Excel mẫu</span>
                  </button>
                </div>

                {/* Replace vs Append toggle */}
                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-taupe">
                  <input
                    type="checkbox"
                    checked={replaceMode}
                    onChange={(e) => setReplaceMode(e.target.checked)}
                    className="h-3.5 w-3.5 accent-burgundy"
                  />
                  <span>Thay thế danh sách hiện tại khi import file mới</span>
                </label>

                {errorMsg && (
                  <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-espresso">
                  <Users className="h-4 w-4 text-burgundy" />
                  <span>Danh sách khách mời ({guests.length})</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm((prev) => !prev)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gold/45 bg-ivory px-3 py-1.5 text-xs font-medium text-espresso transition hover:border-burgundy hover:text-burgundy"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Thêm tay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      exportGuestsWithLinksExcel(guests);
                      onNotify('Đã xuất file Excel kèm link thiệp cá nhân hóa!');
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-gold/20 px-3 py-1.5 text-xs font-medium text-espresso transition hover:bg-gold/35"
                  >
                    <Download className="h-3.5 w-3.5 text-gold-dark" />
                    <span>Xuất Excel + Link</span>
                  </button>
                </div>
              </div>

              {/* Optional Manual Add Guest Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleCreateManual}
                    className="mt-3 overflow-hidden rounded-2xl border border-gold/35 bg-champagne/45 p-4"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Danh xưng"
                        className="rounded-lg border border-gold/35 bg-ivory px-3 py-2 text-xs outline-none focus:border-burgundy"
                      />
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Tên khách mời *"
                        className="col-span-2 rounded-lg border border-gold/35 bg-ivory px-3 py-2 text-xs outline-none focus:border-burgundy"
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newCompanion}
                        onChange={(e) => setNewCompanion(e.target.value)}
                        placeholder="Đi kèm (vd: & Gia đình)"
                        className="rounded-lg border border-gold/35 bg-ivory px-3 py-2 text-xs outline-none focus:border-burgundy"
                      />
                      <input
                        type="text"
                        value={newGroup}
                        onChange={(e) => setNewGroup(e.target.value)}
                        placeholder="Nhóm (Nhà trai/Nhà gái...)"
                        className="rounded-lg border border-gold/35 bg-ivory px-3 py-2 text-xs outline-none focus:border-burgundy"
                      />
                    </div>
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Lời mời riêng (không bắt buộc)"
                      className="mt-2 w-full rounded-lg border border-gold/35 bg-ivory px-3 py-2 text-xs outline-none focus:border-burgundy"
                    />
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="rounded-lg px-3 py-1.5 text-xs text-taupe hover:text-espresso"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-burgundy px-4 py-1.5 text-xs font-medium text-ivory hover:bg-burgundy-deep"
                      >
                        Lưu khách mời
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Search Input */}
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm tên khách mời hoặc nhóm..."
                  className="w-full rounded-xl border border-gold/35 bg-champagne/35 py-2.5 pl-10 pr-4 text-xs text-espresso outline-none transition focus:border-burgundy focus:bg-ivory"
                />
              </div>

              {/* Guest List */}
              <div className="mt-4 space-y-2.5">
                {filteredGuests.length === 0 ? (
                  <div className="rounded-2xl border border-gold/25 bg-champagne/30 py-10 text-center text-xs text-taupe">
                    Không tìm thấy khách mời phù hợp.
                  </div>
                ) : (
                  filteredGuests.map((guest) => {
                    const isActive =
                      guest.id === activeGuest.id ||
                      (guest.name === activeGuest.name && guest.title === activeGuest.title);

                    return (
                      <div
                        key={guest.id}
                        className={`rounded-2xl border p-3.5 transition ${
                          isActive
                            ? 'border-burgundy bg-burgundy/[0.04] ring-1 ring-burgundy/30'
                            : 'border-gold/25 bg-white/75 hover:border-gold/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-serif text-lg font-semibold text-espresso">
                                {formatGuestDisplay(guest)}
                              </p>
                              <span className="rounded-full bg-champagne px-2.5 py-0.5 text-[10px] font-medium text-taupe">
                                {guest.group}
                              </span>
                              {isActive && (
                                <span className="rounded-full bg-burgundy px-2 py-0.5 text-[10px] font-medium text-ivory">
                                  Đang hiển thị
                                </span>
                              )}
                            </div>
                            {guest.note && (
                              <p className="mt-1 text-xs italic text-taupe line-clamp-1">
                                “{guest.note}”
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => onDeleteGuest(guest.id)}
                            title="Xóa khách mời"
                            className="rounded-lg p-1.5 text-taupe/60 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectGuest(guest, false);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-burgundy px-3 py-1.5 text-[11px] font-medium text-ivory transition hover:bg-burgundy-deep"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Xem thiệp ngay</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onSelectGuest(guest, true);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-burgundy/35 bg-ivory px-3 py-1.5 text-[11px] font-medium text-burgundy transition hover:bg-burgundy/10"
                          >
                            <MailOpen className="h-3 w-3" />
                            <span>Xem từ phong bì</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyLink(guest)}
                            className="inline-flex items-center gap-1 rounded-lg border border-gold/45 bg-ivory px-3 py-1.5 text-[11px] font-medium text-espresso transition hover:border-burgundy hover:text-burgundy"
                          >
                            {copiedId === guest.id ? (
                              <>
                                <Check className="h-3 w-3 text-sage" />
                                <span>Đã copy</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 text-gold-dark" />
                                <span>Copy link</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
