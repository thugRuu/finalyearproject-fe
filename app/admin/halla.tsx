import { deleteString } from '@/hooks/deleteStringValue';
import { router } from 'expo-router';
import React from 'react'
import { Pressable,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  return (
    <SafeAreaView>
          <Pressable
        onPress={async () => {
          await deleteString("details");
          router.replace("/login");
        }}
      >
        <Text className="text-white flex items-center justify-center h-96">
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>

  )
}
