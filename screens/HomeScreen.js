import { useState, useEffect } from "react";
import { View, FlatList, Image } from "react-native";
import { Searchbar, Card, Text, ActivityIndicator } from "react-native-paper";

export default function HomeScreen() {
  const [query, setQuery] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(text)}&limit=20`
      );
      const data = await res.json();
      setBooks(data.docs);
    } catch (error) {
      console.log("API error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchBooks(query);
  }, []);

  const renderBook = ({ item }) => (
    <Card style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        {item.cover_i ? (
          <Image
            source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` }}
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
          <Text variant="bodyMedium">
            {item.author_name ? item.author_name[0] : "Unknown author"}
          </Text>
          <Text variant="bodySmall">
            {item.first_publish_year ? `First published: ${item.first_publish_year}` : ""}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 50 }}>
      <Searchbar
        placeholder="Search books"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => searchBooks(query)}
        style={{ marginBottom: 12 }}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={renderBook}
          ListEmptyComponent={<Text style={{ textAlign: "center" }}>No books found</Text>}
        />
      )}
    </View>
  );
}