import { View, Text, SafeAreaView, NativeModules, Platform, Alert, PermissionsAndroid } from 'react-native'
import React from 'react'
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

  return (
    <SafeAreaView className='bg-primary mt-6 h-full w-full items-center'>

    </SafeAreaView>
  )
}



export default settings