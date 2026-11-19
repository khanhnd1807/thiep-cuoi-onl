import { Guest } from '../types/wedding';

export function getGuestFromUrl(): Guest | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const name = params.get('guest') || params.get('to') || params.get('name');
  if (!name || !name.trim()) return null;

  return {
    id: 'url-guest',
    title: params.get('title') || 'Quý khách',
    name: name.trim(),
    companion: params.get('companion') || '',
    group: params.get('group') || 'Khách quý',
    note: params.get('note') || '',
  };
}

export function buildGuestInviteUrl(guest: Guest): string {
  const base =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://thiepcuoi.example.com/';

  const params = new URLSearchParams();
  if (guest.title) params.set('title', guest.title);
  params.set('guest', guest.name);
  if (guest.companion) params.set('companion', guest.companion);
  if (guest.note) params.set('note', guest.note);

  return `${base}?${params.toString()}`;
}

export function syncGuestToUrl(guest: Guest): void {
  if (typeof window === 'undefined') return;
  const url = buildGuestInviteUrl(guest);
  window.history.replaceState({}, '', url);
}

export function formatGuestDisplay(guest: Guest): string {
  const prefix = guest.title ? `${guest.title} ` : '';
  const suffix = guest.companion ? ` ${guest.companion}` : '';
  return `${prefix}${guest.name}${suffix}`.trim();
}
