import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {
  faEyeSlash,
  faEye,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { StackScreenProps } from "../../navigation/AppNavigator";
import { Formik, FormikHelpers } from "formik";
import Checkbox from "expo-checkbox";
import { SignupSchema } from "@/src/validation/SignupSchema";
import { colors } from "@/src/theme";

const SignupScreen: React.FC<StackScreenProps<"Signup">> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = (
    values: {
      email: string;
      password: string;
      confirmPassword: string;
      agreeToTerms: boolean;
    },
    {
      resetForm,
    }: FormikHelpers<{
      email: string;
      password: string;
      confirmPassword: string;
      agreeToTerms: boolean;
    }>
  ) => {
    Alert.alert(
      "Sign Up Successful",
      `Welcome!\nEmail: ${values.email}\nPassword: ${values.password}`,
      [
        {
          text: "OK",
          onPress: () => {
            resetForm(), navigation.navigate("Login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Create Account" subtitle="Sign up to get started" />
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => handleSignUp(values, actions)}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            handleSubmit,
            isValid,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <InputField
                placeholder="Email"
                icon={faEnvelope}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                inputMode="email"
                value={values.email}
                errorMessage={touched.email && errors.email ? errors.email : ""}
              />
              <InputField
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                onIconPress={() => setShowPassword(!showPassword)}
                icon={showPassword ? faEye : faEyeSlash}
                errorMessage={
                  touched.password && errors.password ? errors.password : ""
                }
              />
              <InputField
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                icon={showConfirmPassword ? faEye : faEyeSlash}
                errorMessage={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={values.agreeToTerms}
                  onValueChange={(value) =>
                    setFieldValue("agreeToTerms", value)
                  }
                  color={values.agreeToTerms ? colors.yankeesBlue : colors.gray}
                />
                <Text style={styles.checkboxLabel}>
                  I agree to the terms and conditions
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <Button
                  title="Sign Up"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.createAccount}>
                    Already have an account?{" "}
                    <Text style={styles.link}>Log In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
  },
  header: {
    backgroundColor: colors.yankeesBlue,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.darkCharcole,
  },
  bottomContainer: {
    marginTop: "auto",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  createAccount: {
    textAlign: "center",
    color: colors.darkCharcole,
    marginTop: 10,
    fontSize: 14,
  },
  link: {
    color: colors.yankeesBlue,
    fontWeight: "600",
  },
});

export default SignupScreen;
