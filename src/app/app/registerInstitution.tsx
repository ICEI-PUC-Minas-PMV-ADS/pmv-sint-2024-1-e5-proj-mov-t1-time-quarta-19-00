import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { router } from "expo-router";

type Props = {};

interface UserRegisterData {
  email: string;
  password: string;
  name: string;
  cnpj: string;
}

const RegisterInstitution = (props: Props) => {
  const [userData, setUserData] = useState({} as UserRegisterData);

  const handleData = (key: keyof UserRegisterData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const doRegister = () => {
    console.log("Do Register");
  };

  const doRegisterUser = () => {
    router.replace("/registerUser");
  };

  const doLogin = () => {
    router.replace("/login");
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Cadastrar-se como instituição" />
      </Appbar.Header>
      <View style={style.container}>
        <Text variant="titleMedium">
          Preencha seus dados para fazer seu cadastro
        </Text>
        <View style={style.containerForm}>
          <TextInput
            style={style.submitButton}
            label="Name"
            value={userData.name}
            onChangeText={(text) => handleData("name", text)}
          />
          <TextInput
            label="Email"
            value={userData.email}
            onChangeText={(text) => handleData("email", text)}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={userData.password}
            onChangeText={(text) => handleData("password", text)}
          />
          <TextInput
            label="CNPJ"
            value={userData.cnpj}
            onChangeText={(text) => handleData("cnpj", text)}
          />
          <Button
            style={style.submitButton}
            icon="login"
            mode="contained"
            onPress={doRegister}
          >
            Cadastrar-se
          </Button>
          <Button mode="text" onPress={doRegisterUser}>
            Cadastrar-se como pessoa
          </Button>
          <Button mode="text" onPress={doLogin}>
            Fazer Login
          </Button>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  container: {
    padding: 16,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default RegisterInstitution;
