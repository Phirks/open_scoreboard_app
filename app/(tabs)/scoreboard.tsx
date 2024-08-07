import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useGlobalContext, monitorSetup } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton"
import { BleManager, Device } from 'react-native-ble-plx'
import { useState } from "react";
import base64 from 'react-native-base64'

const Buffer = require("buffer").Buffer;
const charactaristicRX = (error, characteristic) => {
  console.log(characteristic)
}
const Scoreboard = () => {
  const { BLEService2, connectedDevice } = useGlobalContext();



  return (
    <SafeAreaView className='bg-primary mt-6 h-full w-full items-start'>
      <View className='items-center w-full'>
      <CustomButton
            title=" Setup Connection "
            handlePress={() => {
              monitorSetup(BLEService2.manager,connectedDevice.id)
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />
      </View>
      <View className='h-full w-full flex-row items-start'>
        <View className="space-y-3 pb-5 flex-grow">
          <CustomButton
            title="+"
            handlePress={() => {
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "AA==")
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />

          <CustomButton
            title="-"
            handlePress={() => {
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "AQ==")
            }}
            containerStyles='mt-7 mx-4 bg-red-500'
            textStyles={'text-3xl'}
          />
        </View>
        <View className="space-y-3 pb-5 flex-grow">
          <CustomButton
            title="+"
            handlePress={() => {
              connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Ag==")
            }}
            containerStyles='mt-7 mx-4 bg-blue-500'
            textStyles={'text-3xl'}
          />
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

export default Scoreboard