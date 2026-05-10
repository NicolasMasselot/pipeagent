import type { Contact } from "@/lib/types/contact";

export function getPriorityContact(contacts: Contact[]): Contact | null {
  if (!contacts.length) return null;
  return contacts.reduce(
    (best, c) => ((c.score ?? 0) > (best.score ?? 0) ? c : best),
    contacts[0]
  );
}
