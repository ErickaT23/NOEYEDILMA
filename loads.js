// ===================== LOADS.JS =====================
// 1) Lista de invitados (ejemplo)
const guests = [
  { id: "1", name: "Invitado Demo 1", passes: 2 },
  { id: "2", name: "Invitado Demo 2", passes: 1 },
  { id: "3", name: "Invitado Demo 3", passes: 2 },
  { id: "4", name: "Invitado Demo 4", passes: 3 },
  { id: "5", name: "Invitado Demo 5", passes: 1 },
];

window.LocalGuestSeeds = {
  ...(window.LocalGuestSeeds || {}),
  noeedilma2026: guests.reduce((acc, guest) => {
    acc[String(guest.id)] = {
      id: String(guest.id),
      nombre: guest.name,
      pases: Number(guest.passes || 1),
      activo: true,
    };
    return acc;
  }, {}),
};

window.seedEventGuestsToFirebase = async function seedEventGuestsToFirebase(explicitEventId) {
  const eventId = explicitEventId || window.config?.event?.defaultEventId || "noeedilma2026";
  const rsvpDB = window.RSVPDatabase;

  if (!rsvpDB?.migrateLocalGuestsToFirebase) {
    console.warn("RSVPDatabase no está disponible. Revisa que database.js esté cargado.");
    return { ok: false, guests: 0 };
  }

  await rsvpDB.seedEventConfigToFirebase?.(eventId, { force: true });
  const result = await rsvpDB.migrateLocalGuestsToFirebase(eventId, { force: false });
  console.log(`Invitados creados en Firebase: ${result.total || guests.length}`);
  return { ok: true, guests: result.total || guests.length };
};

// Helper: leer parámetros ?id=1
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function applyGuest(guest) {
  if (!guest) {
    window.currentGuest = null;
    return;
  }

  window.currentGuest = {
    id: String(guest.id),
    name: guest.name || guest.nombre || "Invitado",
    passes: Number(guest.passes ?? guest.pases ?? 1),
  };
  const nameEl = document.getElementById("guestCardName");
  const seatsEl = document.getElementById("guestCardSeats");
  const seatsTxtEl = document.getElementById("guestCardSeatsTxt");
  if (nameEl) nameEl.textContent = window.currentGuest.name;
  if (seatsEl) seatsEl.textContent = String(window.currentGuest.passes);
  if (seatsTxtEl) seatsTxtEl.textContent = window.currentGuest.passes === 1 ? "lugar para ti" : "lugares para ustedes";
  window.dispatchEvent(new CustomEvent("guest:updated"));
}

document.addEventListener("DOMContentLoaded", async () => {
  const guestId = getQueryParam("id");

  // Si no hay id, no marcamos error: solo no hay invitado
  if (!guestId) {
    window.currentGuest = null;
    return;
  }

  const guest = guests.find((g) => String(g.id) === String(guestId));

  // Firebase is the source of truth so admin edits appear in the invitation.
  if (window.RSVPDatabase?.getInvitadoById) {
    try {
      const remoteGuest = await window.RSVPDatabase.getInvitadoById(
        window.config?.event?.defaultEventId || "noeedilma2026",
        guestId
      );
      if (remoteGuest?.activo !== false) {
        applyGuest(remoteGuest);
        return;
      }
    } catch (error) {
      console.warn("No se pudo cargar el invitado desde Firebase:", error);
    }
  }

  if (guest) {
    applyGuest(guest);

    // Si tienes estos elementos en alguna parte, los llena (opcional)
    const guestNameEl = document.getElementById("guest-name");
    const passesEl = document.getElementById("passes");

    if (guestNameEl) guestNameEl.textContent = guest.name;
    if (passesEl) {
      const p = Number(guest.passes || 1);
      passesEl.textContent = `${p} ${p === 1 ? "pase" : "pases"}`;
    }
  } else {
    window.currentGuest = null;

    const guestNameEl = document.getElementById("guest-name");
    if (guestNameEl) guestNameEl.textContent = "Invitado no encontrado";
  }
});
