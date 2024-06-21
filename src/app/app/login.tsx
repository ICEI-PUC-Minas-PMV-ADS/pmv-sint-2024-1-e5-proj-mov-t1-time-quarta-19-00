import { View, StyleSheet } from "react-native";
import React from "react";
import { Appbar, Text, Button, TextInput } from "react-native-paper";
import { router } from "expo-router";

type Props = {};

interface UserLoginData {
  email: string;
  senha: string;
}

const Login = (props: Props) => {
  const [userData, setUserData] = React.useState({} as UserLoginData);

  const updateUserData = (key: keyof UserLoginData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const doLogin = () => {
    console.log("Do Login");
  };

  const doRegister = () => {
    router.replace("/registerUser");
  };

  return (
    <View>
      <Appbar.Header>
        {/* <Appbar.BackAction /> */}
        <Appbar.Content title="Entrar" />
      </Appbar.Header>
      <View style={style.container}>
        <View style={style.containerForm}>
          <Text variant="titleMedium">Preencha seus dados para entrar</Text>
          <TextInput
            label="Email"
            value={userData.email}
            onChangeText={(text) => updateUserData("email", text)}
          />
          <TextInput
            label="Senha"
            secureTextEntry
            value={userData.senha}
            onChangeText={(text) => updateUserData("senha", text)}
          />
          <Button
            style={style.buttonSubmit}
            icon="login"
            mode="contained"
            onPress={doLogin}
          >
            Entrar
          </Button>
          <Button mode="text" onPress={doRegister}>
            Cadastrar-se
          </Button>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 16,
  },
  containerForm: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  buttonSubmit: {
    marginTop: 16,
  },
});

export default Login;
