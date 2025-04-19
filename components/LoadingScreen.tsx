import { ActivityIndicator } from "react-native";
import { View } from "./Themed";

export default function LoadingScreen() {
  return (
    <View className="h-full flex justify-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}