import { View, Button, Text, StyleSheet } from "react-native";
import React from "react";
import { AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";

const HomeScreen = () => {
  // writeFile(filepath: string, contents: string, encoding?: string)
  async function storeArrayForMe(data, fileName) {
    //console.log('HI THERE!!');
    try {
      await AsyncStorage.setItem(fileName, JSON.stringify(data));
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  async function getArrayForMe(fileName) {
    //console.log('HI THERE!!');
    try {
      const myArray = await AsyncStorage.getItem(fileName);
      if (myArray !== null) {
        console.log(JSON.parse(myArray));
        // Use the data here -->
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          console.log(FileSystem.documentDirectory);
        }}
      >
        <Text>Console document Directory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          console.log(FileSystem.cacheDirectory);
        }}
      >
        <Text>Console cache Directory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={async () => {
          const dat = await FileSystem.writeAsStringAsync(
            `${FileSystem.documentDirectory}1.txt`,
            JSON.stringify(["hello", { name: "Aniket", class: "COE3" }])
          );
          console.log(dat);
        }}
      >
        <Text>Save File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={async () => {
          let dat = await FileSystem.readAsStringAsync(
            `${FileSystem.documentDirectory}1.txt`
          );
          console.log(typeof dat);
          dat = JSON.parse(dat);
          console.log(typeof dat);
          console.log(dat[1].name);
        }}
      >
        <Text>View File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          storeArrayForMe(["one", "two", "Three"], "@MySuperStore:key");
        }}
      >
        <Text>This is a button</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          getArrayForMe("@MySuperStore:key");
        }}
      >
        <Text>Hi this is me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 3,
    borderColor: "blue"
  }
});

export default HomeScreen;

// var a = OwNet.get( 'core/config/test.json', function( Res ) {

//     // Res is the response from an AJAX request (where i requested the test.json file)

//      if( Res !== "" && Res !== undefined && Res !== null ) {

//        // Here i tried to replace the line breaks, carriage returns and spaces. It failed.
//        // (I also tried to remove it)
//        Res.replace( /\r\n|\r|\n|\s*/gm, "" );

//        // Here i tried to transform Res in an object
//        tmp = JSON.stringify( Res );
//        return JSON.parse( tmp ); // This returns a string instead an object

//      } else return null;

//    });
