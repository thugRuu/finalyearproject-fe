import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteString = async (value: string) => {
  try {
    return await AsyncStorage.removeItem(`${value}`);
  } catch (e) {
    // read error
  }
};
