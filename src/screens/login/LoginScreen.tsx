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

const LoginScreen: React.FC<StackScreenProps<"Login">> = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignIn = (
    values: { email: string; password: string },
    { resetForm }: FormikHelpers<{ email: string; password: string }>
  ) => {
    Alert.alert(
      "Login Successful",
      `Welcome!\nEmail: ${values.email}\nPassword: ${values.password}`,
      [
        {
          text: "OK",
          onPress: () => resetForm(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Welcome Back!" subtitle="Sign in to continue" />
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSignIn(values, actions)}
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
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
              </TouchableOpacity>
              <View style={styles.bottomContainer}>
                <Button
                  title="Sign In"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.createAccount}>
                    Don’t have an account?{" "}
                    <Text style={styles.link}>Create</Text>
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
  forgotPassword: {
    textAlign: "right",
    color: "#4a90e2",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 10,
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

export default LoginScreen;
