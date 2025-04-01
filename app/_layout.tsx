import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Orbitron_400Regular, Orbitron_900Black } from "@expo-google-fonts/orbitron";
import { Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold } from "@expo-google-fonts/raleway";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect, useState } from "react";
import { tokenCache } from "@/cache";

import LoadingScreen from "@/components/LoadingScreen";

import "@/global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Orbitron_400Regular,
    Orbitron_900Black,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useLayoutEffect(() => {
    setStyleLoaded(true);
  }, [styleLoaded]);

  if (!loaded || !styleLoaded) {
    return <LoadingScreen />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"} >
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </GluestackUIProvider>
    </ClerkProvider >
  );
}
