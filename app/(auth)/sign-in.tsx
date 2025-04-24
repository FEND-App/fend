import { useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";
import { useForm } from "@tanstack/react-form";
import { Link, useRouter } from "expo-router";
import { z } from "zod";

import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/Themed";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/components/ui/icon";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState<'password' | 'text' | undefined>('password');
  const { signIn, setActive, isLoaded } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  // Sign-up form
  const signInForm = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onChange: signInFormSchema,
    },
    onSubmit: ({ value }) => onSignInPress(value.email, value.password),
  });

  // Handle the submission of the sign-in form
  const onSignInPress = async (email: string, password: string) => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <FormControl>
      <VStack className="flex items-center w-full">
        <Heading className="font-bold">¡Bienvenido de vuelta!</Heading>
        <Text className="py-2 text-pretty text-center">Ingresa tus datos para continuar</Text>
        <signInForm.Field
          name="email"
          children={(field) => {
            return (
              <VStack className="mt-4 w-full">
                <Input>
                  <InputSlot className="pl-2">
                    <InputIcon as={MailIcon} />
                  </InputSlot>
                  <InputField className="font-sans" id={field.name} type="text" placeholder="Correo electrónico" value={field.state.value} onChangeText={field.handleChange} />
                </Input>
              </VStack>
            );
          }}
        />
        <signInForm.Field
          name="password"
          children={(field) => {
            return (
              <VStack className="mt-4 w-full">
                <Input className="">
                  <InputSlot className="pl-2">
                    <InputIcon as={LockIcon} />
                  </InputSlot>
                  <InputField className="font-sans pr-0" id={field.name} type={showPassword} placeholder="Contraseña" value={field.state.value} onChangeText={field.handleChange} />
                  <TouchableOpacity className="pl-1 pr-2" onPress={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}>
                    <InputIcon as={showPassword === 'password' ? EyeIcon : EyeOffIcon} />
                  </TouchableOpacity>
                </Input>
              </VStack>
            );
          }}
        />
        {errors &&
          <FlatList
            data={errors}
            renderItem={(error) => <Text className="text-red-500">{error.item.longMessage}</Text>}
          />
        }
        <Button className="my-4 w-full" onPress={signInForm.handleSubmit}>
          <ButtonText className="font-bold">Continuar</ButtonText>
        </Button>
        <Text>
          ¿No tienes una cuenta?&nbsp;
          <Link className="text-typography-500 underline" href="/(auth)/sign-up">
            Crea una cuenta
          </Link>
        </Text>
      </VStack >
    </FormControl >
  );
}