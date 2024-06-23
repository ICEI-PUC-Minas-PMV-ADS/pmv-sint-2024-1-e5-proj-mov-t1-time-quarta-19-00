import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { createUserMutation } from "@/dataHooks/useUsers";
import { User } from "@/services";
import ErrorMessage from "@/components/ErrorMessage";

type Props = {};

type UserRegisterData = User & {
  cnpj?: string; // Make cnpj optional to handle undefined case
};

const RegisterUser = (props: Props) => {
  const theme = useTheme();
  const [userData, setUserData] = useState({} as UserRegisterData);
  const [error, setError] = useState("");
  const [isInstitution, setIsInstitution] = useState(false);

  const handleData = (key: keyof UserRegisterData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const validate = () => {
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if any required field is empty
    if (
      !userData?.email ||
      !userData?.password ||
      !userData?.name ||
      !userData?.username ||
      (isInstitution && (!userData?.cnpj || !userData?.whatsapp))
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
    if (isInstitution && (userData.cnpj?.length !== 14 || isNaN(Number(userData.cnpj)))) {
      setError("CNPJ deve conter exatamente 14 dígitos numéricos");
      return false;
    }

    return true;
  };

  const { mutateAsync, isPending: isIdle } = createUserMutation();

  const submitData = async () => {
    try {
      await mutateAsync({
        ...userData,
        isInstitution,
        cnpj: isInstitution ? userData.cnpj : undefined,
      });
      router.replace("/login");
    } catch (err) {
      setError("Erro ao cadastrar usuário");
    }
  };

  const doAsInstitution = () => {
    setIsInstitution((current) => !current);
  };

  const doRegister = () => {
    if (!validate()) {
      return;
    }
    submitData();
  };

  const doLogin = () => {
    router.replace("/login");
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        flex: 1,
      }}
    >
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
          {isInstitution && (
            <>
              <TextInput
                disabled={isIdle}
                label="CNPJ"
                value={userData.cnpj}
                onChangeText={(text) => handleData("cnpj", text)}
                keyboardType="numeric"
                maxLength={14}
              />
              <TextInput
                disabled={isIdle}
                label="WhatsApp"
                value={userData.whatsapp}
                onChangeText={(text) => handleData("whatsapp", text)}
              />
            </>
          )}
          <TextInput
            disabled={isIdle}
            label="Senha"
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
          <Button mode="text" onPress={doAsInstitution}>
            {isInstitution
              ? "Cadastrar-se como usuário"
              : "Cadastrar-se como instituição"}
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
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default RegisterUser;
