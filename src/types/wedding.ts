export interface Guest {
  id: string;
  title: string; // Anh, Chị, Em, Bạn, Gia đình, Quý khách...
  name: string;
  group: string; // Nhà trai, Nhà gái, Bạn bè, Đồng nghiệp...
  companion?: string; // & Người thương, & Gia đình
  note?: string; // Lời mời riêng
}

export interface Wish {
  id: string;
  name: string;
  side: 'Nhà trai' | 'Nhà gái' | 'Bạn chung';
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  message: string;
  createdAt: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  location: string;
}

export interface WeddingEvent {
  id: string;
  tag: string;
  title: string;
  time: string;
  date: string;
  lunarDate: string;
  venue: string;
  address: string;
  mapUrl: string;
  dressCode?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  aspect: 'tall' | 'wide' | 'square';
}
