import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { router } from "expo-router";

type Props = {};

interface UserRegisterData {
  email: string;
  password: string;
  name: string;
  username: string;
  cnpj: string;
}

const RegisterInstitution = (props: Props) => {
  const [userData, setUserData] = useState({} as UserRegisterData);
  const [error, setError] = useState("");

  const handleData = (key: keyof UserRegisterData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const validate = () => {
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !userData?.email ||
      !userData?.password ||
      !userData?.name ||
      !userData?.username ||
      !userData?.cnpj
    ) {
      setError("Preencha todos os dados");
      return false;
    }

    // Check for special characters in name and username
    if (specialCharRegex.test(userData.name) || specialCharRegex.test(userData.username)) {
      setError("Nome e nome de usuário não podem conter caracteres especiais");
      return false;
    }

    // Check if email is valid
    if (!emailRegex.test(userData.email)) {
      setError("Email inválido");
      return false;
    }

    // Check if CNPJ contains exactly 14 digits
    if (userData.cnpj.length !== 14 || isNaN(Number(userData.cnpj))) {
      setError("CNPJ deve conter exatamente 14 dígitos numéricos");
      return false;
    }

    return true;
  };

  const doRegister = () => {
    if (!validate()) {
      return;
    }

    console.log("Do Register");
    // Add your registration logic here
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
        <Appbar.BackAction onPress={doLogin} />
        <Appbar.Content title="Cadastrar-se como instituição" />
      </Appbar.Header>
      <View style={style.container}>
        <Text variant="titleMedium">
          Preencha seus dados para fazer seu cadastro
        </Text>
        {error ? <Text style={style.error}>{error}</Text> : null}
        <View style={style.containerForm}>
          <TextInput
            style={style.submitButton}
            label="Name"
            value={userData.name}
            onChangeText={(text) => handleData("name", text)}
          />
          <TextInput
            label="Username"
            value={userData.username}
            onChangeText={(text) => handleData("username", text)}
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
            keyboardType="numeric"
            maxLength={14}
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
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default RegisterInstitution;
