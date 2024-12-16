import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { colors } from "../theme";

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  icon: IconDefinition;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onIconPress?: () => void;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  secureTextEntry,
  onIconPress,
  value,
  onChangeText,
  errorMessage,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          errorMessage ? styles.errorBorder : null,
        ]}
      >
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
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lavendarGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.white,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkCharcole,
  },
  iconContainer: {
    paddingLeft: 10,
  },
  errorText: {
    color: colors.electicRed,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  errorBorder: {
    borderColor: colors.electicRed,
  },
});
export default InputField;
