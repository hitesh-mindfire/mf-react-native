import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { StackScreenProps } from "@/src/navigation";
import Header from "@/src/components/Header";
import InputField from "@/src/components/InputField";
import Button from "@/src/components/Button";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const ForgotPasswordScreen: FC<StackScreenProps<"ForgotPassword">> = ({
  navigation,
}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleForgotPassword = (
    values: { email: string },
    { resetForm }: FormikHelpers<{ email: string }>
  ) => {
    Alert.alert(
      "Password Reset",
      `A password reset link has been sent to ${values.email}.`,
      [
        {
          text: "OK",
          onPress: () => {
            resetForm();
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
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
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
                value={values.email}
                inputMode="email"
                errorMessage={touched.email && errors.email ? errors.email : ""}
              />
              <View style={styles.bottomContainer}>
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.backToLogin}>Back to Login</Text>
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
