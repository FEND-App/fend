import { useUser, useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

import { MainHeader } from "@/components/MainHeader";
import { View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function Home() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

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
    <Box className="mx-4">
      <MainHeader />
      <View className="mt-4">
        <Text>Bienvenido de vuelta, {user?.fullName}!</Text>
        <Button className="mt-4" onPress={() => { router.push('/(home)/(invite)/new') }} action="primary">
          <ButtonText>Nueva Invitación</ButtonText>
        </Button>
        <Button className="mt-4" onPress={() => handleSignOut()} action="primary">
          <ButtonText>Cerrar Sesión</ButtonText>
        </Button>
      </View>
    </Box>
  );
}