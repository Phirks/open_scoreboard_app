import { ScrollView, View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext
  const [form, setform] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert('Error, Please fill in all the fields')

    }
    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')

    } catch (error) {
      if (error instanceof Error) Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }


  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={icons.scroll}
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address" placeholder={undefined} />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7" placeholder={undefined} />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting} textStyles={undefined} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have account?
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-orange-400'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn