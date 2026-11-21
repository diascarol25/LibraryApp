import { useState } from "react";
import { View, Image, ScrollView, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";


export default function DetailsScreen({ route }) {
  const { book } = route.params;
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not logged in", "Please login again.");
      return;
    }
    setLoading(true);
    try {
      const bookId = book.key.replace("/works/", "");
      const ref = doc(db, "borrowed", `${user.uid}_${bookId}`);

      const existing = await getDoc(ref);
      if (existing.exists()) {
        Alert.alert("Already borrowed", "You have already borrowed this book.");
        setLoading(false);
        return;
      }

      const borrowDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      await setDoc(ref, {
        userId: user.uid,
        bookId: bookId,
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown author",
        coverId: book.cover_i || null,
        borrowDate: borrowDate,
        dueDate: dueDate,
      });

      Alert.alert("Borrowed!", `Due date: ${dueDate.toDateString()}`);
    } catch (error) {
      Alert.alert("Borrow failed", error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
      {book.cover_i ? (
        <Image
          source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` }}
          style={{ width: 200, height: 300, borderRadius: 8 }}
        />
      ) : (
        <View
          style={{
            width: 200,
            height: 300,
            backgroundColor: "#ddd",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text>No cover</Text>
        </View>
      )}

      <Text variant="headlineSmall" style={{ marginTop: 20, textAlign: "center" }}>
        {book.title}
      </Text>
      <Text variant="titleMedium" style={{ marginTop: 6 }}>
        {book.author_name ? book.author_name[0] : "Unknown author"}
      </Text>
      <Text style={{ marginTop: 6 }}>
        {book.first_publish_year ? `First published: ${book.first_publish_year}` : ""}
      </Text>
      <Text style={{ marginTop: 6 }}>
        {book.number_of_pages_median ? `Pages: ${book.number_of_pages_median}` : ""}
      </Text>

      <Button
        mode="contained"
        onPress={handleBorrow}
        loading={loading}
        style={{ marginTop: 24, alignSelf: "stretch" }}
      >
        Borrow this book
      </Button>
    </ScrollView>
  );
}