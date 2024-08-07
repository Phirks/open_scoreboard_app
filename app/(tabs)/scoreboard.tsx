import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton"
import { BleManager, Device } from 'react-native-ble-plx'
import { useState } from "react";
import base64 from 'react-native-base64'

const Buffer = require("buffer").Buffer;
const charactaristicRX = (error, characteristic) => {
  console.log(characteristic)
}
const Scoreboard = () => {
  const { BLEService2, connectedDevice, rightScore, leftScore, setRightScore, setLeftScore } = useGlobalContext();





  return (
    <SafeAreaView className='bg-primary mt-6 h-full w-full items-center'>
      <View className='h-full, w-full flex-row items-start'>
        <CustomButton
          title="Reset scores (Longpress)"
          handleLongPress={() => {
            setRightScore(0)
            setLeftScore(0)
            connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "BA==")
          }}
          containerStyles='mt-7 mx-4 bg-white flex-[90%]'
          textStyles={'text-3xl'}
        />
      </View>

      <View className='h-full w-full flex-row items-start'>
        <View className="space-y-3 pb-5 flex-[40%]">
          <CustomButton
            title="+"
            handlePress={() => {
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "AA==")
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
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "AQ==")
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />
        </View>
        <View className="space-y-3 pb-5 flex-[40%]">
          <CustomButton
            title="+"
            handlePress={() => {
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Ag==")
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
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Aw==")
            }}
            containerStyles='mt-7 mx-4 bg-blue-500'
            textStyles={'text-3xl'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const setupConnection = async () => {
  const { BLEService2, connectedDevice } = useGlobalContext();
  await monitorSetup(BLEService2.manager, connectedDevice.id)
}


export default Scoreboard