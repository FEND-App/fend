import QRCode from "react-native-qrcode-svg";

import { Text, View } from "@/components/Themed";
import { Heading } from "@/components/ui/heading";
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { MainHeader } from '../../../components/MainHeader';
import { useEffect } from "react";

const logo = require("@/assets/images/logo.png");

export default function SuccessInvite(inviteId: number) {

  const colorScheme = useColorScheme();
  // const color = colorScheme === 'light' ? Colors.light.text : Colors.light.background;
  const color = Colors.light.icon;

  // Fetch resident qrcode
  useEffect(() => { }, []);

  return (
    <View className="mx-8 h-full">
      <MainHeader />
      <Center className="my-auto flex-col justify-center">
        <Heading size="xl" className="font-sans">¡Bienvenido de vuelta!</Heading>
        <Text className="text-xl text-pretty text-center">Comparte el código de acceso con el guardia para acceder.</Text>
        <View className="m-8 p-4 border-typography-500 border-4 border-spacing-4 rounded-lg">
          <QRCode
            value={inviteId.toString()}
            size={240}
            logo={logo}
            logoBackgroundColor="transparent"
            backgroundColor="transparent"
            color={color}
          />
        </View>
      </Center>
    </View>
  );
}