import { GalleryPhoto, Guest, StoryMilestone, WeddingEvent, Wish } from '../types/wedding';

export const WEDDING_DATE_ISO = '2026-12-20T11:00:00+07:00';

export const COUPLE_INFO = {
  groom: {
    firstName: 'Minh Quân',
    fullName: 'Nguyễn Minh Quân',
    role: 'Út Nam',
    father: 'Ông Nguyễn Văn Hùng',
    mother: 'Bà Trần Thị Lan Anh',
    address: 'Quận Tây Hồ, Hà Nội',
    bio: 'Một kiến trúc sư yêu ánh nắng sớm, cà phê phin và nụ cười dịu dàng của Thảo Linh. Luôn tin rằng ngôi nhà đẹp nhất là nơi có em trở về.',
    portrait:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    bank: {
      bankName: 'Vietcombank',
      accountName: 'NGUYEN MINH QUAN',
      accountNumber: '1029 8866 2012',
      branch: 'Chi nhánh Tây Hồ, Hà Nội',
    },
  },
  bride: {
    firstName: 'Thảo Linh',
    fullName: 'Lê Thảo Linh',
    role: 'Trưởng Nữ',
    father: 'Ông Lê Hoàng Nam',
    mother: 'Bà Phạm Thu Hương',
    address: 'Quận Hoàn Kiếm, Hà Nội',
    bio: 'Cô gái yêu hoa linh lan, những bản nhạc acoustic dịu êm và những chuyến đi ngắn cuối tuần. Hạnh phúc lớn nhất là được cùng Quân viết tiếp chương mới.',
    portrait:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    bank: {
      bankName: 'Techcombank',
      accountName: 'LE THAO LINH',
      accountNumber: '1903 6688 2012',
      branch: 'Chi nhánh Hoàn Kiếm, Hà Nội',
    },
  },
  monogram: 'Q & L',
  displayDate: '20 . 12 . 2026',
  fullVietnameseDate: 'Chủ Nhật, ngày 20 tháng 12 năm 2026',
  lunarDate: 'Nhằm ngày 12 tháng 11 năm Bính Ngọ',
  heroImage:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85',
  secondaryBanner:
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
  quote:
    '“Hạnh phúc không phải là đích đến, mà là hành trình ta nắm tay nhau đi qua từng mùa nắng, từng chiều mưa và gọi nhau hai tiếng: Gia đình.”',
};

export const LOVE_STORY: StoryMilestone[] = [
  {
    id: 'story-1',
    date: 'Tháng 10, 2021',
    title: 'Lần Đầu Chạm Mặt',
    subtitle: 'Một buổi chiều thu Hồ Tây',
    location: 'Quán cà phê Trích Sài, Hà Nội',
    description:
      'Giữa cơn mưa thu bất chợt, cả hai cùng trú mưa dưới mái hiên một tiệm cà phê nhỏ. Một chiếc ô cho mượn vội vàng đã trở thành cái cớ ngọt ngào cho buổi hẹn tiếp theo.',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'story-2',
    date: 'Tháng 04, 2022',
    title: 'Chuyến Đi Đầu Tiên',
    subtitle: 'Đà Lạt sương mù & hoa dã quỳ',
    location: 'Đà Lạt, Lâm Đồng',
    description:
      'Những sáng sớm săn mây, tách cacao nóng truyền tay nhau và hàng trăm bức ảnh chụp vội bằng máy film. Chính nơi ấy, chúng mình nhận ra đối phương là mảnh ghép còn thiếu.',
    image:
      'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'story-3',
    date: 'Tháng 08, 2025',
    title: 'Lời Cầu Hôn Dưới Hoàng Hôn',
    subtitle: '“Em đồng ý về chung một nhà nhé?”',
    location: 'Bãi biển Phú Quốc',
    description:
      'Khi mặt trời buông xuống sắc vàng mật ong trên mặt biển, Quân quỳ gối trao chiếc nhẫn nhỏ cùng lời hứa trọn đời. Nước mắt hạnh phúc hòa cùng tiếng sóng vỗ dịu êm.',
    image:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'story-4',
    date: '20 . 12 . 2026',
    title: 'Ngày Chung Đôi',
    subtitle: 'Khởi đầu hành trình trăm năm',
    location: 'JW Marriott Ballroom, Hà Nội',
    description:
      'Trước sự chứng kiến của gia đình và những người thương yêu nhất, chúng mình chính thức bước vào chương đẹp nhất của cuộc đời. Rất mong được đón tiếp bạn!',
    image:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85',
  },
];

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'vu-quy',
    tag: 'Nhà Gái',
    title: 'Lễ Vu Quy & Rước Dâu',
    time: '08:30 — 10:00',
    date: 'Chủ Nhật, 20/12/2026',
    lunarDate: '12/11 Năm Bính Ngọ',
    venue: 'Tư Gia Nhà Gái',
    address: 'Số 28 Phố Lý Thường Kiệt, Quận Hoàn Kiếm, Hà Nội',
    mapUrl: 'https://maps.google.com/?q=Ly+Thuong+Kiet+Hoan+Kiem+Ha+Noi',
    dressCode: 'Áo dài truyền thống / Trang phục trang trọng',
  },
  {
    id: 'thanh-hon',
    tag: 'Tiệc Chính',
    title: 'Tiệc Cưới Thành Hôn',
    time: '11:00 Đón khách • 12:00 Khai tiệc',
    date: 'Chủ Nhật, 20/12/2026',
    lunarDate: '12/11 Năm Bính Ngọ',
    venue: 'Grand Ballroom — Khách sạn JW Marriott',
    address: 'Số 8 Đỗ Đức Dục, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
    mapUrl: 'https://maps.google.com/?q=JW+Marriott+Hotel+Hanoi',
    dressCode: 'Beige • Kem • Đỏ rượu vang • Đen lịch lãm',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    caption: 'Khoảnh khắc bình yên bên nhau trong buổi sáng sớm',
    aspect: 'tall',
  },
  {
    id: 'g-2',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    caption: 'Nụ cười rạng rỡ ngày thử váy cưới',
    aspect: 'square',
  },
  {
    id: 'g-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    caption: 'Cùng nhau dạo bước dưới hàng cây thu',
    aspect: 'wide',
  },
  {
    id: 'g-4',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    caption: 'Bàn tiệc hoa trắng tinh khôi cho ngày trọng đại',
    aspect: 'square',
  },
  {
    id: 'g-5',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
    caption: 'Nắm chặt tay đi đến tận cuối con đường',
    aspect: 'tall',
  },
  {
    id: 'g-6',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    caption: 'Ánh nhìn dịu dàng thay ngàn lời yêu thương',
    aspect: 'wide',
  },
  {
    id: 'g-7',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    caption: 'Cái ôm ấm áp giữa chiều hoàng hôn',
    aspect: 'square',
  },
  {
    id: 'g-8',
    url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=85',
    caption: 'Bó hoa cưới thanh lịch điểm sắc trắng kem',
    aspect: 'square',
  },
];

export const DEFAULT_GUESTS: Guest[] = [
  {
    id: 'guest-1',
    title: 'Anh',
    name: 'Nguyễn Hoàng Minh',
    group: 'Bạn thân chú rể',
    companion: '& Người thương',
    note: 'Nhất định phải có mặt sớm chụp ảnh cùng bọn mình nhé!',
  },
  {
    id: 'guest-2',
    title: 'Chị',
    name: 'Trần Phương Thảo',
    group: 'Nhà gái',
    companion: '& Gia đình',
    note: 'Rất mong được đón gia đình chị đến chung vui trong ngày hạnh phúc.',
  },
  {
    id: 'guest-3',
    title: 'Bạn',
    name: 'Lê Đức Anh',
    group: 'Đồng nghiệp',
    companion: '',
    note: 'Cảm ơn đã luôn đồng hành cùng Quân trong công việc và cuộc sống.',
  },
  {
    id: 'guest-4',
    title: 'Em',
    name: 'Phạm Khánh Vy',
    group: 'Bạn cô dâu',
    companion: '& Bạn trai',
    note: 'Chuẩn bị váy thật xinh để bắt hoa cưới nha cô gái!',
  },
  {
    id: 'guest-5',
    title: 'Gia đình',
    name: 'Chú Đặng Quốc Bảo',
    group: 'Nhà trai',
    companion: '',
    note: 'Sự hiện diện của gia đình chú là niềm vinh hạnh lớn của hai bên gia đình.',
  },
];

export const DEFAULT_WISHES: Wish[] = [
  {
    id: 'w-1',
    name: 'Anh Nguyễn Hoàng Minh',
    side: 'Nhà trai',
    attending: 'yes',
    guestCount: 2,
    message:
      'Chúc mừng Minh Quân & Thảo Linh trăm năm hạnh phúc! Cuối cùng đôi bạn vàng cũng về chung một nhà. Hẹn gặp hai em tại lễ đường rực rỡ nhất!',
    createdAt: '2 giờ trước',
  },
  {
    id: 'w-2',
    name: 'Chị Trần Phương Thảo',
    side: 'Nhà gái',
    attending: 'yes',
    guestCount: 3,
    message:
      'Thiệp cưới đẹp xỉu luôn hai đứa ơi! Chúc cô dâu xinh đẹp nhất ngày hôm đó, chúc hai vợ chồng luôn yêu thương, thấu hiểu và sớm đón tin vui nhé!',
    createdAt: '5 giờ trước',
  },
  {
    id: 'w-3',
    name: 'Phạm Khánh Vy',
    side: 'Bạn chung',
    attending: 'yes',
    guestCount: 2,
    message:
      'Đếm ngược từng ngày để quẩy hết mình cùng cô dâu chú rể. Chúc anh chị mãi giữ được ánh mắt ngọt ngào như ngày đầu mới yêu!',
    createdAt: '1 ngày trước',
  },
];
