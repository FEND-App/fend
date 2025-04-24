import { useColorScheme } from "react-native";
import { Calendar } from "react-native-calendars";
import { View, Text } from "@/components/Themed";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";

import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";

interface Event {
  name: string;
  time: string;
}

const events: Event[] = [
  {
    name: "Colecta Benéfica",
    time: "3:00 PM"
  },
  {
    name: "Mercado de Artesanias",
    time: "10:00 AM"
  }
]

export default function CalendarView() {

  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View className="mx-8 my-8">
      <Button className="ml-auto mb-4" onPress={() => router.push("/(home)/calendar/addevent")}>
        <ButtonText>Nuevo Evento</ButtonText>
      </Button>
      <Calendar
        theme={{
          calendarBackground: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
          backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
          textSectionTitleColor: Colors.dark.text,
          textSectionTitleDisabledColor: Colors.dark.text,
          monthTextColor: Colors.dark.text,
          dayTextColor: Colors.dark.text,
          todayBackgroundColor: Colors.dark.tabIconDefault,
          todayTextColor: Colors.dark.background,
          selectedDayTextColor: Colors.light.text,
          selectedDayBackgroundColor: Colors.light.background,
          textDisabledColor: Colors.dark.icon
        }}
      />
      <VStack className="my-4">
        {
          events.map((event: Event) =>
            <Box key={event.name} className="rounded-lg mb-4 p-2 px-4" style={{ backgroundColor: Colors.dark.tabIconDefault }}>
              <Text className="font-heading">{event.time}</Text>
              <Text className="font-sans text-lg text-typography-500">{event.name}</Text>
            </Box>
          )
        }
      </VStack>
    </View >
  );
}
