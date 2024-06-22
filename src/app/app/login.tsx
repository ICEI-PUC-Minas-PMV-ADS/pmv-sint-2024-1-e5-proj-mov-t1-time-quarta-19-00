import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Appbar, Text, Button, TextInput } from "react-native-paper";
import { router } from "expo-router";
import ErrorMessage from "@/components/ErrorMessage";
import { userAuthMutation } from "@/dataHooks/useUsers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/features/userSlice";
import { RootState } from "@/store/store";

type Props = {};

interface UserLoginData {
  username: string;
  password: string;
}

const Login = (props: Props) => {
  const [userData, setUserData] = React.useState({} as UserLoginData);
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (loggedIn) {
      router.replace("/");
    }
  }, [loggedIn]);

  const updateUserData = (key: keyof UserLoginData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const [error, setError] = React.useState("");
  const { mutateAsync } = userAuthMutation();

  const doLogin = async () => {
    try {
      if (
        userData?.username === "" ||
        userData?.password === "" ||
        Object.keys(userData).length === 0
      ) {
        setError("Preencha todos os dados");
        return;
      }

      const data = await mutateAsync(userData);

      dispatch(
        login({
          access_token: data.access_token,
          username: userData.username,
          userId: data.userId,
          name: data.name,
          email: data.email,
        })
      );

      router.replace("/");
    } catch (err) {
      setError("Erro ao logar");
    }
  };

  const doRegister = () => {
    router.replace("/registerUser");
  };

  const goToFeed = () => {
    router.replace("/feed");
  };

  return (
    <View style={style.loginContainer}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToFeed} />
        <Appbar.Content title="Entrar" />
      </Appbar.Header>
      <View style={style.container}>
        <View style={style.containerForm}>
          <ErrorMessage error={error} />
          <Text variant="titleMedium">Preencha seus dados para entrar</Text>
          <TextInput
            label="Username"
            value={userData.username}
            onChangeText={(text) => updateUserData("username", text)}
          />
          <TextInput
            label="Senha"
            secureTextEntry
            value={userData.password}
            onChangeText={(text) => updateUserData("password", text)}
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
  loginContainer: {
    backgroundColor: "#fff",
    flex: 1,
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
