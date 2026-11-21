import { View } from "react-native";
import { Text, Button, Avatar } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const name = user?.displayName || "Library Member";

  const handleLogout = async () => {
    await signOut(auth);
    navigation.getParent()?.replace("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Avatar.Text size={90} label={name.charAt(0).toUpperCase()} />
      <Text variant="headlineSmall" style={{ marginTop: 16 }}>
        {name}
      </Text>
      <Text variant="bodyMedium" style={{ marginTop: 4 }}>
        {user?.email}
      </Text>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={{ marginTop: 30, alignSelf: "stretch" }}
      >
        Logout
      </Button>
    </View>
  );
}