import { ThemeVideoData } from "./repository/ThemeVideoRepository";

// Nota: Recuerda agregar "themebycatecismId: number" a tu interfaz ThemeVideoData

export const MOCK_THEMES: ThemeVideoData[] = [
  // --- TEMAS DE COMUNIÓN (catecismId: 1) ---
  {
    themeId: 1,
    catecismId: 1,
    themebycatecismId: 1,
    themeTittle: "¿Quién es Dios?",
    subTittle: "Catequesis 1",
    icon: "home",
    status: "done",
    position: "left",
    color: "dios",
    videoIdProp: "clean_arch_01",
    ContentTittle: "El Dios vivo y verdadero",
    content:
      "Explicación profunda acerca del misterio y amor de Dios Padre como creador del universo.",
  },
  {
    themeId: 2,
    catecismId: 1,
    themebycatecismId: 2,
    themeTittle: "La Sagrada Escritura",
    subTittle: "Catequesis 2",
    icon: "book",
    status: "start",
    position: "right",
    color: "biblia",
    videoIdProp: "expo_router_v3",
    ContentTittle: "Introducción a la Biblia",
    content:
      "Aprende cómo está estructurada la Biblia y de qué manera Dios nos habla a través de ella.",
  },
  {
    themeId: 3,
    catecismId: 1,
    themebycatecismId: 3,
    themeTittle: "Jesucristo Nuestro Salvador",
    subTittle: "Catequesis 3",
    icon: "person",
    status: "blocked",
    position: "left",
    color: "jesus",
    videoIdProp: "reanimated_bounce",
    ContentTittle: "Encarnación y Redención",
    content:
      "Profundizando en la vida, milagros, pasión, muerte y resurrección de nuestro Señor Jesús.",
  },
  {
    themeId: 4,
    catecismId: 1,
    themebycatecismId: 4,
    themeTittle: "Los Sacramentos",
    subTittle: "Catequesis 4",
    icon: "heart-outline",
    status: "blocked",
    position: "right",
    color: "sacramentos",
    videoIdProp: "flexbox_mastery",
    ContentTittle: "Signos eficaces de la Gracia",
    content:
      "Encuentro dinámico con los canales sagrados instituidos por Cristo para darnos la vida eterna.",
  },
  {
    themeId: 5,
    catecismId: 1,
    themebycatecismId: 5,
    themeTittle: "La Vida de Oración",
    subTittle: "Catequesis 5",
    icon: "infinite-outline",
    status: "blocked",
    position: "left",
    color: "oracion",
    videoIdProp: "sqlite_wal_mode",
    ContentTittle: "El diálogo del alma con Dios",
    content:
      "Métodos prácticos y espirituales para entablar una comunicación íntima y diaria con el Espíritu Santo.",
  },

  // --- TEMAS DE CONFIRMACIÓN (catecismId: 2) ---
  {
    themeId: 6,
    catecismId: 2,
    themebycatecismId: 1,
    themeTittle: "El Espíritu Santo y sus Dones",
    subTittle: "Confirmación 1",
    icon: "flame-outline",
    status: "start",
    position: "left",
    color: "dios",
    videoIdProp: "pentecost_01",
    ContentTittle: "Fuego en el Corazón",
    content:
      "Descubre la tercera persona de la Santísima Trinidad y cómo actúan sus 7 dones en el confirmado.",
  },
  {
    themeId: 7,
    catecismId: 2,
    themebycatecismId: 2,
    themeTittle: "Ser Testigos de Cristo",
    subTittle: "Confirmación 2",
    icon: "shield-checkmark-outline",
    status: "blocked",
    position: "right",
    color: "biblia",
    videoIdProp: "mission_expo",
    ContentTittle: "Defensores de la Fe",
    content:
      "El compromiso del cristiano maduro: llevar el Evangelio a las realidades del mundo de hoy.",
  },
];
