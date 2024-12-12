import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { StackScreenProps } from "@/src/navigation";
import Header from "@/src/components/Header";
import InputField from "@/src/components/InputField";
import Button from "@/src/components/Button";

const ForgotPasswordScreen: FC<StackScreenProps<"ForgotPassword">> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>("");
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    Alert.alert(
      "Password Reset",
      `A password reset link has been sent to ${email}.`,
      [
        {
          text: "OK",
          onPress: () => {
            setEmail("");
            navigation.navigate("Login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header
          title="Forgot Password"
          subtitle="Reset your account password"
        />
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <InputField
          placeholder="Email"
          icon={faEnvelope}
          onChangeText={setEmail}
          value={email}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button title="Forgot Password" onPress={handleForgotPassword} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backToLogin}>Back to Login</Text>
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
    backgroundColor: "#4a90e2",
    paddingVertical: 80,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  form: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: "center",
  },
  backToLogin: {
    textAlign: "center",
    color: "#4a4a4a",
    marginTop: 15,
  },
});

export default ForgotPasswordScreen;
