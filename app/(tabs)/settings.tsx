import { View, Text, SafeAreaView, NativeModules, Platform, Alert, PermissionsAndroid } from 'react-native'
import React from 'react'
import { NordicDFU, DFUEmitter } from "react-native-nordic-dfu";
//import RNFetchBlob from "rn-fetch-blob";
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';
import RNFS from 'react-native-fs'
import CustomButton from '@/components/CustomButton';
import * as DocumentPicker from "expo-document-picker";
import ReactNativeBlobUtil from 'react-native-blob-util';
const BleManagerModule = NativeModules.BleManager;

const settings = () => {
  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
  ]);

  const startDFU = async (uri: string) => {
    console.log(uri)
    console.log(await RNFS.exists(uri))
    //await RNFS.unlink(uri)
    // let response = await ReactNativeBlobUtil.config({
    //   fileCache: true,
    //   appendExt: 'zip',
    // }).fetch('GET', uri);
    // console.log(response)
    try {
      await BleManager.createBond("F0:0A:33:69:AD:C1")
      await NordicDFU.startDFU({
        deviceAddress: "F0:0A:33:69:AD:C1",
        deviceName: "Open Scoreboard 0000",
        filePath: uri,
      })
    } catch (error) {
      console.log(error)
    }


  }

  DFUEmitter.addListener("DFUProgress", ({ percent }) => {
    console.log("DFU progress:", percent);
    //this.setState({ progress: percent });
  });
  DFUEmitter.addListener("DFUStateChanged", ({ state }) => {
    console.log("DFU state:", state);
    //this.setState({ dfuState: state });
  });

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/octet-stream", "application/zip"]

    });
    try {

      await RNFS.copyFile(result.assets[0].uri, `${RNFS.DocumentDirectoryPath}/dfu_application.zip`)

    } catch (error) {
      console.log(error)
    }
    return (result.assets[0].uri)

    if (!result.canceled) {
      if (selectType === "image") {
        // setForm({
        //   ...form,
        //   thumbnail: result.assets[0],
        // });
      }

      if (selectType === "video") {
        // setForm({
        //   ...form,
        //   video: result.assets[0],
        // });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  // FB.fetch("GET", "http://localhost:1234/app.zip").then(res => {
  //   console.log("file saved to", res.path());
  //   //this.setState({ imagefile: res.path() });
  // });

  return (
    <SafeAreaView className='bg-primary mt-6 h-full w-full items-center'>
      <View className='h-full, w-full flex-row items-start'>
        <View className="space-y-3 pb-5 flex-[40%]">
          <CustomButton
            title="+"
            handlePress={async () => {
              let result = await openPicker("file_and_folder")
              startDFU(`${RNFS.DocumentDirectoryPath}/dfu_application.zip`)
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}



export default settings