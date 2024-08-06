import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton"

const Scoreboard = () => {
  const { BLEService2,connectedDevice } = useGlobalContext();
  return (
    <SafeAreaView className='bg-primary h-full w-full flex-row items-end'>
      <View className="space-y-3 pb-5 flex-grow">
      <CustomButton
          title="+"
          handlePress={() => {
            console.log(BLEService2)
            connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "AA==")
          }}
          containerStyles='mt-7 mx-4 bg-red-500'
          textStyles={'text-3xl'}
        />
        
        <CustomButton
          title="-"
          handlePress={() => {
            console.log(BLEService2)
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
            console.log(BLEService2)
            connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Ag==")
          }}
          containerStyles='mt-7 mx-4 bg-blue-500'
          textStyles={'text-3xl'}
        />
        <CustomButton
          title="-"
          handlePress={() => {
            console.log(BLEService2)
            connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Aw==")
          }}
          containerStyles='mt-7 mx-4 bg-blue-500'
          textStyles={'text-3xl'}
        />
        </View>
    </SafeAreaView>
    
  )
}

export default Scoreboard