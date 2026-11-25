/**
 * Validates and normalises an RSVP request body for the book launch.
 * Pure and dependency-free so it can be unit-tested with `node --test`.
 */

export const LIMITS = { name: 120, email: 254, text: 2000, maxGuests: 10, maxBooks: 20 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Keys match the `book_launch_rsvps` column names exactly. */
export interface RsvpInput {
  name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  book_copies: number;
  message: string | null;
}

export type ParseResult = { ok: true; data: RsvpInput } | { ok: false; error: string };

/** Trim a value to a string, or null if it is empty or not a string. */
function optionalText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

/**
 * Honeypot check: the form has a hidden "website" field that people never see,
 * so any value there means a bot filled it in.
 */
export function isSpam(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const website = (body as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}

export function parseRsvp(body: unknown): ParseResult {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.replace(/\s+/g, " ").trim() : "";
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";

  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > LIMITS.name) return { ok: false, error: "Name is too long." };
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // The frontend sends "yes" or "no", so we convert it to a boolean here.
  const attending = b.attending === "yes" || b.attending === true;

  let guestCount = 1;
  let bookCopies = 0;

  if (attending) {
    // Validate Guest Count
    const rawGuests = b.guestCount;
    if (rawGuests === undefined) guestCount = 1;
    else if (typeof rawGuests === "number") guestCount = rawGuests;
    else if (typeof rawGuests === "string" && /^\d+$/.test(rawGuests)) guestCount = Number(rawGuests);
    else guestCount = NaN;

    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > LIMITS.maxGuests) {
      return { ok: false, error: `Number of guests must be between 1 and ${LIMITS.maxGuests}.` };
    }

    // Validate Book Copies
    const rawBooks = b.bookCopies;
    if (rawBooks === undefined) bookCopies = 0;
    else if (typeof rawBooks === "number") bookCopies = rawBooks;
    else if (typeof rawBooks === "string" && /^\d+$/.test(rawBooks)) bookCopies = Number(rawBooks);
    else bookCopies = NaN;

    if (!Number.isInteger(bookCopies) || bookCopies < 0 || bookCopies > LIMITS.maxBooks) {
      return { ok: false, error: `Number of books must be between 0 and ${LIMITS.maxBooks}.` };
    }
  }

  const message = optionalText(b.message);
  if ((message?.length ?? 0) > LIMITS.text) {
    return { ok: false, error: `Please keep messages under ${LIMITS.text} characters.` };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      attending,
      guest_count: guestCount,
      book_copies: bookCopies,
      message,
    },
  };
}