import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {
  faUser,
  faEyeSlash,
  faEye,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { StackScreenProps } from "../../navigation/AppNavigator";

const LoginScreen: FC<StackScreenProps<"Login">> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    Alert.alert(
      "User Details",
      `Email: ${email}\nPassword: ${password}`,
      [
        {
          text: "OK",
          onPress: () => {
            setEmail("");
            setPassword("");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Hello" subtitle="Sign in to your account" />
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <InputField
          placeholder="Email"
          icon={faEnvelope}
          onChangeText={setEmail}
          value={email}
        />
        <InputField
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
          onIconPress={() => {
            setShowPassword((show: boolean) => !show);
          }}
          icon={showPassword ? faEye : faEyeSlash}
        />
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button title="Sign In" onPress={handleSignIn} />
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.createAccount}>
            Don’t have an account? <Text style={styles.link}>Create</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#007bff",
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#007bff",
    marginVertical: 5,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: "center",
  },
  createAccount: {
    textAlign: "center",
    color: "#000000",
    marginTop: 10,
  },
  link: {
    color: "#007bff",
  },
});

export default LoginScreen;
