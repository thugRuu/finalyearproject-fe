import React from "react";
import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

// export default function HomeScreen() {
//   return (
//       <SafeAreaView>
//         <NativeBaseProvider isSSR={false}>
//           <Box className="text-white">Hello world</Box>
//         </NativeBaseProvider>
//       </SafeAreaView>
//   );
// }

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text> hello world</Text>
      </View>
    </SafeAreaView>
  );
}
