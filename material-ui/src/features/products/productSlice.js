import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Smartphone X",
    description:
      "Potente smartphone con pantalla AMOLED y cámara de alta resolución.",
    price: 799.99,
    category: "Electronics",
    subcategory: "Phones",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "El Smartphone X cuenta con un procesador de última generación y almacenamiento ampliable.",
    location: {
      id: "1",
      name: "location 1",
    },
    dueDate: "12/31/2023",
    amount: 10,
  },
  {
    id: "2",
    name: "Sports Shoes",
    description:
      "Zapatillas deportivas diseñadas para brindar comodidad y rendimiento.",
    price: 99.99,
    category: "Sports",
    subcategory: "Footwear",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "Estas zapatillas cuentan con tecnología de amortiguación y suela antideslizante.",
    location: {
      id: "1",
      name: "location 1",
    },
    dueDate: "06/30/2024",
    amount: 5,
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description:
      "Auriculares inalámbricos con sonido de alta calidad y cancelación de ruido.",
    price: 149.99,
    category: "Electronics",
    subcategory: "Audio",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "Disfruta de tu música favorita sin cables y con una experiencia de sonido envolvente.",
    location: {
      id: "2",
      name: "location 2",
    },
    dueDate: "09/15/2024",
    amount: 8,
  },
  {
    id: "4",
    name: "Organic Coffee",
    description:
      "Café orgánico de origen único con sabor suave y notas dulces.",
    price: 12.99,
    category: "Food",
    subcategory: "Beverages",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "Este café se cultiva de manera sostenible y se tuesta con cuidado para preservar su sabor único.",
    location: {
      id: "2",
      name: "location 2",
    },
    dueDate: "03/31/2025",
    amount: 15,
  },
  {
    id: "5",
    name: "Fitness Tracker",
    description:
      "Dispositivo de seguimiento de actividad física para monitorear tu salud y estado físico.",
    price: 49.99,
    category: "Electronics",
    subcategory: "Wearables",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "El Fitness Tracker registra tu ritmo cardíaco, pasos, calorías quemadas y calidad del sueño.",
    location: {
      id: "3",
      name: "location 3",
    },
    dueDate: "07/31/2024",
    amount: 20,
  },
  {
    id: "6",
    name: "Leather Wallet",
    description:
      "Billetera de cuero genuino con múltiples compartimentos y diseño elegante.",
    price: 39.99,
    category: "Fashion",
    subcategory: "Accessories",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "Esta billetera ofrece espacio para tarjetas, billetes y monedas, además de protección RFID.",
    location: {
      id: "3",
      name: "location 3",
    },
    dueDate: "11/30/2023",
    amount: 12,
  },
  {
    id: "7",
    name: "Gaming Mouse",
    description:
      "Mouse diseñado especialmente para gamers con alta precisión y ergonomía.",
    price: 79.99,
    category: "Electronics",
    subcategory: "Gaming",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "El Gaming Mouse cuenta con botones programables, iluminación RGB y sensor de alta sensibilidad.",
    location: {
      id: "4",
      name: "location 4",
    },
    dueDate: "05/31/2024",
    amount: 6,
  },
  {
    id: "8",
    name: "Yoga Mat",
    description:
      "Colchoneta de yoga antideslizante y liviana para una práctica cómoda.",
    price: 29.99,
    category: "Sports",
    subcategory: "Fitness",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "La Yoga Mat proporciona amortiguación y soporte durante tus sesiones de yoga o ejercicios.",
    location: {
      id: "4",
      name: "location 4",
    },
    dueDate: "08/31/2024",
    amount: 10,
  },
  {
    id: "9",
    name: "Portable Speaker",
    description:
      "Altavoz portátil con conectividad Bluetooth y sonido estéreo de alta calidad.",
    price: 59.99,
    category: "Electronics",
    subcategory: "Audio",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "Este altavoz es resistente al agua y cuenta con una batería de larga duración para llevar la música a cualquier lugar.",
    location: {
      id: "5",
      name: "location 5",
    },
    dueDate: "10/31/2024",
    amount: 8,
  },
  {
    id: "10",
    name: "Sunglasses",
    description:
      "Gafas de sol con protección UV y diseño moderno para lucir con estilo.",
    price: 49.99,
    category: "Fashion",
    subcategory: "Accessories",
    pictures: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    details:
      "Estas gafas de sol brindan protección contra los rayos UV y son ideales para cualquier ocasión.",
    location: {
      id: "5",
      name: "location 5",
    },
    dueDate: "04/30/2025",
    amount: 10,
  },
];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getCategories: (state, action) => {},
  },
});

export default productSlice.reducer;
