import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080';

const FlashcardGeneratorScreen = () => {
  const [fileAsset, setFileAsset] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFileAsset(result.assets[0]);
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while picking the file.');
    }
  };

  const handleGenerateFlashcards = async () => {
    if (!fileAsset) {
      setError('Please select a PDF file first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setFlashcards([]);

    const formData = new FormData();
    formData.append('file', {
      uri: fileAsset.uri,
      name: fileAsset.name,
      type: fileAsset.mimeType,
    });

    try {
      const response = await fetch(`${API_URL}/api/flashcards/generate`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const responseText = await response.text();
      if (!response.ok) throw new Error(responseText);

      const data = JSON.parse(responseText);
      setFlashcards(data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFlashcard = ({ item }) => (
    <LinearGradient
      colors={['#ffffff', '#E8F0FE']}
      style={styles.flashcard}
    >
      <Text style={styles.cardText}><Text style={styles.cardLabel}>Q:</Text> {item.question}</Text>
      <View style={styles.separator} />
      <Text style={styles.cardText}><Text style={styles.cardLabel}>A:</Text> {item.answer}</Text>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#A1C4FD', '#C2E9FB']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flashcard Generator 🧠</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleDocumentSelection}>
          <LinearGradient colors={['#4A90E2', '#50E3C2']} style={styles.button}>
            <Text style={styles.buttonText}>Choose PDF</Text>
          </LinearGradient>
        </TouchableOpacity>
        {fileAsset && <Text style={styles.fileName}>{fileAsset.name}</Text>}
        <TouchableOpacity
          onPress={handleGenerateFlashcards}
          disabled={!fileAsset || isLoading}
        >
          <LinearGradient
            colors={!fileAsset || isLoading ? ['#a9a9a9', '#a9a9a9'] : ['#7B61FF', '#AC5FFF']}
            style={[styles.button, { marginTop: 10 }]}
          >
            <Text style={styles.buttonText}>Generate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={flashcards}
        renderItem={renderFlashcard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          !isLoading && flashcards.length === 0 && <Text style={styles.emptyText}>Your generated flashcards will appear here.</Text>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { padding: 20, borderRadius: 12, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.5)' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  controls: { alignItems: 'center', marginBottom: 20 },
  button: { paddingVertical: 14, paddingHorizontal: 40, borderRadius: 25, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  fileName: { fontStyle: 'italic', color: '#555', marginVertical: 10 },
  loader: { marginVertical: 20 },
  errorText: { color: 'red', textAlign: 'center', margin: 10 },
  listContainer: { paddingHorizontal: 5 },
  flashcard: { borderRadius: 12, padding: 20, marginVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  cardText: { fontSize: 16, color: '#333' },
  cardLabel: { fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: '#ccc', marginVertical: 10 },
  emptyText: { textAlign: 'center', color: '#555', marginTop: 50, fontSize: 16 },
});

export default FlashcardGeneratorScreen;
