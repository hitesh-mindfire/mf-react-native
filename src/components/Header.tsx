import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
    textAlign: "center",
  },
});

export default Header;
