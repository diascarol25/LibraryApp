import { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing info", "Please fill all the fields.");
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: name });
      Alert.alert("Success", "Account created!");
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, textAlign: "center" }}>
        Create Account
      </Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={{ marginBottom: 12 }}
      />
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
        label="Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleRegister} loading={loading}>
        Register
      </Button>
      <Button onPress={() => navigation.navigate("Login")} style={{ marginTop: 10 }}>
        Already have an account? Login
      </Button>
    </View>
  );
}