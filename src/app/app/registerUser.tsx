import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { router } from "expo-router";
import { createUserMutation } from "@/dataHooks/useUsers";
import { User } from "@/services";
import ErrorMessage from "@/components/ErrorMessage";

type Props = {};

type UserRegisterData = User;

const RegisterUser = (props: Props) => {
  const [userData, setUserData] = useState({} as UserRegisterData);
  const [error, setError] = useState("");

  const handleData = (key: keyof UserRegisterData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  /**
   * Verifica se todos os itens não estão vazios no userData,
   * caso esteja, retorna um erro
   */
  const validate = () => {
    // se o objeto estiver vazio, retorna um erro
    if (Object.keys(userData).length === 0) {
      setError("Preencha todos os dados");
      return false;
    }

    // estrutura do objeto fim
    if (
      userData?.email === "" ||
      userData?.password === "" ||
      userData?.name === "" ||
      userData?.username === ""
    ) {
      setError("Preencha todos os dados");
    }

    if (Object.values(userData).some((value) => value === "")) {
      setError("Preencha todos os dados");
      return false;
    }

    return true;
  };

  const { mutateAsync, isPending: isIdle } = createUserMutation();

  const submitData = async () => {
    try {
      await mutateAsync(userData);
      router.replace("/login");
    } catch (err) {
      setError("Erro ao cadastrar usuário");
    }
  };

  const doRegister = () => {
    if (!validate()) {
      return;
    }
    submitData();
  };

  const doRegisterInstitution = () => {
    router.replace("/registerInstitution");
  };

  const doLogin = () => {
    router.replace("/login");
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={doLogin} />
        <Appbar.Content title="Cadastrar-se" />
      </Appbar.Header>
      <View style={style.container}>
        <Text variant="titleMedium">
          Preencha seus dados para fazer seu cadastro
        </Text>
        <ErrorMessage error={error} />
        <View style={style.containerForm}>
          <TextInput
            disabled={isIdle}
            style={style.submitButton}
            label="Name"
            value={userData.name}
            onChangeText={(text) => handleData("name", text)}
          />
          <TextInput
            disabled={isIdle}
            label="Email"
            value={userData.email}
            onChangeText={(text) => handleData("email", text)}
          />
          <TextInput
            disabled={isIdle}
            label="Nome de Usuário"
            value={userData.username}
            onChangeText={(text) => handleData("username", text)}
          />
          <TextInput
            disabled={isIdle}
            label="Password"
            secureTextEntry
            value={userData.password}
            onChangeText={(text) => handleData("password", text)}
          />
          <Button
            disabled={isIdle}
            style={style.submitButton}
            icon="login"
            mode="contained"
            onPress={doRegister}
          >
            Cadastrar-se
          </Button>
          <Button mode="text" onPress={doRegisterInstitution}>
            Cadastrar-se como uma instituição
          </Button>
          <Button mode="text" onPress={doLogin}>
            Fazer login
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

export default RegisterUser;
