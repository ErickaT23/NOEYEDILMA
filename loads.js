// ===================== LOADS.JS =====================
// 1) Lista de invitados (ejemplo)
const guests = [
  { id: "1", name: "Bryan Santiago y Esposa", passes: 1 },
  { id: "2", name: "Danilo De Leon y Esposa", passes: 1 },
  { id: "3", name: "Antonio Barrios y Esposa", passes: 1 },
  { id: "4", name: "Pastores e Hijos", passes: 1 },
  { id: "5", name: "Miguel Sonidista", passes: 1 },
  { id: "6", name: "Fredy Violinista y Acompañante", passes: 1 },
  { id: "7", name: "Jose Perez", passes: 1 },
  { id: "8", name: "Brulio Juanta", passes: 1 },
  { id: "9", name: "Josimar y Esposa", passes: 1 },
  { id: "10", name: "Vicente y Feliciana", passes: 1 },
  { id: "11", name: "Jeremias y Jacinta", passes: 1 },
  { id: "12", name: "Magda Velasco", passes: 1 },
  { id: "13", name: "Aracely Velasco", passes: 1 },
  { id: "14", name: "Evelin y Marlon", passes: 1 },
  { id: "15", name: "Glenda Brito", passes: 1 },
  { id: "16", name: "Vievnte y Feliciana", passes: 1 },
  { id: "17", name: "Edgar y Jhoana", passes: 1 },
  { id: "18", name: "Victot y Esposa", passes: 1 },
  { id: "19", name: "Walter", passes: 1 },
  { id: "20", name: "Feliciana Perez e Hijas", passes: 1 },
  { id: "21", name: "Pastor Rafael y Esposa", passes: 1 },
  { id: "22", name: "Emerson Brito", passes: 1 },
  { id: "23", name: "Pedro Edgar y Esposa", passes: 1 },
  { id: "24", name: "Jeny Velasco", passes: 1 },
  { id: "25", name: "Familia Velasco", passes: 1 },
  { id: "26", name: "Esechias Familia Hernandez Gonzalez", passes: 1 },
  { id: "27", name: "Estela Familia Baten Hernandez", passes: 1 },
  { id: "28", name: "Byron Familia Hernandez Vasquez", passes: 1 },
  { id: "29", name: "Pedro Hernandez y Familia", passes: 1 },
  { id: "30", name: "Elmer Familia Hernadez Rojas", passes: 1 },
  { id: "31", name: "Nery Familia Hernandez De Leon", passes: 1 },
  { id: "32", name: "Mario Familia Hernadez Alvarado", passes: 1 },
  { id: "33", name: "Marvin Familia Hernandez Paxtor", passes: 1 },
  { id: "34", name: "Naty Hernandez y Ernesto Gonzalez", passes: 1 },
  { id: "35", name: "Marta Hernandez", passes: 1 },
  { id: "36", name: "Milton Hernandez y Cristy Gonzalez", passes: 1 },
  { id: "37", name: "Rony Hernandez", passes: 1 },
  { id: "38", name: "Fredy Baten y Familia", passes: 1 },
  { id: "39", name: "Valentin Hernandez", passes: 1 },
  { id: "40", name: "Santos Hernandez", passes: 1 },
  { id: "41", name: "Mauro Hernandez", passes: 1 },
  { id: "42", name: "Carmen Hernandez", passes: 1 },
  { id: "43", name: "Hermelendo Hernandez", passes: 1 },
  { id: "44", name: "Catalina Alvarez", passes: 1 },
  { id: "45", name: "Joel Alvarez", passes: 1 },
  { id: "46", name: "Avidan Alvarez", passes: 1 },
  { id: "47", name: "Javier Alvarez", passes: 1 },
  { id: "48", name: "Zacarias Alvarez", passes: 1 },
  { id: "49", name: "Aracely Perez y Agus Chan", passes: 1 },
  { id: "50", name: "Leticia Alvarez y Familia", passes: 1 },
  { id: "51", name: "Lupita Can", passes: 1 },
  { id: "52", name: "Pastora Silvia y Familia", passes: 1 },
  { id: "53", name: "Pastora Lore y Familia", passes: 1 },
  { id: "54", name: "Hermana Azucena", passes: 1 },
  { id: "55", name: "Beatriz Orozco", passes: 1 },
  { id: "56", name: "Yesica y Ronel", passes: 1 },
  { id: "57", name: "Natalia Alvarez y Vilma Alvarez", passes: 1 },
  { id: "58", name: "Elena Alvarez", passes: 1 },
  { id: "59", name: "Genoma Alvarez", passes: 1 },
  { id: "60", name: "Edgar Lopez", passes: 1 },
  { id: "61", name: "Hermana Elizabeth Chaj", passes: 1 },
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
  if (seatsTxtEl) seatsTxtEl.textContent = "lugares para ti";
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
