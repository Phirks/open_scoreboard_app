import { Text, View, ScrollView, Image, NativeModules, NativeEventEmitter, Platform, PermissionsAndroid } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import 'react-native-url-polyfill/auto'
import base64 from 'react-native-base64'
import { images } from '../constants'
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
// import { BleManager, Device } from 'react-native-ble-plx'
// import { BLEService } from "@/services";
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SECONDS_TO_SCAN_FOR = 3;
const SERVICE_UUIDS: string[] = ["6e400002-b5a3-f393-e0a9-e50e24dcca9e"];
const ALLOW_DUPLICATES = true;

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}


import { useState } from "react";

type DeviceExtendedByUpdateTime = Device

  & { updateTimestamp: number }

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000



function convertStringToByteArray(str: String) {
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes
}



export default function App() {
  //const { isLoading, isConnected, BLEService2, connectedDevice, setConnectedDevice, setRightScore, setLeftScore } = useGlobalContext();
  const { isLoading, isConnected, setRightScore, setLeftScore, isScanning, setIsScanning, peripherals, setPeripherals } = useGlobalContext();
  if (!isLoading && isConnected) return <Redirect href="/scoreboard" />





  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    setPeripherals(map => {
      return new Map(map.set(peripheral.id, peripheral));
    });
  };


  const handleAndroidPermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (result) {
          console.debug(
            '[handleAndroidPermissions] User accepts runtime permissions android 12+',
          );
        } else {
          console.error(
            '[handleAndroidPermissions] User refuses runtime permissions android 12+',
          );
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(checkResult => {
        if (checkResult) {
          console.debug(
            '[handleAndroidPermissions] runtime permission Android <12 already OK',
          );
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult) {
              console.debug(
                '[handleAndroidPermissions] User accepts runtime permission android <12',
              );
            } else {
              console.error(
                '[handleAndroidPermissions] User refuses runtime permission android <12',
              );
            }
          });
        }
      });
    }
  };

  const startScan = () => {

    if (!isScanning) {
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
        // reset found peripherals before scan
        setPeripherals(new Map<Peripheral['id'], Peripheral>());

      try {
        console.debug('[startScan] starting scan...');
        setIsScanning(true);
        BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
          .then(() => {
            console.debug('[startScan] scan promise returned successfully.');
            setIsScanning(false)
          })
          .catch((err: any) => {
            setIsScanning(false)
            console.error('[startScan] ble scan returned in error', err);
          });
      } catch (error) {
        console.error('[startScan] ble scan error thrown', error);
        setIsScanning(false)
      }
    } else {
      setIsScanning(false)
      console.log(JSON.stringify(peripherals, null, 4))
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  // const listeners = [
  //   bleManagerEmitter.addListener(
  //     'BleManagerDiscoverPeripheral',
  //     handleDiscoverPeripheral,
  //   ),
  //   bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
  //   bleManagerEmitter.addListener(
  //     'BleManagerDisconnectPeripheral',
  //     handleDisconnectedPeripheral,
  //   ),
  //   bleManagerEmitter.addListener(
  //     'BleManagerDidUpdateValueForCharacteristic',
  //     handleUpdateValueForCharacteristic,
  //   ),
  //   bleManagerEmitter.addListener(
  //     'BleManagerConnectPeripheral',
  //     handleConnectPeripheral,
  //   ),
  // ];


  // BLEService2.initializeBLE()
  const onScanFoundDevice = async (device: Device) => {
    if (device.name === 'Nordic_UART_Service') {
      // BLEService2.manager.stopDeviceScan

      console.log(device.name)
      try {
        //   await device.connect()
        //   await device.discoverAllServicesAndCharacteristics();
        //   BLEService2.manager.monitorCharacteristicForDevice(device.id, "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400003-b5a3-f393-e0a9-e50e24dcca9e", (error, characteristic) => {
        //     if (error) { console.log(error) }
        //     let data = convertStringToByteArray(base64.decode(characteristic.value))
        //     switch (data[0]) {
        //       case 0:
        //         setRightScore(data[1])
        //         break;
        //       case 1:
        //         setLeftScore(data[1])
        //         break;
        //       default:
        //         break;
        //     }
        //   })
        //   await setConnectedDevice(device)
      } catch (error) {
        console.log(error)
      }


      router.push("/scoreboard")
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}
              <Text className='text-orange-400'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless  exploration with Aora</Text>
          <CustomButton
            title="Connect To Device"
            handlePress={async () => {
              //setFoundDevices([])
              // BLEService.initializeBLE().then(() => BLEService.scanDevices(onScanFoundDevice, null, false))
              //await handleAndroidPermissions()
              startScan()
              // if (connectedDevice === null) {
              //   //BLEService2.scanDevices(onScanFoundDevice, null, false)
              // }
              // else {
              //   router.push("/scoreboard")
              // }
            }}
            containerStyles="w-full mt-7" textStyles={undefined} isLoading={undefined}            >
          </CustomButton>
        </View>


      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}


