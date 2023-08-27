import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

const JSONs = {
  extraction: {
    headers: [
      "Nombre del Producto",
      "Nombre de la Existencia",
      "Código del Producto",
      "Código del la Existencia",
      "ID de la Existencia",
      "ID del Producto",
      "Cantidad Inicial",
      "Cantidad Modificada",
      "Cantidad Final",
    ],
    columns: [
      "productName",
      "itemName",
      "productCode",
      "itemCode",
      "itemId",
      "productId",
      "initialQuantity",
      "modifiedQuantity",
      "finalQuantity",
    ],
  },
  lowStock: {
    headers: [
      "Nombre del Producto",
      "Código del Producto",
      "Nombre del Ítem",
      "Código del Ítem",
      "ID del Ítem",
      "ID del Producto",
      "Umbral",
    ],
    columns: [
      "productName",
      "productCode",
      "itemName",
      "itemCode",
      "itemId",
      "productId",
      "threshold",
    ],
  },
  transfer: {
    headers: [
      "Nombre del Producto",
      "Nombre del Ítem",
      "Código del Producto",
      "Código del Ítem",
      "ID del Ítem",
      "ID del Producto",
      "Cantidad Modificada",
      "Cantidad Inicial (Desde Workspace)",
      "Cantidad Final (Desde Workspace)",
      "Cantidad Inicial (Hacia Workspace)",
      "Cantidad Final (Hacia Workspace)",
    ],
    columns: [
      "productName",
      "itemName",
      "productCode",
      "itemCode",
      "itemId",
      "productId",
      "modifiedQuantity",
      "fromWorkspaceInitialQuantity",
      "fromWorkspaceFinalQuantity",
      "toWorkspaceInitialQuantity",
      "toWorkspaceFinalQuantity",
    ],
  },
  restock: {
    headers: [
      "Nombre del Producto",
      "Nombre del Ítem",
      "Código del Producto",
      "Código del Ítem",
      "ID del Ítem",
      "ID del Producto",
      "Cantidad Inicial",
      "Cantidad Modificada",
      "Cantidad Final",
    ],
    columns: [
      "productName",
      "itemName",
      "productCode",
      "itemCode",
      "itemId",
      "productId",
      "initialQuantity",
      "modifiedQuantity",
      "finalQuantity",
    ],
  },
  expiration: {
    headers: [
      "Nombre del Producto",
      "Código del Producto",
      "Nombre del Ítem",
      "Código del Ítem",
      "ID del Ítem",
      "ID del Producto",
      "Fecha de Vencimiento",
    ],
    columns: [
      "productName",
      "productCode",
      "itemName",
      "ItemCode",
      "ItemId",
      "productId",
      "expirationDate",
    ],
  },
};

const Table = ({ target, data }) => {
  const { headers, columns } = target;

  const styles = StyleSheet.create({
    main: {
      height: 256,
      width: "100%",
      padding: "16 8",
      border: "1px solid #B2BEC3",
      borderRadius: 4,
      gap: 8,
    },
    header: {
      fontFamily: "Helvetica-Bold",
    },
    row: {
      margin: "auto",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 8,
    },
    rowWithBorder: {
      borderBottom: "1px solid #DFE6E9",
    },
  });

  const Row = ({ name, value, isLast }) => (
    <View style={[styles.row, isLast ? null : styles.rowWithBorder]}>
      <View style={styles.header}>
        <Text>{name}</Text>
      </View>
      <View>
        <Text>{value}</Text>
      </View>
    </View>
  );

  const getRows = (data) => {
    return headers.map((name, index) => (
      <Row
        key={name}
        name={name}
        value={data[columns[index]]}
        isLast={index === headers.length - 1}
      />
    ));
  };

  return (
    <View style={styles.main} wrap={false}>
      {getRows(data)}
    </View>
  );
};

const FormatDate = (type, data) => {
  const withTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };
  const withoutTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };
  const formatter =
    type === "expiration"
      ? (date) => withoutTime(date)
      : (date) => withTime(date);

  return data.map((obj) => ({ ...obj, date: formatter(obj.date) }));
};

const HandleNotification = (type, data, filters) => {
  const currentJSON = JSONs[type];
  if (!currentJSON) {
    console.error("Tipo de JSON Inválido.");
    return;
  }

  const formattedData = FormatDate(type, data);

  const styles = StyleSheet.create({
    page: {
      // backgroundColor: "#f4f4fc",
      alignItems: "center",
      padding: 24,
      gap: 0,
      width: "100vw",
      fontFamily: "Helvetica",
      fontSize: 10,
      textAlign: "justify",
      color: "#474747",
    },
  });

  let headerTitle;
  switch (type) {
    case "extraction":
      headerTitle = "SALIDA DE INVENTARIO";
      break;
    case "lowStock":
      headerTitle = "INVENTARIO BAJO";
      break;
    case "transfer":
      headerTitle = "TRANSFERENCIA DE INVENTARIO";
      break;
    case "restock":
      headerTitle = "INGRESO DE INVENTARIO";
      break;
    case "expiration":
      headerTitle = "EXISTENCIAS VENCIDAS";
      break;
    default:
      headerTitle = "";
  }

  const header = (
    <View id="header" style={{ display: "flex", alignSelf: "stretch", gap: 8 }}>
      <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold" }}>
        NOTIFICACIONES DE {headerTitle}
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold" }}>
          FECHA:
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Helvetica-Bold",
            color: "#335C30",
          }}
        >
          {dayjs().format("MM/DD/YYYY")}
        </Text>
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Filtros aplicados:</Text>
        <Text>{filters}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4">
        <View style={styles.page}>
          {header}
          <View style={{ gap: 48, width: "100%" }}>
            {formattedData.map((data, index) => (
              <Notification key={index} current={currentJSON} data={data} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const Notification = ({ current, data }) => {
  const { type, date, user, title } = data;
  let titleType;
  if (type === "expiration") {
    titleType = `${user.name}: ${title}`;
  } else if (type === "lowStock") {
    titleType = `${user.name}: ${title}`;
  } else if (type === "restock") {
    titleType = `${user.name}: realizó un ${title}`;
  } else titleType = `${user.name}: realizó una ${title}`;

  const styles = StyleSheet.create({
    body: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFF",
      border: "1px solid #B2BEC3",
      borderRadius: 4,
      margin: 8,
    },
    info: {
      padding: "24 16",
      flex: 0.6,
    },
    comments: {
      padding: "24 16",
      flex: 0.4,
      borderLeft: "1px solid #B2BEC3",
    },
  });

  const NotifHeader = () => (
    <View style={{ padding: 16, gap: 4, backgroundColor: "#f4f4fc" }}>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12 }}>
        {titleType}
      </Text>
      <Text style={{ color: "#636E72", fontSize: 10 }}>{date}</Text>
      {type === "transfer" ? (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>de {data.fromWorkspace.name} a </Text>
          <Text>{data.toWorkspace.name}</Text>
        </View>
      ) : (
        <Text>{data.fromWorkspace.name}</Text>
      )}
    </View>
  );

  return (
    <View
      wrap={false}
      style={{
        border: "1px solid #B2BEC3",
        backgroundColor: "#f4f4fc",
        marginTop: 24,
      }}
    >
      <NotifHeader />
      <View style={styles.body}>
        <View
          style={
            type === ("lowStock" || "expiration")
              ? { padding: "24 16", flex: 1 }
              : styles.info
          }
        >
          <Text style={{ fontSize: 12, marginBottom: 16 }}>
            INFORMACION DE NOTIFICACIÓN
          </Text>
          {data.rawBody.map((table, index) => (
            <Table key={index} target={current} data={table} />
          ))}
        </View>
        {type === ("lowStock" || "expiration") ? (
          <></>
        ) : (
          <View style={styles.comments}>
            <Text style={{ fontSize: 12, marginBottom: 16 }}>COMENTARIOS</Text>
            <View
              style={{ border: "1px solid #B2BEC3", padding: 8, minHeight: "40%", maxHeight: '80%' }}
            >
              <Text>{data.userDetails}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const TestARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const TestPDF = () => (
  <Document>
    <Page size="A4">
      <View style={{ gap: 24 }}>
        {TestARRAY.map((a) => (
          <Text
            style={{
              height: 196,
              width: "100%",
              backgroundColor: "red",
              border: "2px solid blue",
            }}
            wrap={false}
          >
            {a}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default HandleNotification;
