import { Tabs } from 'expo-router/tabs';
import { useColorScheme } from 'react-native';

import HomeIcon from "@/assets/Icons/Home";
import QRCodeIcon from "@/assets/Icons/QRCode";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();

  const backgroundColor = theme === 'light' ? "#15313e" : "#d9dbdb";
  const color = theme === 'dark' ? "#15313e" : "#d9dbdb";

  const { isSignedIn } = useAuth();

  const iconProps = {
    color: color,
    width: 36,
    height: 36
  };

  if (!isSignedIn)
    return <Redirect href='/(auth)/sign-in' />

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      animation: "shift",
      tabBarStyle: {
        backgroundColor: backgroundColor,
        paddingTop: 12
      },
      sceneStyle: {
        paddingTop: insets.top,
        backgroundColor: backgroundColor,
      },
    }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: () => <HomeIcon {...iconProps} />,
        }}
      />
      <Tabs.Screen
        name='scan'
        options={{
          title: "Scan",
          animation: "none",
          tabBarIcon: () => <QRCodeIcon {...iconProps} />
        }}
      />
      <Tabs.Screen
        name='(invite)/new'
        options={{
          title: 'new_invite',
          href: null
        }}
      />
    </Tabs>
  );
}
