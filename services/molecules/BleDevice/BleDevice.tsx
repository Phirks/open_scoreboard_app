import React from 'react'
import { TouchableOpacity, Text,View } from 'react-native'
import { Device } from 'react-native-ble-plx'
import { DeviceProperty } from './DeviceProperty/DeviceProperty'

export type BleDeviceProps = {
  onPress: (device: Device) => void
  device: Device
}

export function BleDevice({ device, onPress }: BleDeviceProps) {
  const isConnectableInfoValueIsUnavailable = typeof device.isConnectable !== 'boolean'
  const isConnectableValue = device.isConnectable ? 'true' : 'false'
  const parsedIsConnectable = isConnectableInfoValueIsUnavailable ? '-' : isConnectableValue

  return (
    <View className='justify-start items-start px-4 py-2'>
    <TouchableOpacity onPress={() => onPress(device)}>
      {/* <DeviceProperty name="name" value={device.name} />
      <DeviceProperty name="localName" value={device.localName} /> */}
      <DeviceProperty name={device.name} value={device.id} />
      {/* <DeviceProperty name="manufacturerData" value={device.manufacturerData} />
      <DeviceProperty name="rawScanRecord" value={device.rawScanRecord} />
      <DeviceProperty name="isConnectable" value={parsedIsConnectable} />
      <DeviceProperty name="mtu" value={device.mtu.toString()} />
      <DeviceProperty name="rssi" value={device.rssi} /> */}
    </TouchableOpacity>
    </View>
  )
}
