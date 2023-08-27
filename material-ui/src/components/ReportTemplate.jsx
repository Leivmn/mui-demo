import { useState, useEffect } from "react";
import React from "react";
import ImageDownloader from "../helpers/getReport";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  BlobProvider,
  Canvas,
  Image as PdfImage,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import fetchImage from "../utils/fetchImage";

export default function PDFReport({ data }) {
  const cellWidth = 100 / 6;
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      width: 612,
      height: 792,
      padding: 24,
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#FFF",

      fontFamily: "Helvetica",
      fontSize: 10,
      textAlign: "justify",
      color: "#474747",
    },
    subtitle: {
      fontFamily: "Helvetica-Bold",
      color: "#262626",
    },
    header: {
      display: "flex",
      paddingBottom: 24,
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 8,
      alignSelf: "stretch",
      borderBottom: "2px solid #335C30",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      flex: "1 0 0",
      alignSelf: "stretch",
    },
    row: {
      display: "flex",
      height: 192,
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 16,
      alignSelf: "stretch",
      borderBottom: "1px solid #335C30",
    },
    rowDescription: {
      display: "flex",
      gap: 16,
      flexDirection: "row",

      alignItems: "center",
      alignSelf: "stretch",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 8,
      flex: "1 0 0",
      alignSelf: "stretch",
    },
    section1: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      flex: "1 0 0",
      alignSelf: "stretch",
    },
    section2: {
      display: "flex",
      flexDirection: "column",
      // justifyContent: 'center',
      alignItems: "flex-start",
      gap: 4,
      alignSelf: "stretch",
    },
    section2_Row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      alignSelf: "stretch",
    },
    section2_Column: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    table: {
      display: "flex", //flex
      //width: "100%",
      height: 64,
      flexDirection: "column",
      alignItems: "flex-start",
      flexShrink: "1 0 0",
      alignSelf: "stretch",

      //borderStyle: "solid",
      //borderWidth: 1,
      //borderColor: "#000",
      //marginBottom: 10,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      //height: 28,
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: 0,
      alignSelf: "stretch",
      // margin: "auto",
      // flexDirection: "row",
    },
    tableCell: {
      width: 96,
      //width: "16.666%",
      //borderStyle: "solid",
      //borderWidth: 1,
      //borderColor: "#000",
      margin: 4,
      //fontSize: 9,
    },
  });

  const imgLink = "https://cdn.mos.cms.futurecdn.net/39CUYMP8vJqHAYGVzUghBX.jpg"
  const testLink = "https://inventory-node-production.up.railway.app/api/drive/serveDirectImage/1g7WDmevnGhK4ol9hObKpRZ_esJTz73I6"

  const PDFTemplate = (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View id="header" style={styles.header}>
          <Text style={{ fontSize: 22, fontFamily: "Helvetica-Bold" }}>
            REPORTES DE SALIDA DE INVENTARIO
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Helvetica-Bold",
              textTransform: "uppercase",
            }}
          >
            {data[0].items[0].stocks.workspace.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
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
        <View id="body" style={styles.body}>
          {data.map((item) => (
            <View key={item.name} style={styles.row} wrap={false}>
              <View id="row_header" style={styles.rowDescription}>
                <PdfImage
                src={testLink}
                  style={{
                    backgroundColor: "#D2FFCA",
                    height: 112,
                    width: 112,
                  }}
                />
                <View id="row_info" style={styles.info}>
                  <View id="section1" style={styles.section1}>
                    <Text
                      style={{
                        color: "#33691E",
                        fontSize: 16,
                        fontFamily: "Helvetica-Bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.text}>{item.description}</Text>
                  </View>
                  <View id="section2" style={styles.section2}>
                    <View id="r1" style={styles.section2_Row}>
                      <View id="c1" style={styles.section2_Column}>
                        <Text style={styles.subtitle}>Precio de costo:</Text>
                        <Text>{item.costPrice}</Text>
                        <Text>{item.costCurrency}</Text>
                      </View>
                      <View id="c2" style={styles.section2_Column}>
                        <Text style={styles.subtitle}>Precio de venta:</Text>
                        <Text>{item.salePrice}</Text>
                        <Text>{item.saleCurrency}</Text>
                      </View>
                      <View id="c3" style={styles.section2_Column}>
                        <Text style={styles.subtitle}>Stock:</Text>
                        <Text>{item.threshold}</Text>
                      </View>
                    </View>
                    <View id="r2" style={styles.section2_Row}>
                      <View
                        id="section2_row2_c1"
                        style={styles.section2_Column}
                      >
                        <Text style={styles.subtitle}>Proveedor:</Text>
                        <Text>{item.provider.name}</Text>
                      </View>
                      <View
                        id="section2_row2_c2"
                        style={styles.section2_Column}
                      >
                        <Text style={styles.subtitle}>Unidad de medida:</Text>
                        <Text>{item.unit.name}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View id="row_body" style={styles.table}>
                <View
                  id="table_header"
                  style={[
                    styles.tableRow,
                    { color: "#262626", fontFamily: "Helvetica-Bold" },
                  ]}
                >
                  <View style={styles.tableCell}>
                    <Text>Nombre: </Text>
                  </View>
                  <View style={[styles.tableCell, { width: 48 }]}>
                    <Text>Variante: </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>ValorVariante: </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Detalle: </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>FechaExpiracion: </Text>
                  </View>
                  <View style={[styles.tableCell, { width: 48 }]}>
                    <Text>Cantidad: </Text>
                  </View>
                </View>
                <View id="table_body" style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>{item.items[0].name} </Text>
                  </View>
                  <View style={[styles.tableCell, { width: 48 }]}>
                    <Text>{item.items[0].variant} </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.items[0].variantValue} </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.items[0].details} </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.items[0].expirationDate} </Text>
                  </View>
                  <View style={[styles.tableCell, { width: 48 }]}>
                    <Text>{item.items[0].quantity} </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    //#region PREVIEW SECTION
    <>
      <BlobProvider document={PDFTemplate}>
        {({ blob, url, loading, error }) => (
          <Box>
            <Button variant="contained" disabled={loading}>
              {loading ? "Generando PDF..." : "Descargar reporte"}
            </Button>
            {url && <iframe src={url} width="100%" height="768px" />}
          </Box>
        )}
      </BlobProvider>
    </>

    //#endregion

    //#region DOWNLOAD SECTION

    // <Box>
    //   <PDFDownloadLink document={PDFTemplate} fileName="testing.pdf">
    //     {({ blob, url, loading, error }) => (
    //       <Button variant="contained">
    //         {loading ? "Generando PDF..." : "Descargar reporte"}
    //       </Button>
    //     )}
    //   </PDFDownloadLink>
    // </Box>

    //#endregion
  );
}
