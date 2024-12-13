import React from "react";
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
import * as Yup from "yup";
import Checkbox from "expo-checkbox";

const SignupScreen: React.FC<StackScreenProps<"Signup">> = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
  });

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
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSignUp(values, actions)}
          validateOnMount
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
                secureTextEntry={!showPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                onIconPress={() => setShowPassword(!showPassword)}
                icon={showPassword ? faEye : faEyeSlash}
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
                  color={values.agreeToTerms ? "#007bff" : "#a9a9a9"}
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
    backgroundColor: "#f4f4f8",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  bottomContainer: {
    marginTop: "auto",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  createAccount: {
    textAlign: "center",
    color: "#4a4a4a",
    marginTop: 10,
    fontSize: 14,
  },
  link: {
    color: "#4a90e2",
    fontWeight: "600",
  },
});

export default SignupScreen;
