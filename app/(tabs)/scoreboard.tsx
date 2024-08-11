import { View, Text, SafeAreaView, NativeModules, NativeEventEmitter, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton"
// import { BleManager, Device } from 'react-native-ble-plx'
import { useState } from "react";
import base64 from 'react-native-base64'
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const BleManagerModule = NativeModules.BleManager;

const Buffer = require("buffer").Buffer;
const charactaristicRX = (error, characteristic) => {
  console.log(characteristic)
}
const Scoreboard = () => {
  const { rightScore, leftScore, setRightScore, setLeftScore, peripherals, expectedLeftScore, setExpectedLeftScore, expectedRightScore, setExpectedRightScore } = useGlobalContext();


  return (
    <SafeAreaView className='bg-primary h-full w-full items-center'>
      <View className='h-full, w-full flex-row items-start mt-5'>
        <CustomButton
          title="Reset scores (Longpress)"
          handleLongPress={() => {
            setRightScore(0)
            setLeftScore(0)
            BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x04])
          }}
          containerStyles='mt-7 mx-4 bg-white flex-[90%]'
          textStyles={'text-3xl'}
        />
      </View>

      <View className='h-[50%] w-full flex-row items-end'>
        <View className="space-y-3 pb-5 flex-[40%]">
          <CustomButton
            title="+"
            handlePress={() => {
              BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x00])
              if (leftScore < 199) { setLeftScore(leftScore + 1) }
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />
          <Text className='text-gray-100 text-9xl text-center pt-7'>
            {leftScore < 10 ? '0' : ''}{leftScore}
          </Text>

          <CustomButton
            title="-"
            handlePress={() => {
              BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x01])
              if (leftScore > 0) { setLeftScore(leftScore - 1) }
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />
        </View>
        <View className="space-y-3 pb-5 flex-[40%]">
          <CustomButton
            title="+"
            handlePress={() => {
              BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x02])
              if (rightScore < 199) { setRightScore(rightScore + 1) }
            }}
            containerStyles='mt-7 mx-4 bg-blue-500'
            textStyles={'text-3xl'}
          />
          <Text className='text-gray-100 text-9xl text-center pt-7'>
            {rightScore < 10 ? '0' : ''}{rightScore}
          </Text>
          <CustomButton
            title="-"
            handlePress={() => {
              BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x03])
              if (rightScore > 0) {
                setRightScore(rightScore - 1)
              }
            }}
            containerStyles='mt-7 mx-4 bg-blue-500'
            textStyles={'text-3xl'}
          />
        </View>
      </View>
      <View className='w-[100%] h-[5%] mb-10 flex-1'>
        <LinearGradient className='flex-1 items-center' colors={['white', 'transparent']} end={[]} />
      </View>
      {/* <MaskedView className='h-[10%] w-10 flex-1 items-center justify-center bg-white'
        maskElement={
          <LinearGradient className='flex-1 h-[100%] w-[100%]  items-center' colors={['white', 'transparent']} />
        }
      >
        <CustomButton
          title="-"
          handlePress={() => {
            console.log(JSON.stringify(peripherals, null, 4))
          }}
          containerStyles='mt-7 mx-4 bg-blue-500 w-10 h-[20%]'
          textStyles={'text-3xl'}
        />
      </MaskedView> */}


    </SafeAreaView>
  )
}

export default Scoreboard