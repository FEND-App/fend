import { useForm } from "@tanstack/react-form";
import { z } from 'zod';

import { MainHeader } from "@/components/MainHeader";
import { Text, View } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import DatePicker from "react-native-date-picker";
import { useRouter } from "expo-router";

const newEventFormSchema = z.object({
  date: z.date().min(new Date(), { message: "Fecha Inválida" }),
  name: z.string(),
  description: z.string(),
  location: z.string(),
})

export default function AddEvent() {

  const router = useRouter();

  const NewEventForm = useForm({
    defaultValues: {
      date: new Date(),
      name: '',
      description: '',
      location: ''
    },
    validators: {
      onChange: newEventFormSchema
    }
  });

  return (
    <View className="mx-8">
      <MainHeader />
      <View className="mt-4">
        <Heading>Nuevo Evento</Heading>
        <Text>Ingresa los datos del evento</Text>
        <FormControl>
          <NewEventForm.Field
            name="name"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Nombre" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                </VStack>
              );
            }}
          />
          <NewEventForm.Field
            name="description"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Descripción" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                </VStack>
              );
            }}
          />
          <NewEventForm.Field
            name="location"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Lugar" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                </VStack>
              );
            }}
          />
          <NewEventForm.Field
            name="date"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <DatePicker
                    mode="date"
                    minimumDate={new Date()}
                    date={field.state.value}
                    onDateChange={field.handleChange}
                  />
                </VStack>
              );
            }}
          />
          <Button className="mt-4" onPress={() => router.push("/(home)/calendar")}>
            <ButtonText>Continuar</ButtonText>
          </Button>
        </FormControl>
      </View>
    </View>
  );
}