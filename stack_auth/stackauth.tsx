import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@/app/(tabs)';
import SignInScreen from '@/app/(auth)/login';
const Stack = createStackNavigator();

export function AppStack  ()  {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export function AuthStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In Screen" component={SignInScreen} />
    </Stack.Navigator>
  );
};