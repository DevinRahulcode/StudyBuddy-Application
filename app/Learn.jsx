import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

// Reusable Gradient Card
const GradientCard = ({ icon, title, description, colors, onPress }) => (
  <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.85}>
    <LinearGradient colors={colors} style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={34} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Courses</Text>
    <Text style={styles.headerSubtitle}>
      Explore subjects and strengthen your knowledge
    </Text>
  </View>
);

export default function Learn() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Link href="/Esad" asChild>
          <GradientCard
            icon="book-open-variant"
            title="ESAD"
            description="Enterprise Software Analysis Design"
            colors={["#43cea2", "#185a9d"]}
            onPress={() => console.log("ESAD pressed")}
          />
        </Link>
        <GradientCard
          icon="account-group-outline"
          title="EM"
          description="Enterprise Mobilty"
          colors={["#ff9966", "#ff5e62"]}
          onPress={() => console.log("EM pressed")}
        />
        <GradientCard
          icon="server"
          title="DevOps"
          description="Development & Operations"
          colors={["#667eea", "#764ba2"]}
          onPress={() => console.log("DevOps pressed")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#555",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  cardWrapper: {
    marginBottom: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 50,
    padding: 12,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
});
