import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Avatar, AvatarFallbackText, AvatarBadge, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    // Top Logo and Avatar
    <View className="h-screen" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Logo and Brand name */}
      <Box className="flex-row items-center mt-4 mx-8">
        <>
          <Image source={require('@/assets/images/logo.png')}
            alt="Logo"
            className="w-12 h-12 mr-4"
          />
          <Heading bold size="3xl" className="tracking-wide" style={{ fontFamily: "Orbitron_900Black" }}>FEND</Heading>
        </>
        {/* Avatar */}
        <Avatar size="md" className="ml-auto">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <AvatarBadge />
        </Avatar>
      </Box>
    </View >
  );
}