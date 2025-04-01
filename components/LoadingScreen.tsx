import { ActivityIndicator } from "react-native";
import { View } from "./ui/view";

export default function LoadingScreen() {
  return (
    <View className="h-full flex justify-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}