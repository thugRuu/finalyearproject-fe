import AsyncStorage from "@react-native-async-storage/async-storage";

export const putStringValue = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  try {
    return await AsyncStorage.setItem(`${key}`, `${value}`);
  } catch (e) {
    // read error
  }
};
