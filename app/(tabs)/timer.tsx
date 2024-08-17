import { View, Text, SafeAreaView, NativeModules, NativeEventEmitter, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton"
// import { BleManager, Device } from 'react-native-ble-plx'
import { useState } from "react";
import base64 from 'react-native-base64'
import WheelPicker from 'react-native-wheely';
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

const range = (start: Number, end: Number, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

const Timer = () => {
  const { rightScore, leftScore, setRightScore, setLeftScore, peripherals, expectedLeftScore, setExpectedLeftScore, expectedRightScore, setExpectedRightScore } = useGlobalContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);

  return (
    <SafeAreaView className='bg-primary h-full w-full flex justify-end'>
      <View className=''>
        <CustomButton
          title="Reset scores (Longpress)"
          handleLongPress={() => {
            setRightScore(0)
            setLeftScore(0)
            BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x04])
          }}
          containerStyles='bg-white'
          textStyles={'text-3xl'}
        />
      </View>
      <View className='flex-row justify-center items-center'>
        <WheelPicker
          containerStyle={styles.container199}
          selectedIndex={timerMinutes}
          itemTextStyle={styles.text}
          options={range(0, 200)}
          onChange={(index) => setTimerMinutes(index)}
          decelerationRate={"normal"}
          itemHeight={140}
          visibleRest={0}
        />
        <Text className='text-[100px] text-white -ml-6 -mr-6'> : </Text>
        <WheelPicker
          containerStyle={styles.container59}
          selectedIndex={timerSeconds}
          itemTextStyle={styles.text}
          options={range(0, 60)}
          onChange={(index) => setTimerSeconds(timerSeconds)}
          decelerationRate={"normal"}
          itemHeight={140}
          visibleRest={0}
        />
      </View>

      <CustomButton
        title="Show Timer"
        handlePress={() => {
          BleManager.write("F0:0A:33:69:AD:C1", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", [0x05, 0x04])//set mode timer
        }}
        containerStyles='bg-blue-500'
        textStyles={'text-3xl'}
      />
      {/* <View className='w-[100%] h-[5%] mb-10 flex-1'>
        <LinearGradient className='flex-1 items-center' colors={['white', 'transparent']} end={[]} />
      </View> */}
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

export default Timer

const styles = StyleSheet.create({
  container199: {
    width: "50%",
    alignItems: 'flex-end'
  },
  container59: {
    width: "36%",
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 100,
  }
})