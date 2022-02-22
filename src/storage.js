import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getFile = async filename => {
  // Create a reference to the file we want to download
  const storage = getStorage();
  const starsRef = ref(storage, "dokumenta/ucenici/doc.pdf");

  let theUrl = null;
  // Get the download URL
  await getDownloadURL(starsRef)
    .then(url => {
      theUrl = url;
    })
    .catch(error => {
      switch (error.code) {
        //TODO: handle storage errors
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });

  return theUrl;
};
