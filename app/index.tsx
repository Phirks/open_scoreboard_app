import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import 'react-native-url-polyfill/auto'

import { images } from '../constants'
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { signOut } from "@/lib/appwrite";
import { BleManager, Device } from 'react-native-ble-plx'
//import { BLEService } from "@/services";
import { useState } from "react";

type DeviceExtendedByUpdateTime = Device

  & { updateTimestamp: number }

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000


export default function App() {
  //const [foundDevices, setFoundDevices] = useState<DeviceExtendedByUpdateTime[]>([])
  const { isLoading, isConnected, BLEService2, connectedDevice, setConnectedDevice } = useGlobalContext();
  if (!isLoading && isConnected) return <Redirect href="/scoreboard" />
  BLEService2.initializeBLE()
  const onScanFoundDevice = async (device: Device) => {
    if (device.name === 'Nordic_UART_Service') {
      BLEService2.manager.stopDeviceScan
      
      console.log(device.name)
      await device.connect()
      console.log("connected")
      await device.discoverAllServicesAndCharacteristics()
      console.log("discovered")
      await setConnectedDevice(device)
      console.log("contexted")
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
            handlePress={() => {
              //setFoundDevices([])
              // BLEService.initializeBLE().then(() => BLEService.scanDevices(onScanFoundDevice, null, false))
              if(connectedDevice===null){
              BLEService2.scanDevices(onScanFoundDevice, null, false)
              }
              else{
                router.push("/scoreboard")
              }
            }}
            containerStyles="w-full mt-7" textStyles={undefined} isLoading={undefined}            >
          </CustomButton>
        </View>


      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
