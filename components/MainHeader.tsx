import { View } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage, AvatarBadge } from "./ui/avatar";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";
import { useUser } from "@clerk/clerk-expo";

export function MainHeader() {
  const { user } = useUser();
  return (
    <View className="flex-row items-center mt-4">
      {/* Logo and Brand name */}
      <Image source={require('@/assets/images/logo.png')}
        alt="Logo"
        className="w-12 h-12 mr-4"
      />
      <Heading bold size="3xl" className="tracking-wide text-typography-500" style={{ fontFamily: "Orbitron_900Black" }}>FEND</Heading>
      {/* Avatar */}
      <Avatar size="md" className="ml-auto">
        <AvatarFallbackText>{user?.fullName}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: user?.imageUrl ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <AvatarBadge />
      </Avatar>
    </View>
  );
}