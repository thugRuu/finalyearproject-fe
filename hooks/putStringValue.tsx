import AsyncStorage from "@react-native-async-storage/async-storage";
export interface IPutString {
  _id: string;
  token: string;
  username: string;
}
export const putStringValue = async (data: IPutString) => {
  try {
    const jsonValue = JSON.stringify(data);
    return await AsyncStorage.setItem("details", jsonValue);
  } catch (e) {
    console.log(e);
  }
};
