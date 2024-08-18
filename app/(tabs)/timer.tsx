import { View, Text, SafeAreaView, NativeModules, NativeEventEmitter, ImageBackground, ScrollView, StyleSheet, Image } from 'react-native'
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
import { icons } from '../../constants'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const BleManagerModule = NativeModules.BleManager;

const Buffer = require("buffer").Buffer;
const charactaristicRX = (error, characteristic) => {
  console.log(characteristic)
}

const range = (start: number, end: number, step = 1, isLeftSide: boolean = true) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i: number = start; i < end; i += step) {
    if (isLeftSide) {
      if (i > 99) { output.push(i.toString()); }
      else if (i > 9) { output.push(" " + i.toString()); }
      else {
        output.push(" 0" + i.toString());
      }
    }
    else {
      if (i > 99) { output.push(i.toString()); }
      else if (i > 9) { output.push(i.toString() + " "); }
      else {
        output.push("0" + i.toString() + " ");
      }
    }
  }
  return output.reverse();
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
          itemStyle={styles.item}
          containerStyle={styles.containerLeft}
          selectedIndicatorStyle={styles.indicator}
          selectedIndex={199}
          itemTextStyle={styles.text}
          flatListProps={styles.flatList}
          options={range(0, 200, 1, true)}
          onChange={(index) => setTimerMinutes(index)}
          decelerationRate={"normal"}
          itemHeight={180}
          visibleRest={0}

        />
        <Text className='text-[100px] text-white -ml-6 -mr-6 pb-6'> : </Text>
        <WheelPicker
          itemStyle={styles.item}
          containerStyle={styles.containerRight}
          selectedIndicatorStyle={styles.indicator}
          selectedIndex={59}
          itemTextStyle={styles.text}
          flatListProps={styles.flatList}
          options={range(0, 60, 1, false)}
          onChange={(index) => setTimerSeconds(index)}
          decelerationRate={"normal"}
          itemHeight={180}
          visibleRest={0}
        />
        <Image className='absolute right-[-7%] scale-50'
          source={icons.scroll}
        />


        <View className='w-[20%] h-[85%] absolute right-[0%] -z-10'>

        </View>
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

      <WheelPicker
        selectedIndex={selectedIndex}
        options={['Berlin', 'London', 'Amsterdam', 'Berlin', 'London', 'Amsterdam']}
        onChange={(index) => setSelectedIndex(index)}
      />
    </SafeAreaView>
  )
}

export default Timer

const styles = StyleSheet.create({
  containerLeft: {
    width: "48%",
    alignItems: 'flex-end',
    top: -6
  },
  containerRight: {
    width: "48%",
    alignItems: 'flex-start',
    top: -6
  },

  flatList: {

  },
  indicator: {
    backgroundColor: 'transparent',

  },
  item: {
    paddingHorizontal: 0,

  },
  text: {
    fontSize: 115,
    color: 'white',

  }
})