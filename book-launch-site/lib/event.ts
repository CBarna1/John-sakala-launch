export const BOOK = {
  title: "Finish Your Race",
  subtitle: "A Blueprint For Purposeful Living and Strong Ending",
  author: "John Sakala",
  guestOfHonor: "Alice Jere Tembo",
  guestTitle: "Managing Partner for Deloitte Zambia",
};

export const EVENT_DATE_LABEL = "Saturday · 12 December 2026";
export const EVENT_DATE_NUMERIC = "12.12.2026";
export const EVENT_TIME = "5:00 PM - 7:30 PM";
export const CITY = "Lusaka";
export const VENUE = "Africa Works Space, Agora Village Mall";
export const VENUE_ADDRESS = "Thabo Mbeki Road, Mass Media, Lusaka";
export const BOOK_PREORDER_OPTIONS = [
  { copies: 0, label: "No pre-order", price: 0 },
  { copies: 1, label: "1 copy — K300", price: 300 },
  { copies: 2, label: "2 copies — K550", price: 550 },
] as const;
export const PAYMENT_REGISTERED_NAME = "Dorcas Nakasula";
export const PAYMENT_NUMBERS = ["0963756987", "0972352332"];

// Countdown target (Zambia time UTC+2). 17:00 is 5:00 PM.
export const EVENT_START_ISO = "2026-12-12T17:00:00+02:00";