import QRCode from "react-native-qrcode-svg";

import { Text, View } from "@/components/Themed";
import { Heading } from "@/components/ui/heading";
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";

const logo = require("@/assets/images/logo.png");

export default function SuccessInvite() {

  const local = useLocalSearchParams();
  const qrcode = local.qrcode;
  console.log(qrcode);

  const colorScheme = useColorScheme();
  const color = colorScheme === 'light' ? Colors.light.text : Colors.light.background;
  return (
    <View className="mx-8 h-full flex-col justify-center">
      <Center>
        <Heading size="xl" className="font-sans">¡Listo!</Heading>
        <Text className="text-xl text-pretty text-center">Comparte el código de acceso con la persona que invitaste.</Text>
        <View className="m-8 p-4 border-typography-500 border-4 border-spacing-4 rounded-lg">
          <QRCode
            value={qrcode as string}
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