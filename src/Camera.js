import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

const CameraApp = () => {
  let myCam = null;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camImg, setCamImg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        (await Camera.requestPermissionsAsync()) &&
        (await MediaLibrary.requestPermissionsAsync());
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <Camera
          useCamera2Api
          style={{ flex: 1 }}
          type={type}
          ref={ref => {
            myCam = ref;
          }}
          ratio="16:9"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                alignItems: "center",
                borderColor: "purple",
                borderWidth: 2,
                width: "100%"
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: "red",
                  borderWidth: 2,
                  flex: 1
                }}
                onPress={async () => {
                  console.log("Capture Pressed");
                  if (this.camera) console.log("Camera Available");
                  const dat = await myCam.getSupportedRatiosAsync();
                  console.log(dat);
                  const img = await myCam.takePictureAsync({ quality: 1 });
                  console.log(img);
                  setCamImg(img);
                  const asset = await MediaLibrary.createAssetAsync(img.uri);
                  console.log(asset);
                }}
              >
                <MaterialIcons name="camera" size={150} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <View style={{ flex: 1, borderColor: "red", borderWidth: 2 }}>
        {camImg ? (
          <Image
            source={{ uri: camImg.uri }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        ) : (
          <Text>No Image Taken</Text>
        )}
      </View>
    </>
  );
};
export default CameraApp;
