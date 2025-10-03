import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const PaideiaCard = ({ icon, title, description, onPress, colors }) => (
  <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.9}>
    <LinearGradient colors={colors} style={styles.card}>
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons name={icon} size={34} color={"#fff"} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Knowledge is Power ⚡</Text>
      <Text style={styles.headerSubtitle}>Ready to learn something new?</Text>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          <Link href="/Learn" asChild>
            <PaideiaCard
              icon="brain"
              title="Courses"
              description="Lecture notes and documents at your fingertips."
              colors={["#43cea2", "#185a9d"]}
            />
          </Link>
          <Link href="/Task" asChild>
            <PaideiaCard
              icon="check-decagram"
              title="Tasks"
              description="Stay on track and mark progress easily."
              colors={["#fc5c7d", "#6a82fb"]}
            />
          </Link>
          <Link href="/Summary" asChild>
            <PaideiaCard
              icon="file-document-outline"
              title="Summary"
              description="Get concise insights from study materials."
              colors={["#ff9966", "#ff5e62"]}
            />
          </Link>
          <Link href="/FlashcardGeneratorScreen" asChild>
            <PaideiaCard
              icon="cards-outline"
              title="Flashcards"
              description="Sharpen memory with smart study cards."
              colors={["#36d1dc", "#5b86e5"]}
            />
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 40,
    alignItems: "center",
  },
  cardsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  cardWrapper: {
    width: "92%",
    borderRadius: 20,
    overflow: "hidden",
  },
  card: {
    padding: 22,
    borderRadius: 20,
    elevation: 6,
  },
  iconWrapper: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 12,
    padding: 10,
    alignSelf: "flex-start",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 15,
  },
  cardDescription: {
    fontSize: 14,
    color: "#f0f0f0",
    marginTop: 6,
    lineHeight: 20,
  },
});
