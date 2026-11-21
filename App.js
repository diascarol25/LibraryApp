import "./firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DetailsScreen from "./screens/DetailsScreen";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />  
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={{ headerShown: true, title: "Book Details" }}
/>
      </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}