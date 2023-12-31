import ProductInventory from "./pages/ProductInventory";
import PDFReport from "./components/ReportTemplate";
import getReport from "./helpers/getReport";
import Dashboard from "./pages/dashboard";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import fetchImage from "./utils/fetchImage";
import HandleNotifaction from "./components/NotificationPDF";
import { BlobProvider } from "@react-pdf/renderer";
import HandleNotification from "./components/NotificationPDF";
import HandleTable from "./components/TablePDF";

function App() {
  const jsonData = [
    {
      name: "Cepillo Dental",
      deleted: false,
      description:
        "Cepillo de dientes de cerdas suaves para una limpieza efectiva.",
      costPrice: 1500,
      costCurrency: "CRC",
      salePrice: 3000,
      saleCurrency: "CRC",
      threshold: 10,
      picture: "https://drive.google.com/uc?id=1abcdefg",
      category: null,
      provider: {
        name: "OralCare",
      },
      unit: {
        name: "Unidad",
      },
      items: [
        {
          name: "Cepillo Dental",
          variant: "regular",
          variantValue: "Regular",
          details: "Cepillo de dientes con mango ergonómico",
          hasExpirationDate: false,
          expirationDate: null,
          quantity: 50,
          stocks: {
            workspace: {
              name: "Almacén Principal",
            },
          },
        },
      ],
    },
    {
      name: "Hilo Dental",
      deleted: false,
      description:
        "Hilo dental de alta resistencia para una limpieza interdental eficaz.",
      costPrice: 500,
      costCurrency: "CRC",
      salePrice: 1200,
      saleCurrency: "CRC",
      threshold: 5,
      picture: "https://drive.google.com/uc?id=2hijklmn",
      category: null,
      provider: {
        name: "DentalFloss",
      },
      unit: {
        name: "Unidad",
      },
      items: [
        {
          name: "Hilo Dental",
          variant: "regular",
          variantValue: "Regular",
          details: "Hilo dental encerado",
          hasExpirationDate: false,
          expirationDate: null,
          quantity: 100,
          stocks: {
            workspace: {
              name: "Almacén Principal",
            },
          },
        },
      ],
    },
    {
      name: "Pasta de Dientes",
      deleted: false,
      description:
        "INDICACIONES. La pasta dentífrica GingiKIN B5 está indicada para el cuidado diario:- Ayuda a controlar el biofilm dental, protección antiplaca.- Fortalece y tonifica las encías, acción antioxidante y revitalizante.- Previene la caries y refuerza el esmalte dental. MODO DE USO. Cepillarse los dientes durante 2 o 3 minutos, como mínimo tres veces al día, preferentemente después de cada comida y antes de acostarse. ADVERTENCIAS. Indicado para mayores de 12 años. No ingerir.",
      costPrice: 9000,
      costCurrency: "CRC",
      salePrice: 25000,
      saleCurrency: "CRC",
      threshold: 20,
      picture:
        "https://drive.google.com/uc?id=1wyfRuedLaAqSYN7XbShq5pImulxCsb7a",
      category: null,
      provider: {
        name: "GingiKIN",
      },
      unit: {
        name: "Mililitros",
      },
      items: [
        {
          name: "Blanqueadora",
          variant: "other",
          variantValue: "Blanqueadora",
          details: "Pasta de Dientes blanqueadora",
          hasExpirationDate: true,
          expirationDate: "2024-07-18T00:00:00-06:00",
          quantity: 8,
          stocks: {
            workspace: {
              name: "Bodega Movil",
            },
          },
        },
      ],
    },
    {
      name: "Enjuague Bucal",
      deleted: false,
      description:
        "Enjuague bucal para refrescar el aliento y combatir las bacterias.",
      costPrice: 3000,
      costCurrency: "CRC",
      salePrice: 6000,
      saleCurrency: "CRC",
      threshold: 15,
      picture: "https://drive.google.com/uc?id=9qrstuvwxyz",
      category: null,
      provider: {
        name: "FreshBreath",
      },
      unit: {
        name: "Botella",
      },
      items: [
        {
          name: "Enjuague Bucal",
          variant: "regular",
          variantValue: "Regular",
          details: "Enjuague bucal con sabor a menta",
          hasExpirationDate: true,
          expirationDate: "2024-12-31T00:00:00-06:00",
          quantity: 20,
          stocks: {
            workspace: {
              name: "Bodega Movil",
            },
          },
        },
      ],
    },
    {
      name: "Limpiador de Lengua",
      deleted: false,
      description:
        "Limpiador de lengua para eliminar bacterias y refrescar el aliento.",
      costPrice: 800,
      costCurrency: "CRC",
      salePrice: 1800,
      saleCurrency: "CRC",
      threshold: 8,
      picture: "https://drive.google.com/uc?id=3abcdefg",
      category: null,
      provider: {
        name: "FreshBreath",
      },
      unit: {
        name: "Unidad",
      },
      items: [
        {
          name: "Limpiador de Lengua",
          variant: "regular",
          variantValue: "Regular",
          details: "Limpiador de lengua con mango antideslizante",
          hasExpirationDate: false,
          expirationDate: null,
          quantity: 30,
          stocks: {
            workspace: {
              name: "Almacén Principal",
            },
          },
        },
      ],
    },
    {
      name: "Crema para Aftas",
      deleted: false,
      description: "Crema para aliviar y tratar las aftas bucales.",
      costPrice: 2000,
      costCurrency: "CRC",
      salePrice: 4000,
      saleCurrency: "CRC",
      threshold: 5,
      picture: "https://drive.google.com/uc?id=4hijklmn",
      category: null,
      provider: {
        name: "OralCare",
      },
      unit: {
        name: "Tubo",
      },
      items: [
        {
          name: "Crema para Aftas",
          variant: "regular",
          variantValue: "Regular",
          details: "Crema para aftas con acción calmante",
          hasExpirationDate: true,
          expirationDate: "2023-12-31T00:00:00-06:00",
          quantity: 10,
          stocks: {
            workspace: {
              name: "Bodega Movil",
            },
          },
        },
      ],
    },
    {
      name: "Protección Bucal",
      deleted: false,
      description:
        "Protector bucal para deportistas y personas que practican actividades de alto impacto.",
      costPrice: 3500,
      costCurrency: "CRC",
      salePrice: 7000,
      saleCurrency: "CRC",
      threshold: 3,
      picture: "https://drive.google.com/uc?id=5opqrstu",
      category: null,
      provider: {
        name: "SportsDent",
      },
      unit: {
        name: "Unidad",
      },
      items: [
        {
          name: "Protector Bucal",
          variant: "regular",
          variantValue: "Regular",
          details: "Protector bucal termoformable",
          hasExpirationDate: false,
          expirationDate: null,
          quantity: 20,
          stocks: {
            workspace: {
              name: "Almacén Principal",
            },
          },
        },
      ],
    },
    {
      name: "Cera para Ortodoncia",
      deleted: false,
      description:
        "Cera para aliviar el roce y la irritación causada por los brackets y aparatos de ortodoncia.",
      costPrice: 1200,
      costCurrency: "CRC",
      salePrice: 2500,
      saleCurrency: "CRC",
      threshold: 10,
      picture: "https://drive.google.com/uc?id=6vwxyz01",
      category: null,
      provider: {
        name: "OrthoCare",
      },
      unit: {
        name: "Estuche",
      },
      items: [
        {
          name: "Cera para Ortodoncia",
          variant: "regular",
          variantValue: "Regular",
          details: "Cera para ortodoncia en presentación de estuche",
          hasExpirationDate: false,
          expirationDate: null,
          quantity: 30,
          stocks: {
            workspace: {
              name: "Almacén Principal",
            },
          },
        },
      ],
    },
    {
      name: "Enjuague Bucal para Niños",
      deleted: false,
      description:
        "Enjuague bucal especialmente formulado para niños, con sabor a frutas y baja concentración de alcohol.",
      costPrice: 2500,
      costCurrency: "CRC",
      salePrice: 5000,
      saleCurrency: "CRC",
      threshold: 7,
      picture: "https://drive.google.com/uc?id=7uvwxyz23",
      category: null,
      provider: {
        name: "KidsDent",
      },
      unit: {
        name: "Botella",
      },
      items: [
        {
          name: "Enjuague Bucal para Niños",
          variant: "regular",
          variantValue: "Regular",
          details: "Enjuague bucal con sabor a fresa",
          hasExpirationDate: true,
          expirationDate: "2024-09-30T00:00:00-06:00",
          quantity: 15,
          stocks: {
            workspace: {
              name: "Bodega Movil",
            },
          },
        },
      ],
    },
    {
      name: "Pastillas para el Mal aliento",
      deleted: false,
      description:
        "Pastillas refrescantes para combatir el mal aliento y mantener un aliento fresco durante el día.",
      costPrice: 1800,
      costCurrency: "CRC",
      salePrice: 4000,
      saleCurrency: "CRC",
      threshold: 12,
      picture: "https://drive.google.com/uc?id=8abcdefgh",
      category: null,
      provider: {
        name: "FreshBreath",
      },
      unit: {
        name: "Caja",
      },
      items: [
        {
          name: "Pastillas para el Mal aliento",
          variant: "regular",
          variantValue: "Regular",
          details: "Pastillas para el mal aliento con sabor a menta",
          hasExpirationDate: true,
          expirationDate: "2024-10-31T00:00:00-06:00",
          quantity: 25,
          stocks: {
            workspace: {
              name: "Bodega Movil",
            },
          },
        },
      ],
    },
    {
      name: "Seda Dental",
      deleted: false,
      description:
        "Seda dental de calidad premium para una limpieza profunda entre los dientes.",
      costPrice: 600,
      costCurrency: "CRC",
      salePrice: 1500,
      saleCurrency: "CRC",
      threshold: 8,
      picture: "https://drive.google.com/uc?id=9ijklmno",
      category: null,
      provider: {
        name: "DentalFloss",
      },
      unit: {
        name: "Unidad",
      },
      items: [
        {
          name: "Seda Dental",
          variant: "regular",
          variantValue: "Regular",
          details: "Seda dental resistente al desgarro",
          hasExpirationDate: false,
          expirationDate: null,
          quantity: 50,
          stocks: {
            workspace: {
              name: "Almacén Principal",
            },
          },
        },
      ],
    },
  ];

  const userData = {
    actualUser: "Pedro",
    itemsAdded: 65,
    itemsRemoved: 67,
    TotalValue: 5000000,
    TotalAmount: 2390,
    incomeProducts: [
      {
        id: 1,
        user: "Pedro",
        cellar: "Bodega A",
        name: "Crema dental",
        quantity: 40,
        date: "2023-01-15",
      },
      {
        id: 2,
        user: "María",
        cellar: "Bodega B",
        name: "Enjuague bucal",
        quantity: 20,
        date: "2023-02-10",
      },
      {
        id: 3,
        user: "Carlos",
        cellar: "Bodega A",
        name: "Cepillo suave",
        quantity: 15,
        date: "2023-03-05",
      },
      {
        id: 4,
        user: "Ana",
        cellar: "Bodega C",
        name: "Hilo dental",
        quantity: 35,
        date: "2023-04-29",
      },
      {
        id: 5,
        user: "Luis",
        cellar: "Bodega A",
        name: "Pasta sensi",
        quantity: 15,
        date: "2023-05-23",
      },
      {
        id: 6,
        user: "Laura",
        cellar: "Bodega B",
        name: "Cepillo interdental",
        quantity: 40,
        date: "2023-06-18",
      },
      {
        id: 7,
        user: "Andrés",
        cellar: "Bodega C",
        name: "Enjuague con flúor",
        quantity: 55,
        date: "2023-06-30",
      },
      {
        id: 8,
        user: "Lucía",
        cellar: "Bodega A",
        name: "Enjuague sin alcohol",
        quantity: 40,
        date: "2023-07-05",
      },
      {
        id: 9,
        user: "Miguel",
        cellar: "Bodega B",
        name: "Cepillo eléctrico",
        quantity: 35,
        date: "2023-07-12",
      },
    ],
    outcomeProducts: [
      {
        id: 11,
        user: "Juan",
        cellar: "Bodega A",
        name: "Crema dental",
        quantity: 30,
        date: "2023-01-20",
      },
      {
        id: 12,
        user: "Elena",
        cellar: "Bodega B",
        name: "Enjuague bucal",
        quantity: 20,
        date: "2023-02-12",
      },
      {
        id: 13,
        user: "Pedro",
        cellar: "Bodega A",
        name: "Cepillo suave",
        quantity: 10,
        date: "2023-03-08",
      },
      {
        id: 14,
        user: "María",
        cellar: "Bodega C",
        name: "Hilo dental",
        quantity: 25,
        date: "2023-04-25",
      },
      {
        id: 15,
        user: "Pedro",
        cellar: "Bodega A",
        name: "Pasta sensi",
        quantity: 8,
        date: "2023-05-19",
      },
      {
        id: 16,
        user: "Laura",
        cellar: "Bodega B",
        name: "Cepillo interdental",
        quantity: 25,
        date: "2023-06-10",
      },
      {
        id: 17,
        user: "Andrea",
        cellar: "Bodega C",
        name: "Enjuague con flúor",
        quantity: 25,
        date: "2023-06-28",
      },
      {
        id: 18,
        user: "Carolina",
        cellar: "Bodega B",
        name: "Cepillo eléctrico",
        quantity: 10,
        date: "2023-07-05",
      },
      {
        id: 19,
        user: "Julio",
        cellar: "Bodega A",
        name: "Enjuague sin alcohol",
        quantity: 10,
        date: "2023-07-02",
      },
    ],
    cellars: [
      {
        name: "Bodega A",
        value: 5500,
      },
      {
        name: "Bodega B",
        value: 9876,
      },
      {
        name: "Bodega C",
        value: 4300,
      },
    ],
  };

  // const data = [
  //   {
  //     title: "Inventario Bajo",
  //     rawBody: [
  //       {
  //         productName: "Lápiz Mecánico HB",
  //         productCode: "PRODUCTO-2",
  //         itemName: "Lápiz Mecánico HB",
  //         itemCode: "EXISTS-2",
  //         itemId: "6ab84c72e9f74f87a5a3b2f1",
  //         productId: "6ab98416cfe87d230176c3e8",
  //         threshold: 5,
  //       },
  //     ],
  //     type: "lowStock",
  //     user: {
  //       _id: "6479b27df0c732726d2fd784",
  //       name: "Sistema",
  //       email: "sistema@gmail.com",
  //       picture: "",
  //       restricted: false,
  //     },
  //     fromWorkspace: {
  //       _id: "64a592b44a210b64789a68b0",
  //       name: "Bodega Móvil",
  //       description: "2",
  //       deleted: false,
  //       picture:
  //         "https://drive.google.com/uc?export=view&id=1bBmNAaAf4vtPSm8TVyYQUaj6LwDhPohp",
  //       collectionFolderId: "1W-t1FvP6Mu9lXsYmltouYKyIC7lAJQ-z",
  //       createdAt: "2023-07-05T15:56:36.483Z",
  //       updatedAt: "2023-08-24T19:06:14.620Z",
  //       __v: 0,
  //       fileId: "1bBmNAaAf4vtPSm8TVyYQUaj6LwDhPohp",
  //     },
  //     userDetails: "",
  //     date: "2023-08-25T09:18:42.731Z",
  //     status: false,
  //     deleted: false,
  //     createdAt: "2023-08-25T09:18:43.589Z",
  //     updatedAt: "2023-08-25T09:18:43.589Z",
  //     id: "6ab86126cfe87d230176c3e7",
  //   },
  //   {
  //     title: "Inventario Bajo",
  //     rawBody: [
  //       {
  //         productName: "Camiseta Negra Talla M",
  //         productCode: "PRODUCTO-3",
  //         itemName: "Camiseta Negra Talla M",
  //         itemCode: "EXISTS-3",
  //         itemId: "782eb4609e42a18f5cc1aecd",
  //         productId: "78304c7d5efabbe0ee62ff1d",
  //         threshold: 2,
  //       },
  //     ],
  //     type: "lowStock",
  //     user: {
  //       _id: "6479b27df0c732726d2fd784",
  //       name: "Sistema",
  //       email: "sistema@gmail.com",
  //       picture: "",
  //       restricted: false,
  //     },
  //     fromWorkspace: {
  //       _id: "64a592b44a210b64789a68b0",
  //       name: "Bodega Móvil",
  //       description: "2",
  //       deleted: false,
  //       picture:
  //         "https://drive.google.com/uc?export=view&id=1bBmNAaAf4vtPSm8TVyYQUaj6LwDhPohp",
  //       collectionFolderId: "1W-t1FvP6Mu9lXsYmltouYKyIC7lAJQ-z",
  //       createdAt: "2023-07-05T15:56:36.483Z",
  //       updatedAt: "2023-08-24T19:06:14.620Z",
  //       __v: 0,
  //       fileId: "1bBmNAaAf4vtPSm8TVyYQUaj6LwDhPohp",
  //     },
  //     userDetails: "",
  //     date: "2023-08-26T15:30:10.918Z",
  //     status: false,
  //     deleted: false,
  //     createdAt: "2023-08-26T15:30:11.750Z",
  //     updatedAt: "2023-08-26T15:30:11.750Z",
  //     id: "78304c7d5efabbe0ee62ff1c",
  //   },
  //   {
  //     title: "Inventario Bajo",
  //     rawBody: [
  //       {
  //         productName: "Lápiz Mecánico HB",
  //         productCode: "PRODUCTO-2",
  //         itemName: "Lápiz Mecánico HB",
  //         itemCode: "EXISTS-2",
  //         itemId: "6ab84c72e9f74f87a5a3b2f1",
  //         productId: "6ab98416cfe87d230176c3e8",
  //         threshold: 5,
  //       },
  //     ],
  //     type: "lowStock",
  //     user: {
  //       _id: "6479b27df0c732726d2fd784",
  //       name: "Sistema",
  //       email: "sistema@gmail.com",
  //       picture: "",
  //       restricted: false,
  //     },
  //     fromWorkspace: {
  //       _id: "64a592b44a210b64789a68b0",
  //       name: "Bodega Móvil",
  //       description: "2",
  //       deleted: false,
  //       picture:
  //         "https://drive.google.com/uc?export=view&id=1bBmNAaAf4vtPSm8TVyYQUaj6LwDhPohp",
  //       collectionFolderId: "1W-t1FvP6Mu9lXsYmltouYKyIC7lAJQ-z",
  //       createdAt: "2023-07-05T15:56:36.483Z",
  //       updatedAt: "2023-08-24T19:06:14.620Z",
  //       __v: 0,
  //       fileId: "1bBmNAaAf4vtPSm8TVyYQUaj6LwDhPohp",
  //     },
  //     userDetails: "",
  //     date: "2023-08-25T09:18:42.731Z",
  //     status: false,
  //     deleted: false,
  //     createdAt: "2023-08-25T09:18:43.589Z",
  //     updatedAt: "2023-08-25T09:18:43.589Z",
  //     id: "6ab86126cfe87d230176c3e7",
  //   },
  // ];

  const data = [
    {
      item: {
        notifications: {
          expirationAlert: false,
          lowStockAlert: true,
        },
        _id: "64ebf7855dc923570c19ac42",
        name: "Brackets Blancos",
        code: "EXISTS-1",
        product: {
          _id: "64ebe2382da44d6cf7824323",
          name: "Brackets Transparentes",
          code: "PROD-1",
          deleted: false,
          description: "",
          picture:
            "https://drive.google.com/uc?export=view&id=1ur4henu2KJrlimXbUg_GxQHs7G5R1ueE",
          fileId: "1ur4henu2KJrlimXbUg_GxQHs7G5R1ueE",
          collectionFolderId: "1PWj3rye1iX3QwOaPUF4_CayqvPkn75GQ",
          category: "64e3237a1d251ba6249f662a",
          provider: "64cb2268818866053b6be54b",
          unit: "64e871d15c78ba504e5a9ef9",
          tags: [],
          createdAt: "2023-08-27T23:54:32.522Z",
          updatedAt: "2023-08-27T23:54:44.861Z",
          __v: 0,
        },
        variant: null,
        variantValue: "",
        details: "",
        expirationDate: "",
        costPrice: 5000,
        costCurrency: "CRC",
        salePrice: 0,
        saleCurrency: "CRC",
        thresholds: [
          {
            workspace: "64a448df67469b11b0cd88b3",
            value: 0,
            _id: "64ebf7855dc923570c19ac43",
          },
          {
            workspace: "64add3b9fa193c843fe68a31",
            value: 0,
            _id: "64ebf7855dc923570c19ac44",
          },
          {
            workspace: "64eaa5d881bc56540fd84a54",
            value: 0,
            _id: "64ebf7855dc923570c19ac45",
          },
        ],
        daysBeforeExpiration: 0,
        createdAt: "2023-08-28T01:25:25.772Z",
        updatedAt: "2023-08-28T01:25:25.772Z",
        __v: 0,
      },
      workspace: {
        _id: "64add3b9fa193c843fe68a31",
        name: "Consultorio 1",
        description: "1",
        deleted: false,
        picture: "",
        collectionFolderId: "1IBWabFFpVBqakJrbQ5Ge_VeVYbvGk7Tl",
        createdAt: "2023-07-11T22:12:09.624Z",
        updatedAt: "2023-08-25T08:30:31.572Z",
        __v: 0,
        fileId: "",
      },
      quantity: 10,
      id: "64ebf79b5dc923570c19ac4e",
    },
    {
      item: {
        notifications: {
          expirationAlert: true,
          lowStockAlert: true,
        },
        _id: "64ebf7c55dc923570c19ac53",
        name: "Enjuague Bucal FreshMint",
        code: "EXISTS-3",
        product: {
          _id: "64ebe2382da44d6cf7824325",
          name: "Enjuagues Bucal",
          code: "PROD-3",
          deleted: false,
          description:
            "Enjuague bucal con sabor a menta fresca para una sensación limpia.",
          picture: "https://drive.google.com/uc?export=view&id=2abcde56789",
          fileId: "2abcde56789",
          collectionFolderId: "1PWj3rye1iX3QwOaPUF4_CayqvPkn75GQ",
          category: "64e3237a1d251ba6249f662c",
          provider: "64cb2268818866053b6be54d",
          unit: "64e871d15c78ba504e5a9efb",
          tags: ["enjuague", "higiene bucal"],
          createdAt: "2023-08-28T15:30:00.000Z",
          updatedAt: "2023-08-28T15:30:00.000Z",
          __v: 0,
        },
        variant: null,
        variantValue: "",
        details: "",
        expirationDate: "2023-12-15",
        costPrice: 1200,
        costCurrency: "CRC",
        salePrice: 1800,
        saleCurrency: "CRC",
        thresholds: [
          {
            workspace: "64add3b9fa193c843fe68a31",
            value: 8,
            _id: "64ebf7c55dc923570c19ac54",
          },
        ],
        daysBeforeExpiration: 30,
        createdAt: "2023-08-28T15:45:00.000Z",
        updatedAt: "2023-08-28T15:45:00.000Z",
        __v: 0,
      },
      workspace: {
        _id: "64eaa5d881bc56540fd84a54",
        name: "Consultorio Dental Sonrisas",
        description: "Especialistas en cuidado dental integral.",
        deleted: false,
        picture: "",
        collectionFolderId: "3IBWabFFpVBqakJrbQ5Ge_VeVYbvGk7Tl",
        createdAt: "2023-07-20T10:00:00.000Z",
        updatedAt: "2023-08-25T08:30:31.572Z",
        __v: 0,
        fileId: "",
      },
      quantity: 15,
      id: "64ebf7d05dc923570c19ac55",
    },
    {
      item: {
        notifications: {
          expirationAlert: false,
          lowStockAlert: true,
        },
        _id: "64ebf7e55dc923570c19ac56",
        name: "Hilo Dental Suave",
        code: "EXISTS-4",
        product: {
          _id: "64ebe2382da44d6cf7824326",
          name: "Hilo Dental",
          code: "PROD-4",
          deleted: false,
          description:
            "Hilo dental suave para una limpieza eficaz entre los dientes.",
          picture: "https://drive.google.com/uc?export=view&id=3abcde98765",
          fileId: "3abcde98765",
          collectionFolderId: "1PWj3rye1iX3QwOaPUF4_CayqvPkn75GQ",
          category: "64e3237a1d251ba6249f662d",
          provider: "64cb2268818866053b6be54e",
          unit: "64e871d15c78ba504e5a9efc",
          tags: ["hilo dental", "limpieza interdental"],
          createdAt: "2023-08-28T16:30:00.000Z",
          updatedAt: "2023-08-28T16:30:00.000Z",
          __v: 0,
        },
        variant: null,
        variantValue: "",
        details: "",
        expirationDate: "",
        costPrice: 350,
        costCurrency: "CRC",
        salePrice: 500,
        saleCurrency: "CRC",
        thresholds: [
          {
            workspace: "64a448df67469b11b0cd88b3",
            value: 3,
            _id: "64ebf7e55dc923570c19ac57",
          },
          {
            workspace: "64eaa5d881bc56540fd84a54",
            value: 5,
            _id: "64ebf7e55dc923570c19ac58",
          },
        ],
        daysBeforeExpiration: 0,
        createdAt: "2023-08-28T16:45:00.000Z",
        updatedAt: "2023-08-28T16:45:00.000Z",
        __v: 0,
      },
      workspace: {
        _id: "64a448df67469b11b0cd88b3",
        name: "Clínica Dental Sonrisa Radiante",
        description:
          "Ofrecemos servicios dentales completos para toda la familia.",
        deleted: false,
        picture: "",
        collectionFolderId: "4IBWabFFpVBqakJrbQ5Ge_VeVYbvGk7Tl",
        createdAt: "2023-07-15T18:30:00.000Z",
        updatedAt: "2023-08-25T08:30:31.572Z",
        __v: 0,
        fileId: "",
      },
      quantity: 8,
      id: "64ebf7f05dc923570c19ac59",
    },
  ];

  return (
    <>
      {/* <ProductInventory /> */}

      {/* <Box
        sx={{
          display: "flex",
          bgcolor: "#EEF2F6",
          padding: 2.5,
          // height: "100vh",
          flexGrow: 1,
        }}
      >
        <Dashboard data={userData} />
      </Box> */}

      {/* <h1>Generar reporte</h1>
        <PDFReport data={jsonData} /> */}
      <Box>
        <BlobProvider document={HandleTable("extraction", data)}>
          {({ blob, url, loading, error }) => (
            <Box>
              <Button variant="contained" disabled={loading}>
                {loading ? "Generando PDF..." : "Descargar reporte"}
              </Button>
              {url && <iframe src={url} width="100%" height="720px" />}
            </Box>
          )}
        </BlobProvider>
      </Box>
    </>
  );
}

export default App;
