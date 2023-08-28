import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

const JSONs = {
  extraction: {
    headers: [
      "Bodega",
      "Producto Base",
      "Nombre la Existencia",
      "Stock Actual",
    ],
    columns: [
      ["workspace", "name"],
      ["item", "product", "name"],
      ["item", "name"],
      ["quantity"],
    ],
  },
};

const GetValues = (columns, data) => {
  let currentData = data;

  for (let i = 0; i < columns.length; i++) {
    const prop = columns[i];

    if (currentData.hasOwnProperty(prop)) {
      currentData = currentData[prop];

      if (i === columns.length - 1) {
        return currentData;
      }
    } else {
      return undefined;
    }
  }

  return undefined;
};

const HandleTable = (type, data) => {
  const currentJSON = JSONs[type];
  if (!currentJSON) {
    console.error("Tipo de JSON Inválido.");
    return;
  }

  const cellWidth = 100 / currentJSON.columns.length;

  const styles = StyleSheet.create({
    page: {
      alignItems: "center",
      padding: 24,
      gap: 0,
      width: "100vw",
      fontFamily: "Helvetica",
      fontSize: 10,
      textAlign: "justify",
      color: "#474747",
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: 0,
      alignSelf: "stretch",
    },
    header: {
      width: `${cellWidth}%`,
      padding: "16 8",
      fontSize: 8,
      textAlign: "left",
      backgroundColor: "#F8F9FA",
      color: "#2F3746",
      fontFamily: "Helvetica-Bold",
    },
  });

  const header = (
    <View id="header" style={{ display: "flex", alignSelf: "stretch", gap: 8 }}>
      <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold" }}>
        TABLA DEFAULT
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
    </View>
  );

  console.log(currentJSON.columns.map((c) => GetValues(c, data[0])));

  const dataRow = (data) => currentJSON.columns.map((c) => GetValues(c, data));

  return (
    <Document>
      <Page size="A4">
        <View style={styles.page}>
          {header}
          <View style={{ gap: 16, width: "100%", marginTop: 24, border: "1px solid #DFE6E9" }}>
            <View style={styles.tableRow}>
              {currentJSON.headers.map((h) => (
                <View key={h} style={styles.header}>
                  <Text>{h.toUpperCase()}</Text>
                </View>
              ))}
            </View>
            {data.map((row, index) => (
              <Row
                key={index}
                width={cellWidth}
                data={dataRow(row)}
                isLast={index === data.length - 1}
              />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const Row = ({ width, data, isLast }) => {
  const styles = {
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: 0,
      alignSelf: "stretch",
    },
    rowWithBorder: {
      borderBottom: "1px solid #DFE6E9",
    },
  };

  return (
    <View style={[styles.row, isLast ? null : styles.rowWithBorder]}>
      {data.map((v) => (
        <Cell key={v} width={`${width}%`} value={v} />
      ))}
    </View>
  );
};

const Cell = ({ width, value }) => (
  <View
    style={{
      width: width,
      padding: 5,
    }}
  >
    <Text>{value}</Text>
  </View>
);

export default HandleTable;
