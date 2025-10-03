import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return  ( 
  <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
         <Stack.Screen name="Learn" options={{ headerShown: false }} />
         <Stack.Screen name="Esad" options={{ headerShown: false }} />
         <Stack.Screen name="Task" options={{ headerShown: false }} />
         <Stack.Screen name="Summary" options={{ headerShown: false }} />
         <Stack.Screen name="FlashcardGeneratorScreen" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}
