import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStringValue = async (value: string) => {
  try {
    return await AsyncStorage.getItem(`${value}`);
  } catch (e) {
    // read error
  }
};
