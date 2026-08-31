// Converts a US phone number as typed in the CMS ("336-842-9744") into a
// tel: link ("tel:+13368429744"). Assumes a 10-digit US number, matching
// how the business's number is formatted everywhere on the site.
export function toPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits}`;
}
