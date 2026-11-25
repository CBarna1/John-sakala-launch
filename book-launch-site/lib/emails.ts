/**
 * HTML email templates (Book Launch Theme).
 *
 * Inline CSS only: Gmail, Outlook and most other clients strip <style> tags.
 * Table-based layout for consistent rendering across clients.
 * All user-supplied values are HTML-escaped to prevent markup injection.
 */
import { BOOK, CITY, EVENT_DATE_LABEL, EVENT_TIME, VENUE } from "./event";

const NAVY = "#0f172a";
const AMBER = "#f59e0b";
const PAPER = "#f8fafc";
const SLATE_TEXT = "#334155";
const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escape characters that have meaning in HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape and keep the guest's line breaks. */
function multiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

/** Shared wrapper for the two guest-facing emails. */
function guestLayout(heading: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding:40px 32px 8px 32px;">
              <p style="margin:0;font-family:${SANS};font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${AMBER};font-weight:700;">${escapeHtml(BOOK.author)}</p>
              <h1 style="margin:16px 0 0 0;font-family:${SERIF};font-size:32px;font-weight:bold;line-height:1.2;color:${NAVY};">${heading}</h1>
              <div style="width:48px;height:2px;background-color:${AMBER};margin:24px auto 0 auto;line-height:1px;font-size:1px;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 40px 32px;font-family:${SANS};font-size:16px;line-height:1.6;color:${SLATE_TEXT};">
              ${body}
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0 0;font-family:${SANS};font-size:12px;letter-spacing:1px;color:#94a3b8;text-align:center;">${escapeHtml(BOOK.title)} · ${EVENT_DATE_LABEL} · ${CITY}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const signOff = `<p style="margin:32px 0 0 0;font-size:16px;">Warmly,<br /><span style="font-family:${SERIF};font-size:22px;color:${NAVY};font-weight:bold;">${escapeHtml(BOOK.author)}</span></p>`;

/** Confirmation for guests who accepted. */
export function attendingEmail(
  name: string,
  guestCount: number,
  bookCopies: number
): string {
  const label = (text: string) =>
    `<td style="padding:8px 0;font-family:${SANS};font-size:13px;color:${AMBER};width:100px;vertical-align:top;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${text}</td>`;
  const value = (html: string) =>
    `<td style="padding:8px 0;font-family:${SANS};font-size:16px;color:${NAVY};vertical-align:top;font-weight:500;">${html}</td>`;

  const partyLabel = guestCount === 1 ? "Just you" : `${guestCount} guests`;
  const bookLabel = bookCopies > 0 ? `${bookCopies} copy${bookCopies > 1 ? 'ies' : ''} reserved` : "None reserved";

  return guestLayout(
    "See you at the launch!",
    `<p style="margin:0 0 16px 0;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px 0;">Thank you for RSVPing to the launch of <strong>${escapeHtml(BOOK.title)}</strong>. I can't wait to celebrate with you.</p>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;background-color:${PAPER};border-left:4px solid ${AMBER};border-radius:6px;">
      <tr><td style="padding:16px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>${label("Date")}${value(`${EVENT_DATE_LABEL} at ${EVENT_TIME}`)}</tr>
          <tr>${label("Venue")}${value(`${escapeHtml(VENUE)}, ${CITY}`)}</tr>
          <tr>${label("Party")}${value(partyLabel)}</tr>
          <tr>${label("Books")}${value(bookLabel)}</tr>
        </table>
      </td></tr>
    </table>
    
    ${bookCopies > 0 ? `<p style="margin:0 0 16px 0;">We will have your ${bookCopies > 1 ? 'copies' : 'copy'} reserved at the welcome desk for you to pick up and get signed!</p>` : ''}
    <p style="margin:0 0 16px 0;">If anything changes, just reply to this email and let me know.</p>
    ${signOff}`
  );
}

/** Confirmation for guests who declined. */
export function declinedEmail(name: string): string {
  return guestLayout(
    "We'll miss you!",
    `<p style="margin:0 0 16px 0;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px 0;">Thank you for letting me know. I'm sorry you can't join us for the launch, but I'm so grateful you took the time to reply.</p>
    <p style="margin:0 0 16px 0;">If your plans change, just reply to this email and we'll do our best to make room for you.</p>
    ${signOff}`
  );
}

export interface OrganizerNotification {
  name: string;
  email: string;
  attending: boolean;
  guestCount: number;
  bookCopies: number;
  message?: string | null;
}

/** Plain, scannable summary sent to the author/organizer for each RSVP. */
export function notifyCoupleEmail({
  name,
  email,
  attending,
  guestCount,
  bookCopies,
  message,
}: OrganizerNotification): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-family:${SANS};font-size:14px;color:#64748b;width:140px;vertical-align:top;font-weight:500;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-family:${SANS};font-size:14px;color:${NAVY};vertical-align:top;font-weight:500;">${value}</td>
    </tr>`;
  const none = `<span style="color:#94a3b8;">None</span>`;

  const status = attending
    ? `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background-color:#dcfce7;color:#166534;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Attending</span>`
    : `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background-color:#fee2e2;color:#991b1b;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Declined</span>`;

  const safeEmail = escapeHtml(email);

  const rows = [
    row("Name", escapeHtml(name)),
    row("Email", `<a href="mailto:${safeEmail}" style="color:${AMBER};text-decoration:none;font-weight:600;">${safeEmail}</a>`),
    row("Status", status),
    attending ? row("Guests", String(guestCount)) : "",
    attending ? row("Books Reserved", bookCopies > 0 ? String(bookCopies) : none) : "",
    row("Message", message ? multiline(message) : none),
  ].join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);overflow:hidden;">
          
          <tr>
            <td style="background-color:${NAVY};padding:24px 32px;">
              <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${AMBER};font-weight:700;font-family:${SANS};">New RSVP · Book Launch</p>
              <h1 style="margin:8px 0 0 0;font-family:${SERIF};font-size:24px;font-weight:bold;color:#ffffff;">${escapeHtml(name)} ${attending ? "is coming" : "can't make it"}</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 32px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
              <p style="margin:24px 0 0 0;font-family:${SANS};font-size:12px;color:#94a3b8;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}