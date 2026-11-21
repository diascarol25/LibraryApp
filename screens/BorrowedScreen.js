import { useState, useEffect } from "react";
import { View, FlatList, Image, Alert } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function BorrowedScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "borrowed"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBooks(list);
    });

    return unsubscribe;
  }, []);

  const handleReturn = async (id) => {
    try {
      await deleteDoc(doc(db, "borrowed", id));
      Alert.alert("Returned", "Book returned successfully.");
    } catch (error) {
      Alert.alert("Return failed", error.message);
    }
  };

  const renderBook = ({ item }) => (
    <Card style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        {item.coverId ? (
          <Image
            source={{ uri: `https://covers.openlibrary.org/b/id/${item.coverId}-M.jpg` }}
            style={{ width: 70, height: 100, borderRadius: 4 }}
          />
        ) : (
          <View
            style={{
              width: 70,
              height: 100,
              backgroundColor: "#ddd",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text>No cover</Text>
          </View>
        )}
        <View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }}>
          <Text variant="titleMedium" numberOfLines={2}>
            {item.title}
          </Text>
          <Text variant="bodyMedium">{item.author}</Text>
          <Text variant="bodySmall" style={{ marginTop: 4 }}>
            Due: {item.dueDate.toDate().toDateString()}
          </Text>
          <Button
            mode="outlined"
            onPress={() => handleReturn(item.id)}
            style={{ marginTop: 8, alignSelf: "flex-start" }}
          >
            Return
          </Button>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 50 }}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>
        My Borrowed Books
      </Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            You haven't borrowed any books yet.
          </Text>
        }
      />
    </View>
  );
}