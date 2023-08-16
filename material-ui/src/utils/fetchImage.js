const fetchImage = () => {
  let imgURL =
    "https://drive.google.com/uc?id=1abcdefg";
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imgURL;

  fetch(img.src)
    .then((res) => res.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        // const base64 = getBase64StringFromDataURL(reader.result);
        // console.log(base64);
      };
      return reader.readAsDataURL(blob);
    });
};

export default fetchImage;
