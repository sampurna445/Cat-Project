import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { ApiHelper } from "../../helpers";
import { kApiCatImages, kApiUploadImage } from "../../config/WebService";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "../../utils";
import { Listview } from "../../components";

import styles from "./styles";

const Home = () => {
  const [imageData, setImageData] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (!imageData) {
      fetchImages();
    }
  }, [imageData]);

  fetchImages = () => {
    setIsFetching(true);

    ApiHelper.get(kApiCatImages)
      .then((response) => {
        setIsFetching(false);
        setListData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(false);
      });
  };

  const onPressHandle = async () => {
    if (imageData) {
      const formData = new FormData();
      formData.append("file", {
        uri: imageData.uri,
        type: "image/jpeg",
        name: "upload.jpg",
      });

      setIsFetching(true);
      ApiHelper.imageUpload(kApiUploadImage, formData)
        .then((response) => {
          setIsFetching(false);

          showToast("Uploaded Successfully!");
          setImageData(undefined);
        })
        .catch((err) => {
          showToast("Error: " + err);

          setIsFetching(false);
        });
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageData(result.assets[0]);
      }
    }
  };

  renderUploadButton = () => {
    return (
      <TouchableOpacity style={styles.uploadBtn} onPress={onPressHandle}>
        {imageData !== undefined ? (
          <ImageBackground
            source={{ uri: imageData.uri }}
            style={styles.imageBackground}
          >
            <Text style={styles.text}>Upload Now!</Text>
            <Button
              title={"Reset"}
              onPress={() => {
                setImageData(undefined);
              }}
            />
          </ImageBackground>
        ) : (
          <Text style={styles.text}>Select Image to upload</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderUploadButton()}

      <Listview data={listData} />
      {isFetching && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default Home;
