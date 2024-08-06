import React, { useState } from 'react'
import { FlatList, SafeAreaView, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { BleManager, Device } from 'react-native-ble-plx'
// import { AppButton, AppText, ScreenDefaultContainer } from '../../../components/atoms'
// import type { MainStackPasramList } from '../../../navigation/navigators'
//import { BLEService } from '../../services'
import CustomButton from '@/components/CustomButton'
import { BleDevice } from '../../services/molecules'
import { cloneDeep } from '../../services/cloneDeep'
import { router } from 'expo-router'
import { useGlobalContext } from "../../context/GlobalProvider";
// import { DropDown } from './DashboardScreen.styled'

type DeviceExtendedByUpdateTime = Device

  & { updateTimestamp: number }

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000



export function DashboardScreen() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [foundDevices, setFoundDevices] = useState<DeviceExtendedByUpdateTime[]>([])
  const { BLEService2,connectedDevice } = useGlobalContext();
  const addFoundDevice = (device: Device) =>
    setFoundDevices(prevState => {
      if (!isFoundDeviceUpdateNecessary(prevState, device)) {
        return prevState
      }
      // deep clone
      const nextState = cloneDeep(prevState)
      const extendedDevice: DeviceExtendedByUpdateTime = {
        ...device,
        updateTimestamp: Date.now() + MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS
      } as DeviceExtendedByUpdateTime

      const indexToReplace = nextState.findIndex(currentDevice => currentDevice.id === device.id)
      if (indexToReplace === -1) {
        return nextState.concat(extendedDevice)
      }
      nextState[indexToReplace] = extendedDevice
      return nextState
    })

  const isFoundDeviceUpdateNecessary = (currentDevices: DeviceExtendedByUpdateTime[], updatedDevice: Device) => {
    const currentDevice = currentDevices.find(({ id }) => updatedDevice.id === id)
    if (!currentDevice) {
      return true
    }
    return currentDevice.updateTimestamp < Date.now()
  }

  const onConnectSuccess = () => {
    const connectedDevice = BLEService2.getDevice()
    connectedDevice.services()
    setIsConnecting(false)
  }

  const onConnectFail = () => {
    console.log("failed to connect")

    setIsConnecting(false)
  }

  const deviceRender = (device: Device) => (
    <BleDevice
      onPress={pickedDevice => {
        setIsConnecting(true)
        BLEService2.connectToDevice(pickedDevice.id).then(onConnectSuccess).catch(onConnectFail)
      }}
      key={device.id}
      device={device}
    />
  )

  const scanAndConnect = async () => {
    console.log("Scanning Started");

    await BLEService2.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log("Error in scanning devices:", error);
        return
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      console.log("Detected Device Details:", device.id, device.name);
      // ||device.localName === 'BLEPeripheralApp') 
      if (device.name === 'Nordic_UART_Service') { //
        // Stop scanning as it's not necessary if you are scanning for one device.
        console.log("Device Found, Stopping the Scan.");
        console.log("Connecting to:", device.name)
        BLEService2.manager.stopDeviceScan();
        device.connect()
          .then((device) => {
            // this.info("Discovering services and characteristics")
            console.log("Connected...Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics()
          })
      }
    })
    BLEService2.getDevice()?.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Ag==")
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <View className="mt-7 space-y-2">
          <Text className='text-white font-pregular text-xl'>
            Scan for Devices
          </Text>
        </View>

        <CustomButton
          title="Ask for permissions"
          handlePress={scanAndConnect}
          containerStyles='mt-7'
        />
        <CustomButton
          title="Discover"
          handlePress={() => {BLEService2.discoverAllServicesAndCharacteristicsForDevice()}}
          containerStyles='mt-7'
        />
        <CustomButton
          title="Count"
          handlePress={() => {
            console.log(BLEService2)
            connectedDevice.writeCharacteristicWithoutResponseForService("6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "Ag==")
          }}
          containerStyles='mt-7'
        />
        <CustomButton
          title="Scan for devices"
          handlePress={() => {
            setFoundDevices([])
            BLEService2.initializeBLE().then(() => BLEService2.scanDevices(addFoundDevice, null, false))
          }}
          containerStyles='mt-7'
        //   isLoading={uploading}
        />
      </ScrollView>

      <FlatList
        style={{ flex: 1 }}
        data={foundDevices}
        renderItem={({ item }) => deviceRender(item)}
        keyExtractor={device => device.id}
      />

    </SafeAreaView>





    //     <ScreenDefaultContainer>
    //       {isConnecting && (
    //         <DropDown>
    //           <AppText style={{ fontSize: 30 }}>Connecting</AppText>
    //         </DropDown>
    //       )}
    //       <TouchableOpacity
    //         label="Look for devices"
    //         onPress={() => {
    //           setFoundDevices([])
    //           BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, true))
    //         }}
    //       />
    //       <AppButton
    //         label="Look for devices (legacy off)"
    //         onPress={() => {
    //           setFoundDevices([])
    //           BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, false))
    //         }}
    //       />
    //       <AppButton label="Ask for permissions" onPress={BLEService.requestBluetoothPermission} />
    //       <AppButton label="Go to nRF test" onPress={() => navigation.navigate('DEVICE_NRF_TEST_SCREEN')} />
    //       <AppButton label="Call disconnect with wrong id" onPress={() => BLEService.isDeviceWithIdConnected('asd')} />
    //       <AppButton
    //         label="Connect/disconnect test"
    //         onPress={() => navigation.navigate('DEVICE_CONNECT_DISCONNECT_TEST_SCREEN')}
    //       />
    //       <AppButton label="instance destroy screen" onPress={() => navigation.navigate('INSTANCE_DESTROY_SCREEN')} />
    //       <AppButton label="On disconnect test" onPress={() => navigation.navigate('DEVICE_ON_DISCONNECT_TEST_SCREEN')} />
    //       <FlatList
    //         style={{ flex: 1 }}
    //         data={foundDevices}
    //         renderItem={({ item }) => deviceRender(item)}
    //         keyExtractor={device => device.id}
    //       />
    //     </ScreenDefaultContainer>
  )
}

export default DashboardScreen