import * as XLSX from 'xlsx';
import { Guest } from '../types/wedding';
import { buildGuestInviteUrl } from './urlGuest';

const normalizeHeader = (header: string): string =>
  header
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

const pickField = (row: Record<string, unknown>, candidates: string[]): string => {
  const entries = Object.entries(row);
  for (const [key, val] of entries) {
    const norm = normalizeHeader(key);
    if (candidates.some((c) => norm === c || norm.includes(c))) {
      const text = String(val ?? '').trim();
      if (text) return text;
    }
  }
  return '';
};

export async function parseGuestsFromExcel(file: File): Promise<Guest[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error('File Excel không có sheet dữ liệu nào.');
  }

  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  });

  if (!rows.length) {
    throw new Error('Sheet Excel đang trống. Vui lòng kiểm tra lại dữ liệu.');
  }

  const guests: Guest[] = [];

  rows.forEach((row, index) => {
    const name = pickField(row, [
      'tenkhachmoi',
      'hoten',
      'tenkhach',
      'khachmoi',
      'fullname',
      'guestname',
      'name',
      'ten',
    ]);

    // Fallback: if no matched header, take the first non-empty string column
    let resolvedName = name;
    if (!resolvedName) {
      const firstText = Object.values(row)
        .map((v) => String(v ?? '').trim())
        .find((v) => v.length > 0);
      resolvedName = firstText || '';
    }

    if (!resolvedName) return;

    const title =
      pickField(row, ['danhxung', 'xungho', 'loimoi', 'title', 'prefix', 'salutation']) ||
      'Quý khách';

    const group =
      pickField(row, ['nhom', 'moiquanhe', 'ben', 'group', 'side', 'relation', 'category']) ||
      'Khách mời';

    const companion = pickField(row, [
      'dikem',
      'nguoithuong',
      'companion',
      'plusone',
      'cungvoi',
      'kemtheo',
    ]);

    const note = pickField(row, ['loinhan', 'loimoirieng', 'ghichu', 'note', 'message', 'wish']);

    guests.push({
      id: `excel-${Date.now()}-${index}`,
      title,
      name: resolvedName,
      group,
      companion,
      note,
    });
  });

  if (!guests.length) {
    throw new Error(
      'Không tìm thấy tên khách mời nào. Hãy đặt tên cột là "Tên khách mời" hoặc "Họ tên".'
    );
  }

  return guests;
}

export function downloadSampleExcelTemplate(): void {
  const sampleRows = [
    {
      'Danh xưng': 'Anh',
      'Tên khách mời': 'Nguyễn Văn An',
      'Đi kèm': '& Người thương',
      'Nhóm': 'Nhà trai',
      'Lời mời riêng': 'Rất mong anh đến chung vui cùng gia đình em!',
    },
    {
      'Danh xưng': 'Chị',
      'Tên khách mời': 'Lê Thị Bích Ngọc',
      'Đi kèm': '& Gia đình',
      'Nhóm': 'Nhà gái',
      'Lời mời riêng': 'Hẹn gặp chị tại tiệc cưới nhé!',
    },
    {
      'Danh xưng': 'Bạn',
      'Tên khách mời': 'Trần Quốc Huy',
      'Đi kèm': '',
      'Nhóm': 'Bạn đại học',
      'Lời mời riêng': 'Lâu rồi không gặp, nhớ đến đông đủ hội mình nha!',
    },
    {
      'Danh xưng': 'Em',
      'Tên khách mời': 'Vũ Minh Châu',
      'Đi kèm': '& Bạn trai',
      'Nhóm': 'Đồng nghiệp',
      'Lời mời riêng': 'Đừng quên diện dress code thật xinh nha!',
    },
    {
      'Danh xưng': 'Gia đình',
      'Tên khách mời': 'Bác Hoàng Văn Dũng',
      'Đi kèm': '',
      'Nhóm': 'Họ hàng',
      'Lời mời riêng': 'Sự hiện diện của gia đình bác là niềm vinh hạnh lớn.',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleRows);
  worksheet['!cols'] = [
    { wch: 14 },
    { wch: 26 },
    { wch: 18 },
    { wch: 16 },
    { wch: 48 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSachKhachMoi');
  XLSX.writeFile(workbook, 'Mau_Danh_Sach_Khach_Moi_Thiep_Cuoi.xlsx');
}

export function exportGuestsWithLinksExcel(guests: Guest[]): void {
  const rows = guests.map((g, idx) => ({
    STT: idx + 1,
    'Danh xưng': g.title,
    'Tên khách mời': g.name,
    'Đi kèm': g.companion || '',
    'Nhóm': g.group,
    'Lời mời riêng': g.note || '',
    'Link thiệp cá nhân hóa': buildGuestInviteUrl(g),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 24 },
    { wch: 16 },
    { wch: 16 },
    { wch: 36 },
    { wch: 64 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'LinkThiepKhachMoi');
  XLSX.writeFile(workbook, 'Danh_Sach_Link_Thiep_Cuoi.xlsx');
}
