// Todos los textos de la landing en catalán y español viven aquí.
// Edita libremente los valores (nunca las claves) para corregir copy sin
// tocar el resto del código. `ca` y `es` deben mantener exactamente la misma
// forma — TypeScript avisa si te dejas o añades una clave de más.

export type Locale = "ca" | "es";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  header: {
    eventName: string;
    bookCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    ctaPrimary: string;
    scrollHint: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
  };
  whatIsIt: {
    heading: string;
    subheading: string;
    items: { title: string; body: string }[];
  };
  practicalInfo: {
    heading: string;
    venueLabel: string;
    datesLabel: string;
    datesValue: string;
    hoursLabel: string;
    morningLabel: string;
    afternoonLabel: string;
    sundayNote: string;
    capacityNote: string;
    ctaSecondary: string;
  };
  booking: {
    heading: string;
    subheading: string;
    stepLabels: [string, string, string, string, string];
    date: {
      heading: string;
      helper: string;
      next: string;
    };
    slot: {
      heading: string;
      helper: string;
      morning: string;
      afternoon: string;
      full: string;
      seatLeft: string;
      seatsLeft: string;
      loading: string;
      empty: string;
      back: string;
      next: string;
    };
    people: {
      heading: string;
      helper: (max: number) => string;
      person: string;
      people: string;
      decrease: string;
      increase: string;
      back: string;
      next: string;
    };
    contact: {
      heading: string;
      helper: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      privacyLabel: string;
      privacyText: string;
      back: string;
      submit: string;
      submitting: string;
    };
    errors: {
      required: string;
      invalid_email: string;
      invalid_phone: string;
      party_size_max: string;
      party_size_min: string;
      too_long: string;
      privacy_required: string;
      slot_full: string;
      invalid_slot: string;
      server_error: string;
      network_error: string;
    };
    confirmation: {
      heading: string;
      subheading: string;
      dateLabel: string;
      timeLabel: string;
      peopleLabel: string;
      codeLabel: string;
      newBooking: string;
    };
    summary: {
      heading: string;
      dateLabel: string;
      timeLabel: string;
      peopleLabel: string;
      edit: string;
    };
  };
  footer: {
    venueHeading: string;
    contactHeading: string;
    contactEmail: string;
    credits: string;
  };
}

export const translations: Record<Locale, Dictionary> = {
  ca: {
    meta: {
      title: "L'amagatall del Papu · Sitges 2026",
      description:
        "Escape room immersiu de realitat virtual al Festival Internacional de Cinema Fantàstic de Catalunya. Reserva la teva plaça a l'Espai Joan Tarrida, Sitges.",
    },
    header: {
      eventName: "L'amagatall del Papu",
      bookCta: "Reserva",
    },
    hero: {
      eyebrow: "Festival Internacional de Cinema Fantàstic de Catalunya · Sitges 2026",
      title: "L'amagatall del Papu",
      tagline:
        "Les petjades porten fins a l'armari. A l'altra banda, una dimensió desconeguda t'espera. Travessa-la, supera les proves i ajuda en Pau a retrobar el seu germà.",
      ctaPrimary: "Reserva la teva plaça",
      scrollHint: "Descobreix la història",
    },
    story: {
      heading: "La història",
      paragraphs: [
        "En Pau es desperta enmig de la nit i descobreix que el seu llit és buit: en Joan, el seu germà petit, ha desaparegut.",
        "A terra, unes petjades estranyes duen fins a l'armari de l'habitació. És l'amagatall del Papu, l'ésser que s'endú els infants mentre dormen.",
        "La porta de l'armari s'obre a una altra dimensió... i només tu pots ajudar en Pau a travessar-la, superar les seves quatre proves i portar en Joan de tornada a casa. No trigueu, en Joan us necessita.",
      ],
    },
    whatIsIt: {
      heading: "Què és L'amagatall del Papu?",
      subheading: "Una experiència immersiva diferent i coral, creada per l'alumnat d'arts plàstiques i disseny.",
      items: [
        {
          title: "Escape room + realitat virtual",
          body: "Comences en una sala física que recrea l'ambientació de la història i continues l'aventura amb ulleres de realitat virtual, en un món interactiu.",
        },
        {
          title: "Viscut en primera persona",
          body: "Tota l'escenografia, el disseny 3D i la narrativa han estat creats per l'alumnat de l'Escola d'Art Deià, inspirats en la mitologia i les rondalles catalanes.",
        },
        {
          title: "4 proves per rescatar en Joan",
          body: "Supera els quatre reptes de l'amagatall del Papu per obrir el camí de tornada i retrobar-te amb el teu germà.",
        },
        {
          title: "7 minuts, fins a 7 persones",
          body: "Cada pase dura 7 minuts i hi pot participar un grup de fins a 7 persones alhora.",
        },
      ],
    },
    practicalInfo: {
      heading: "Informació pràctica",
      venueLabel: "Espai Joan Tarrida — C. Joan Tarrida, 10-12, 08870 Sitges",
      datesLabel: "Dates",
      datesValue: "Del 8 al 18 d'octubre de 2026",
      hoursLabel: "Horaris",
      morningLabel: "Matins: 11.00 – 14.30 h",
      afternoonLabel: "Tardes: 16.00 – 19.30 h",
      sundayNote: "El diumenge 18 d'octubre només hi ha sessió de matí.",
      capacityNote: "Cada pase dura 7 minuts i té capacitat per a 7 persones.",
      ctaSecondary: "Reserva ara",
    },
    booking: {
      heading: "Reserva la teva plaça",
      subheading: "Tria dia i pase, indica quants sou i confirma les teves dades. Trigaràs menys d'un minut.",
      stepLabels: ["Dia", "Pase", "Persones", "Dades", "Fet"],
      date: {
        heading: "Quin dia vindràs?",
        helper: "Selecciona un dia del festival, entre el 8 i el 18 d'octubre.",
        next: "Continua",
      },
      slot: {
        heading: "A quina hora?",
        helper: "Cada pase dura 7 minuts. Els pases complets apareixen desactivats.",
        morning: "Matí",
        afternoon: "Tarda",
        full: "Complet",
        seatLeft: "plaça lliure",
        seatsLeft: "places lliures",
        loading: "Carregant disponibilitat…",
        empty: "No hi ha pases disponibles per a aquest dia.",
        back: "Enrere",
        next: "Continua",
      },
      people: {
        heading: "Quantes persones sou?",
        helper: (max) => `Places disponibles en aquest pase: ${max}.`,
        person: "persona",
        people: "persones",
        decrease: "Una persona menys",
        increase: "Una persona més",
        back: "Enrere",
        next: "Continua",
      },
      contact: {
        heading: "Les teves dades",
        helper: "Les farem servir només per confirmar la teva reserva.",
        firstName: "Nom",
        lastName: "Cognoms",
        email: "Correu electrònic",
        phone: "Telèfon",
        privacyLabel: "Accepto la política de privacitat",
        privacyText:
          "Les dades facilitades s'utilitzaran únicament per gestionar aquesta reserva i contactar-te si cal. No es cediran a tercers.",
        back: "Enrere",
        submit: "Confirma la reserva",
        submitting: "Confirmant…",
      },
      errors: {
        required: "Aquest camp és obligatori.",
        invalid_email: "Introdueix un correu electrònic vàlid.",
        invalid_phone: "Introdueix un telèfon vàlid.",
        party_size_max: "Supera les places disponibles en aquest pase.",
        party_size_min: "Cal com a mínim 1 persona.",
        too_long: "Aquest text és massa llarg.",
        privacy_required: "Cal acceptar la política de privacitat.",
        slot_full: "Aquest pase s'acaba d'omplir. Tria'n un altre, si us plau.",
        invalid_slot: "Aquest pase ja no és vàlid. Torna a seleccionar-ne un.",
        server_error: "Hi ha hagut un error. Torna-ho a provar en uns segons.",
        network_error: "No s'ha pogut connectar. Comprova la teva connexió i torna-ho a provar.",
      },
      confirmation: {
        heading: "Reserva confirmada!",
        subheading: "T'hem enviat els detalls. Ens veiem a l'amagatall del Papu.",
        dateLabel: "Dia",
        timeLabel: "Pase",
        peopleLabel: "Persones",
        codeLabel: "Codi de reserva",
        newBooking: "Fer una altra reserva",
      },
      summary: {
        heading: "Resum",
        dateLabel: "Dia",
        timeLabel: "Pase",
        peopleLabel: "Persones",
        edit: "Modificar",
      },
    },
    footer: {
      venueHeading: "Lloc",
      contactHeading: "Contacte",
      contactEmail: "Adreça electrònica",
      credits:
        "Un projecte de l'alumnat de l'Escola d'Art Deià, en el marc del Festival Internacional de Cinema Fantàstic de Catalunya — Sitges 2026.",
    },
  },
  es: {
    meta: {
      title: "El escondite del Papu (L'amagatall del Papu) · Sitges 2026",
      description:
        "Escape room inmersivo de realidad virtual en el Festival Internacional de Cine Fantástico de Cataluña. Reserva tu plaza en el Espai Joan Tarrida, Sitges.",
    },
    header: {
      eventName: "L'amagatall del Papu",
      bookCta: "Reserva",
    },
    hero: {
      eyebrow: "Festival Internacional de Cine Fantástico de Cataluña · Sitges 2026",
      title: "L'amagatall del Papu",
      tagline:
        "Las huellas llevan hasta el armario. Al otro lado, una dimensión desconocida te espera. Crúzala, supera las pruebas y ayuda a Pau a reencontrarse con su hermano.",
      ctaPrimary: "Reserva tu plaza",
      scrollHint: "Descubre la historia",
    },
    story: {
      heading: "La historia",
      paragraphs: [
        "Pau se despierta en plena noche y descubre que su cama está vacía: Joan, su hermano pequeño, ha desaparecido.",
        "En el suelo, unas huellas extrañas llevan hasta el armario de la habitación. Es el escondite del Papu, el ser que se lleva a los niños mientras duermen.",
        "La puerta del armario se abre a otra dimensión... y solo tú puedes ayudar a Pau a cruzarla, superar sus cuatro pruebas y traer a Joan de vuelta a casa. No tardéis, Joan os necesita.",
      ],
    },
    whatIsIt: {
      heading: "¿Qué es L'amagatall del Papu?",
      subheading: "Una experiencia inmersiva diferente y coral, creada por el alumnado de artes plásticas y diseño.",
      items: [
        {
          title: "Escape room + realidad virtual",
          body: "Empiezas en una sala física que recrea la ambientación de la historia y continúas la aventura con gafas de realidad virtual, en un mundo interactivo.",
        },
        {
          title: "Vivido en primera persona",
          body: "Toda la escenografía, el diseño 3D y la narrativa han sido creados por el alumnado de la Escola d'Art Deià, inspirados en la mitología y las rondallas catalanas.",
        },
        {
          title: "4 pruebas para rescatar a Joan",
          body: "Supera los cuatro retos del escondite del Papu para abrir el camino de vuelta y reencontrarte con tu hermano.",
        },
        {
          title: "7 minutos, hasta 7 personas",
          body: "Cada pase dura 7 minutos y puede participar un grupo de hasta 7 personas a la vez.",
        },
      ],
    },
    practicalInfo: {
      heading: "Información práctica",
      venueLabel: "Espai Joan Tarrida — C. Joan Tarrida, 10-12, 08870 Sitges",
      datesLabel: "Fechas",
      datesValue: "Del 8 al 18 de octubre de 2026",
      hoursLabel: "Horarios",
      morningLabel: "Mañanas: 11:00 – 14:30 h",
      afternoonLabel: "Tardes: 16:00 – 19:30 h",
      sundayNote: "El domingo 18 de octubre solo hay sesión de mañana.",
      capacityNote: "Cada pase dura 7 minutos y tiene capacidad para 7 personas.",
      ctaSecondary: "Reserva ahora",
    },
    booking: {
      heading: "Reserva tu plaza",
      subheading: "Elige día y pase, indica cuántos sois y confirma tus datos. Tardarás menos de un minuto.",
      stepLabels: ["Día", "Pase", "Personas", "Datos", "Hecho"],
      date: {
        heading: "¿Qué día vendrás?",
        helper: "Selecciona un día del festival, entre el 8 y el 18 de octubre.",
        next: "Continuar",
      },
      slot: {
        heading: "¿A qué hora?",
        helper: "Cada pase dura 7 minutos. Los pases completos aparecen desactivados.",
        morning: "Mañana",
        afternoon: "Tarde",
        full: "Completo",
        seatLeft: "plaza libre",
        seatsLeft: "plazas libres",
        loading: "Cargando disponibilidad…",
        empty: "No hay pases disponibles para este día.",
        back: "Atrás",
        next: "Continuar",
      },
      people: {
        heading: "¿Cuántas personas sois?",
        helper: (max) => `Plazas disponibles en este pase: ${max}.`,
        person: "persona",
        people: "personas",
        decrease: "Una persona menos",
        increase: "Una persona más",
        back: "Atrás",
        next: "Continuar",
      },
      contact: {
        heading: "Tus datos",
        helper: "Los usaremos únicamente para confirmar tu reserva.",
        firstName: "Nombre",
        lastName: "Apellidos",
        email: "Correo electrónico",
        phone: "Teléfono",
        privacyLabel: "Acepto la política de privacidad",
        privacyText:
          "Los datos facilitados se utilizarán únicamente para gestionar esta reserva y contactarte si es necesario. No se cederán a terceros.",
        back: "Atrás",
        submit: "Confirmar reserva",
        submitting: "Confirmando…",
      },
      errors: {
        required: "Este campo es obligatorio.",
        invalid_email: "Introduce un correo electrónico válido.",
        invalid_phone: "Introduce un teléfono válido.",
        party_size_max: "Supera las plazas disponibles en este pase.",
        party_size_min: "Se necesita al menos 1 persona.",
        too_long: "Este texto es demasiado largo.",
        privacy_required: "Debes aceptar la política de privacidad.",
        slot_full: "Este pase se acaba de completar. Elige otro, por favor.",
        invalid_slot: "Este pase ya no es válido. Vuelve a seleccionar uno.",
        server_error: "Ha ocurrido un error. Vuelve a intentarlo en unos segundos.",
        network_error: "No se ha podido conectar. Comprueba tu conexión e inténtalo de nuevo.",
      },
      confirmation: {
        heading: "¡Reserva confirmada!",
        subheading: "Te hemos enviado los detalles. Nos vemos en el escondite del Papu.",
        dateLabel: "Día",
        timeLabel: "Pase",
        peopleLabel: "Personas",
        codeLabel: "Código de reserva",
        newBooking: "Hacer otra reserva",
      },
      summary: {
        heading: "Resumen",
        dateLabel: "Día",
        timeLabel: "Pase",
        peopleLabel: "Personas",
        edit: "Modificar",
      },
    },
    footer: {
      venueHeading: "Lugar",
      contactHeading: "Contacto",
      contactEmail: "Correo electrónico",
      credits:
        "Un proyecto del alumnado de la Escola d'Art Deià, en el marco del Festival Internacional de Cine Fantástico de Cataluña — Sitges 2026.",
    },
  },
};
