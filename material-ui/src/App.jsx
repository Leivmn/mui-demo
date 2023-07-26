import ProductInventory from "./pages/ProductInventory";
import PDFReport from "./components/ReportTemplate";
import getReport from "./helpers/getReport";
import Home from "./pages/Home";

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
    name: "Pedro",
    itemsAdded: 65,
    itemsRemoved: 67,
    incomeProducts: [
      { id: 1, name: "Cepillo dental", quantity: 12, date: "3/26/2023" },
      { id: 3, name: "Hilo dental", quantity: 23, date: "4/27/2023" },
      { id: 5, name: "Pasta de dientes", quantity: 30, date: "7/28/2023" },
    ],
    outcomeProducts: [
      { id: 2, name: "Cepillo dental", quantity: 7, date: "2/22/2023" },
      { id: 4, name: "Hilo dental", quantity: 20, date: "5/24/2023" },
      { id: 6, name: "Pasta de dientes", quantity: 40, date: "6/25/2023" },
    ],
  };

  return (
    <>
      {/* <ProductInventory /> */}
      <Home user={userData} />
      {/* <h1>Generar reporte</h1> */}
      {/* <button onClick={console.log(getReport())}>Testing</button> */}
      {/* <PDFReport data={jsonData} /> */}
    </>
  );
}

export default App;
