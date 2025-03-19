import { Tabs } from 'expo-router/tabs';
import { useColorScheme } from 'react-native';

import HomeIcon from "@/assets/Icons/Home"
import QRCodeIcon from "@/assets/Icons/QRCode"
import { Box } from '@/components/ui/box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Layout() {

  const theme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();
  const iconProps = {
    color: theme === "light" ? "#15313e" : "#d9dbdb",
    width: 36,
    height: 36
  };

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      animation: "shift",
      tabBarStyle: {
        backgroundColor: theme === "light" ? "d9dbdb" : "#15313e",
        paddingTop: 12
      },
    }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: () => <HomeIcon {...iconProps} />
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
    </Tabs>
  );
}
