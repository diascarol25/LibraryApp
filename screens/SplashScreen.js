import { useEffect } from "react";
import { View, Image, Text } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Login"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 140, height: 140 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
        Library App
      </Text>
    </View>
  );
}