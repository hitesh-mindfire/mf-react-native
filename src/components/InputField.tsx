import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  icon: IconDefinition;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onIconPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  secureTextEntry,
  onIconPress,
  value,
  onChangeText,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#a9a9a9"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {icon && (
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          <FontAwesomeIcon icon={icon} size={20} color="grey" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconContainer: {
    paddingLeft: 10,
  },
});

export default InputField;
