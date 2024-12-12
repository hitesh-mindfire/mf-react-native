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
  secureTextEntry?: boolean;
  onIconPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  secureTextEntry,
  onIconPress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#a9a9a9"
        {...props}
      />
      {icon && (
        <TouchableOpacity onPress={onIconPress}>
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
    borderColor: "lightgrey",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
  },
});

export default InputField;
