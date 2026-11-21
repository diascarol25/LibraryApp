import { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, textAlign: "center" }}>
        Welcome Back
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 12 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleLogin} loading={loading}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate("Register")} style={{ marginTop: 10 }}>
        New here? Create account
      </Button>
    </View>
  );
}