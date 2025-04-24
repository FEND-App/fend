import { Tabs } from 'expo-router/tabs';
import { useColorScheme } from 'react-native';

import HomeIcon from "@/assets/Icons/Home";
import QRCodeIcon from "@/assets/Icons/QRCode";
import CalendarIcon from '@/assets/Icons/Calendar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();

  const backgroundColor = theme === 'dark' ? "#15313e" : "#d9dbdb";
  const color = theme === 'light' ? "#15313e" : "#d9dbdb";

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
        paddingTop: 12,
        paddingBottom: 12,
        height: 64
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
          href: null,
          animation: "none",
          tabBarIcon: () => <QRCodeIcon {...iconProps} />
        }}
      />
      <Tabs.Screen
        name='access/index'
        options={{
          title: 'Show Access Credential',
          tabBarIcon: () => <QRCodeIcon {...iconProps} />
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          tabBarIcon: () => <CalendarIcon {...iconProps} />
        }}
      />
      <Tabs.Screen
        name='invite'
        options={{
          title: 'Calendar',
          href: null,
          tabBarIcon: () => <CalendarIcon {...iconProps} />
        }}
      />
      <Tabs.Screen
        name='invite/success'
        options={{
          title: 'Calendar',
          href: null,
          tabBarIcon: () => <CalendarIcon {...iconProps} />
        }}
      />
    </Tabs>
  );
}
