import QRCode from "react-native-qrcode-svg";

import { Text, View } from "@/components/Themed";
import { Heading } from "@/components/ui/heading";
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

const logo = require("@/assets/images/logo.png");

export default function SuccessEvent(inviteId: number) {

  const colorScheme = useColorScheme();
  const color = colorScheme === 'light' ? Colors.light.text : Colors.light.background;
  return (
    <View className="mx-8 h-full flex-col justify-center">
      <Center>
        <Heading size="xl" className="font-sans">Evento Creado</Heading>
        <Text className="text-xl text-pretty text-center">Comparte el código de acceso con tus invitados.</Text>
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
        <Button className="w-full">
          <ButtonText>Compartir</ButtonText>
        </Button>
      </Center>
    </View>
  );
}