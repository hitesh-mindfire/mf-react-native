import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {
  faUser,
  faEyeSlash,
  faEnvelope,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RootStackParamList,
  StackScreenProps,
} from "../../navigation/AppNavigator";
import { Checkbox } from "expo-checkbox";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const SignupScreen: FC<StackScreenProps<"Signup">> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "You must agree to the Terms & Conditions.");
      return;
    }

    Alert.alert("Sign Up Successful", `Welcome, ${email}!`, [
      {
        text: "OK",
        onPress: () => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setAgreeToTerms(false);
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Welcome!" subtitle="Create your account" />
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
        <InputField
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          onIconPress={() => {
            setShowConfirmPassword((show: boolean) => !show);
          }}
          icon={showConfirmPassword ? faEye : faEyeSlash}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={agreeToTerms}
            onValueChange={setAgreeToTerms}
            color={agreeToTerms ? "#007bff" : "#a9a9a9"}
          />
          <Text style={styles.checkboxLabel}>
            I read and agree to the{" "}
            <Text style={styles.link}>Terms & Conditions</Text>
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 4,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#000000",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: "center",
  },
  login: {
    textAlign: "center",
    color: "#000000",
    marginTop: 15,
  },
  loginLink: {
    color: "#007bff",
  },
});

export default SignupScreen;
