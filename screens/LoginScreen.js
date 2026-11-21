import { View } from "react-native";
import { Text, Button } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium">Login Screen</Text>
      <Button onPress={() => navigation.navigate("Register")} style={{ marginTop: 16 }}>
        Create account
      </Button>
    </View>
  );
}