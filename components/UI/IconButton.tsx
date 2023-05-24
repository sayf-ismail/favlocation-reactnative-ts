import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";

interface IconButtonProps {
  icon: ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: HeaderButtonProps["tintColor"];
  onPress: () => void;
}

export default function IconButton({
  icon,
  size,
  color,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
