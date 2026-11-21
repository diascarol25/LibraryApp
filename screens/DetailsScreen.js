import { View, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function DetailsScreen({ route }) {
  const { book } = route.params;

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
    </ScrollView>
  );
}