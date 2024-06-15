import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { storage } from '../../firebase';

export async function pickerImage() {
  let result = ImagePicker.launchImageLibraryAsync({
    // allowsEditing: true,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
  return result;
}

export async function uploadImage(uri, path, fName) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileName = nanoid() || fName;
  const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: 'image/jpeg',
  });

  blob.close();

  const url = await getDownloadURL(snapshot.ref);
  return { url, fileName };
}
