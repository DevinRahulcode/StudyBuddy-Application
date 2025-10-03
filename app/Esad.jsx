import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Pressable,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PRIMARY_COLOR = "#00796B";

export default function Esad() {
  const [esads, setEsads] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEsads();
  }, []);

  const fetchEsads = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get("http://10.0.2.2:8080/api/esad/all");
      setEsads(response.data);
    } catch (error) {
      console.error("Error fetching ESADs:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleOpenPdf = (id) => {
    const pdfUrl = `http://10.0.2.2:8080/api/esad/view/${id}`;
    Linking.openURL(pdfUrl);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="file-pdf-box" size={28} color={PRIMARY_COLOR} />
        </View>
        <View style={{ marginLeft: 12, flexShrink: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>PDF</Text>
          </View>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() => handleOpenPdf(item.id)}
      >
        <MaterialCommunityIcons name="download" size={22} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📂 ESAD Documents</Text>
      <FlatList
        data={esads}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={fetchEsads}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  tag: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    color: PRIMARY_COLOR,
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 12,
    borderRadius: 30,
    shadowColor: PRIMARY_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  separator: {
    height: 14,
  },
});
