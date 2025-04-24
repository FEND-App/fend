import { useForm } from "@tanstack/react-form";
import DatePicker from "react-native-date-picker";
import { z } from 'zod';

import { MainHeader } from "@/components/MainHeader";
import { Text, View } from "@/components/Themed";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox";
import { VStack } from "@/components/ui/vstack";
import { CheckIcon } from "@/components/ui/icon";
import { Redirect, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const newInviteFormSchema = z.object({
  date: z.date().min(new Date(), { message: "Fecha Inválida" }),
  names: z.string(),
  surnames: z.string(),
  isMinor: z.boolean(),
  dni: z.string().min(12, { message: "Número de DNI inválido" }),
  phoneNumber: z.string().min(7, { message: "Número de teléfono inválido" })
});

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Invite() {

  const router = useRouter();
  const { user } = useUser();

  const NewInviteForm = useForm({
    defaultValues: {
      date: new Date(),
      names: '',
      surnames: '',
      isMinor: false,
      dni: '',
      phoneNumber: ''
    },
    validators: {
      onChange: newInviteFormSchema
    },
    onSubmit: async ({ value }) => {
      const payload = {
        id_document: value.dni,
        first_name: value.names.split(" ")[0],
        second_name: value.names.split(" ")[1],
        first_lastname: value.surnames.split(" ")[0],
        second_lastname: value.surnames.split(" ")[1],
        phone_number: value.phoneNumber,
        is_adult: value.isMinor,
        picture: "Not implemented yet...",
        auth_id: user?.id,
        StatuQR: "Active"
      };

      try {
        const response = await fetch(apiUrl + "/residents/Visitor_registration/", {
          method: "POST",
          body: JSON.stringify(payload),
        })

        if (response.status == 200) {
          const data = await response.json();
          const qrCodeData: string = data?.visitor_qr;
          return <Redirect href={`/(home)/invite/success?qrcode=${qrCodeData}`} />;
        }
      } catch (e) {
        console.error(e);
      }
    }
  });

  return (
    <View className="mx-8">
      <MainHeader />
      <View className="mt-4">
        <Heading className="text-xl font-sans">Nueva Invitación</Heading>
        <Text className="text-lg">Ingresa los datos del visitante:</Text>
        <FormControl>
          <NewInviteForm.Field
            name="names"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Nombres" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                  {field.state.meta.errors ? (
                    field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
                  ) : null}
                </VStack>
              );
            }}
          />
          <NewInviteForm.Field
            name="surnames"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Apellidos" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                  {field.state.meta.errors ? (
                    field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
                  ) : null}
                </VStack>
              );
            }}
          />
          <NewInviteForm.Field
            name='isMinor'
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Checkbox isChecked={field.state.value} value={field.state.value.toString()} onChange={field.handleChange}>
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel className="font-sans">¿Es menor de edad?</CheckboxLabel>
                  </Checkbox>
                </VStack>
              );
            }}
          />
          <NewInviteForm.Field
            name="dni"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Número de DNI" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                  {field.state.meta.errors ? (
                    field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
                  ) : null}
                </VStack>
              );
            }}
          />
          <NewInviteForm.Field
            name="phoneNumber"
            children={(field) => {
              return (
                <VStack className="mt-4">
                  <Input className="w-full">
                    <InputField className="font-sans" id={field.name} type="text" placeholder="Celular" value={field.state.value} onChangeText={field.handleChange} />
                  </Input>
                  {field.state.meta.errors ? (
                    field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
                  ) : null}
                </VStack>
              );
            }}
          />
          <Text className="mt-4 text-lg">Fecha de la invitación</Text>
          <NewInviteForm.Field
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
                  {field.state.meta.errors ? (
                    field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
                  ) : null}
                </VStack>
              );
            }}
          />
          <Button className="mt-4" onPress={() => router.push("/(home)/invite/success")}>
            <ButtonText>Continuar</ButtonText>
          </Button>
        </FormControl>
      </View>
    </View>
  );
}