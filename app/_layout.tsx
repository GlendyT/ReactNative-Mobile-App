
import { Stack } from "expo-router";
import { View } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-primary">
      <Stack >
        {/*This code hides the route groups header  */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="favoritemovies/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="favoritetvshows/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tvshow/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="lists/index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
