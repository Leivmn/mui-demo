import axios from "axios";

const getReport = async () => {
  const url =
    "https://drive.google.com/uc?id=1wyfRuedLaAqSYN7XbShq5pImulxCsb7a";
  try {
    const response = await axios.get(url, { responseType: "blob" });
    const imageBlob = response.data;
    const imagePath = URL.createObjectURL(imageBlob);
    return imagePath;
  } catch (error) {
    console.error("Error getting report:", error);
    return null;
  }
};

export default getReport;
