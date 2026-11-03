const firebaseConfig = {
  apiKey: "AIzaSyAqOZQ5YFOdhL6dblHI5wIx10m6n4xt2Fg",
  authDomain: "buenosdeseos-twodesign.firebaseapp.com",
  databaseURL: "https://buenosdeseos-twodesign-default-rtdb.firebaseio.com",
  projectId: "buenosdeseos-twodesign",
  storageBucket: "buenosdeseos-twodesign.firebasestorage.app",
  messagingSenderId: "577908051871",
  appId: "1:577908051871:web:27fbd4e06b3d18da14b7aa"
};

const config = {
  event: {
    defaultEventId: "noeedilma2026",
    databaseURL: firebaseConfig.databaseURL,
    eventIdParam: "eventId",
    dateISO: "2026-12-12T10:00:00-06:00",
    legacyFallback: {
      read: false,
      write: false,
      subscribe: false
    }
  },
  admin: {
    adminKey: "twodesign123",
    keyParam: "key",
    legacyKeyParam: "admin"
  },
  seo: {
    titulo: "Noe Velasco y Edilma Hernandez | Invitación de boda",
    descripcion: "Invitación de boda de Noe Velasco y Edilma Hernandez.",
    autor: "Two Design",
    keywords: "Noe Velasco, Edilma Hernandez, invitación de boda, Quetzaltenango",
    ogImage: "https://noscasamosnoeyedilma.thetwodesign.com/Images/S3.png"
  },
  pareja: {
    nombres: "Noe Velasco & Edilma Hernandez",
    portadaEtiqueta: "Nos casamos",
    novia: "Edilma Hernandez",
    novio: "Noe Velasco",
    fecha: "12-12-2026",
    fechaVisible: "12.12.2026",
    fechaDestacada: "12 . 12 . 2026",
    cierreSubtitulo: "Porque entre todas las historias posibles, decidimos elegir la nuestra..."
  },
  ceremonia: {
    mensaje: "Guiados por la mano de Dios y la certeza de nuestro amor, y con la bendición de nuestros amados padres, hoy unimos nuestras vidas para siempre.",
    padresNoviaTitulo: "Padres de la Novia",
    padresNovia: "Jacobo Hernández Vásquez y Paulina Álvarez Pérez",
    padresNovioTitulo: "Madre del Novio",
    padresNovio: "Elena Perez Rivas"
  },
  musica: {
    titulo: "Nuestra Canción",
    archivo: "music.mp3",
    playlistUrl: "https://open.spotify.com/playlist/2rDP5ogx0IHwWsK59PW3Xt?si=3f46a7854d264d56&pt=6f9927099d39627d2020e9537e1b1c42"
  },
  evento: {
    ceremonia: {
      titulo: "Ceremonia",
      lugar: "Iglesia Dios con Nosotros",
      hora: "10:00 a. m.",
      direccion: "Quetzaltenango",
      ubicacionUrl: "https://maps.app.goo.gl/6KDqLvMwFcD5CKHv9"
    },
    recepcion: {
      titulo: "Recepción",
      lugar: "Iglesia Dios con Nosotros",
      hora: "9:30 a. m.",
      direccion: "Quetzaltenango",
      ubicacionUrl: "https://maps.app.goo.gl/6KDqLvMwFcD5CKHv9"
    },
    calendario: {
      detalle: "Nos encantará compartir este día contigo.",
      ubicacion: "Iglesia Dios con Nosotros, Quetzaltenango"
    }
  },
  itinerario: {
    titulo: "Itinerario",
    items: [
      { icono: "Images/ICONO-3.png", alt: "Recepción", hora: "9:30 a. m.", texto: "Recepción" },
      { icono: "Images/ICONO-1.png", alt: "Ceremonia", hora: "10:00 a. m.", texto: "Ceremonia" }
    ]
  },
  dressCode: {
    titulo: "Dress Code",
    subtitulo: "Gris y blanco",
    descripcion: "El color de los novios será gris y blanco. Les agradeceremos acompañarnos respetando esta paleta de colores para mantener la armonía de nuestra celebración.",
    coloresReservados: [
      { nombre: "Gris oscuro metalizado", color: "#3D4147" },
      { nombre: "Plateado oscuro metalizado", color: "#8A9098" },
      { nombre: "Blanco", color: "#FFFFFF" }
    ]
  },
  regalo: {
    titulo: "Regalo",
    descripcion: "Tu presencia en nuestra boda es el mejor regalo que podríamos recibir. Si deseas tener un detalle con nosotros, será recibido con mucho cariño.",
    transferencia: {
      titular: "",
      medio: "",
      cuenta: "",
      tipo: ""
    }
  },
  textos: {
    mensajeInvitado: "Para nosotros será un privilegio compartir contigo un momento tan especial.",
    mensajePases: "Hemos reservado {pases} lugares en su honor",
    fechaLabel: "Nuestro gran día"
  },
  deseos: {
    titulo: "Buenos deseos",
    intro: "Déjanos un mensaje especia para los novios, en este día tan especial."
  },
  adultos: {
    titulo: "Solo adultos",
    descripcion: "",
    mostrar: false
  },
  rsvp: {
    titulo: "Confirmar asistencia",
    mensaje: "Para nosotros es muy importante que confirmes tu asistencia lo antes posible, o bien indicarnos si no podrás acompañarnos."
  },
  galeria: {
    portadaPrincipal: "Images/E2.png",
    historia: [],
    celebracion: [],
    pareja: []
  },
  footer: {
    hashtag: "#NoeYEdilma",
    instagramUrl: "https://www.instagram.com/thetwodesign",
    facebookUrl: "https://www.facebook.com/thetwodesign",
    marcaTexto: "Diseño",
    marcaNombre: "Two Design",
    marcaUrl: "https://twodesign.com"
  }
};

window.config = config;
window.firebaseConfig = firebaseConfig;
