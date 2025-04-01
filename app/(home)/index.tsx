import { useUser, useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { View } from "@/components/Themed";
import { Image } from "@/components/ui/image";
import { Avatar, AvatarFallbackText, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/Themed";

export default function Home() {
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/(auth)/sign-in'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      <View className="flex-row items-center mt-4 mx-8">
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
      <View className="mx-8 mt-4">
        <Text>Bienvenido de vuelta, {user?.fullName}!</Text>
        <Button className="my-4" onPress={() => handleSignOut()} action="primary">
          <ButtonText>Cerrar Sesión</ButtonText>
        </Button>
      </View>
    </>
  );
}