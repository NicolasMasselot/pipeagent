import type { Contact } from "@/lib/types/contact";
import { getSeedContacts } from "@/lib/data/seed-contacts";

/* Clé de stockage localStorage — versionnée pour faciliter les migrations futures */
const KEY = "pipeagent.contacts.v1";

/*
 * Charge les contacts depuis localStorage.
 * Si aucune donnée n'est trouvée, initialise avec le seed et le persiste.
 * SSR-safe : retourne le seed sans écriture si window n'est pas disponible.
 */
export function loadContacts(): Contact[] {
  if (typeof window === "undefined") {
    return getSeedContacts();
  }

  const raw = window.localStorage.getItem(KEY);
  if (!raw) {
    const seed = getSeedContacts();
    saveContacts(seed);
    return seed;
  }

  try {
    return JSON.parse(raw) as Contact[];
  } catch {
    /* Données corrompues — réinitialise proprement */
    return resetContacts();
  }
}

/* Persiste la liste complète des contacts en localStorage */
export function saveContacts(contacts: Contact[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(contacts));
}

/*
 * Réinitialise les contacts avec le seed et retourne la liste fraîche.
 * Utile pour le développement ou un bouton "reset" dans les settings.
 */
export function resetContacts(): Contact[] {
  const seed = getSeedContacts();
  saveContacts(seed);
  return seed;
}
