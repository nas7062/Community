import { colors } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface TabProps {
  isActive: boolean;
  onPress?: () => void;
  label: string;
}

function Tab({ isActive, label, onPress }: TabProps) {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 2,
  },
  activeContainer: { borderBottomColor: colors.BLACK, borderBottomWidth: 2 },
  text: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  activeText: { fontSize: 14, color: colors.BLACK, fontWeight: "bold" },
});

export default Tab;
