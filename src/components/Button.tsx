import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={disabled ? () => {} : onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 4,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#b0b0b0",
    elevation: 0,
  },
  disabledText: {
    color: "#7f7f7f",
  },
});

export default Button;
