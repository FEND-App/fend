import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { View } from "@/components/Themed";

export default function AuthLayout() {
  const insets = useSafeAreaInsets();
  const { isSignedIn } = useAuth();

  if (isSignedIn)
    return <Redirect href="/(home)" />

  return (
    <View className="flex-1">
      <VStack className="my-8 flex justify-center items-center" style={{ paddingTop: insets.top }}>
        <Image source={require('@/assets/images/logo.png')}
          alt="Logo"
          className="w-36 h-36"
        />
        <Heading bold size="3xl" className="tracking-wide mt-2" style={{ fontFamily: "Orbitron_900Black" }}>FEND</Heading>
      </VStack>
      <VStack className="mx-8">
        <Slot />
      </VStack>
    </View>
  );
}