import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "@tanstack/react-form";
import { Link, useRouter } from "expo-router";
import { z } from "zod";

import { passwordSchema } from "@/utils/schemas";
import { Text } from "@/components/Themed";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { TouchableOpacity } from "react-native";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/components/ui/icon";

const signUpFormSchema = z.object({
  email: z.string().email("Correo no valido"),
  password: passwordSchema,
  confirm: z.string(),
});

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState<'password' | 'text' | undefined>('password');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<'password' | 'text' | undefined>('password');
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const router = useRouter();

  // Sign-up form
  const signUpForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm: ''
    },
    validators: {
      onChange: signUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      onSignUpPress(value.email, value.password);
    },
  });

  // Handle submission of sign-up form
  const onSignUpPress = async (emailAddress: string, password: string) => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Verification form
  const verificationForm = useForm({
    defaultValues: {
      code: ''
    },
    onSubmit: ({ value }) => onVerifyPress(value.code),
  });

  // Handle submission of verification form
  const onVerifyPress = async (code: string) => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/(home)')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <VStack className="flex items-center px-1 pt-4 w-full">
        <Heading className="py-4">Verifica tu correo</Heading>
        <Text className="text-center py-2">Ingresa el codigo que enviamos a tu correo</Text>
        <verificationForm.Field
          name="code"
          children={(field) => {
            return (
              <VStack>
                <Text>Ingersa el código de verificación</Text>
                <Input className="my-8">
                  <InputField id={field.name} type="text" value={field.state.value} onChangeText={field.handleChange} />
                </Input>
                {field.state.meta.errors ? (
                  <Text>{field.state.meta.errors.join(', ')}</Text>
                ) : null}
                <Button action="primary" className="my-4 w-full" onPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  verificationForm.handleSubmit();
                }}>
                  <ButtonText>Confirmar</ButtonText>
                </Button>
              </VStack>
            );
          }}
        />
      </VStack >
    )
  }

  return (
    <VStack className="flex items-center py-4">
      <Heading>¡Bienvenido!</Heading>
      <Text className="py-2 text-center text-pretty">Ingresa tus datos para continuar</Text>
      <signUpForm.Field
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
              {field.state.meta.errors ? (
                field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
              ) : null}
            </VStack>
          );
        }}
      />
      <signUpForm.Field
        name="password"
        children={(field) => {
          return (
            <VStack className="mt-4 w-full">
              <Input>
                <InputSlot className="pl-2">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField className="font-sans pr-0" id={field.name} type={showPassword} placeholder="Contraseña" value={field.state.value} onChangeText={field.handleChange} />
                <TouchableOpacity className="pl-1 pr-2" onPress={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}>
                  <InputIcon as={showPassword === 'password' ? EyeIcon : EyeOffIcon} />
                </TouchableOpacity>
              </Input>
              {field.state.meta.errors ? (
                field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
              ) : null}
            </VStack>
          );
        }}
      />
      <signUpForm.Field
        name="confirm"
        validators={{
          onChangeListenTo: ["password"],
          onChange: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue("password")) {
              return {
                message: "Las contraseñas no coinciden"
              }
            }
          }
        }}
        children={(field) => {
          return (
            <VStack className="mt-4 w-full">
              <Input>
                <InputSlot className="pl-2">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField className="font-sans pr-0" id={field.name} type={showPasswordConfirm} placeholder="Confirma tu contraseña" value={field.state.value} onChangeText={field.handleChange} />
                <TouchableOpacity className="pl-1 pr-2" onPress={() => setShowPasswordConfirm(showPasswordConfirm === 'password' ? 'text' : 'password')}>
                  <InputIcon as={showPasswordConfirm === 'password' ? EyeIcon : EyeOffIcon} />
                </TouchableOpacity>
              </Input>
              {field.state.meta.errors ? (
                field.state.meta.errors.map((value) => <Text key={value?.message} className="pt-1 pl-2 text-error-500">{value?.message}</Text>)
              ) : null}
            </VStack>
          );
        }}
      />
      <Button action="primary" className="my-4 w-full" onPress={signUpForm.handleSubmit}>
        <ButtonText>Continuar</ButtonText>
      </Button>
      <Text>
        ¿Ya tienes una cuenta?&nbsp;
        <Link className="text-typography-500 underline" href="/(auth)/sign-in">
          Inicia Sesión
        </Link>
      </Text>
    </VStack >
  );
}