import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Animated, Easing } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const GRADIENT_COLORS = ['#00796B', '#38a169', '#81E6D9'];

export default function Index() {
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startBouncing = () => {
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.68, -0.55, 0.27, 1.55),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => startBouncing());
    };

    startBouncing();

    return () => {
      bounceValue.stopAnimation();
    };
  }, []);

  const translateY = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      style={styles.gradientContainer}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Welcome to Study Buddy</Text>
        <Text style={styles.subtitleText}>Your gateway to knowledge</Text>
        <Link href="/HomeScreen" asChild>
          <Pressable>
            <Animated.View style={[styles.button, { transform: [{ translateY }] }]}>
              <Text style={styles.buttonText}>Let's Get Started</Text>
            </Animated.View>
          </Pressable>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.8,
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.38,
    shadowRadius: 7.49,
    elevation: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#00796B',
    fontWeight: 'bold',
  },
});
