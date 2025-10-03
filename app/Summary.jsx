import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function Summary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const pickAndUploadPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      if (result.canceled) return;

      const file = result.assets[0];
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: "application/pdf",
        name: file.name,
      });

      setLoading(true);
      const response = await axios.post(
        "http://10.0.2.2:8080/api/summary/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSummary(response.data);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={styles.container}>

      <Text style={styles.headerText}>📄 PDF Summary Generator</Text>

      <TouchableOpacity style={styles.button} onPress={pickAndUploadPdf} activeOpacity={0.8}>
        <LinearGradient
          colors={["#FF6B6B", "#FFD93D"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>📤 Upload PDF & Get Summary</Text>
        </LinearGradient>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 20 }} />}

      {summary ? (
        <ScrollView style={[styles.summaryBox, { backgroundColor: "#FFF5E1" }]}>
          <Text style={styles.summaryText}>{summary}</Text>
        </ScrollView>
      ) : (
        !loading && <Text style={styles.noSummary}>No summary yet</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  summaryBox: {
    marginTop: 25,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  noSummary: {
    marginTop: 25,
    textAlign: "center",
    color: "#555",
    fontSize: 16,
  },
});
