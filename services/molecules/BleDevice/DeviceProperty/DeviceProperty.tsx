import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

export type DevicePropertyProps = {
  name: string
  value?: number | string | null
}

export function DeviceProperty({ name, value }: DevicePropertyProps) {
  return (
    <View className=''>
      <Text className='font-pmedium text-sm text-gray-100'>{name}</Text>
      <Text className='font-pthin text-gray-100 text-lg'>{value || '-'}</Text>
    </View>
  )
}
