import { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";

const sendText = async (phoneNumber) => {
  // using fetch do a POST to https://dev.stedi.me/twofactorlogin
  const loginResponse = await fetch(
    "https://dev.stedi.me/twofactorlogin/" + phoneNumber,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/text",
      },
    }
  );

  const loginResponseText = await loginResponse.text(); //converts the promist to a string by using await
  console.log("Login Response", loginResponseText);
};

const getToken = async ({ phoneNumber, oneTimePassword, setUserLoggedIn }) => {
  //THIS CODE IS NOT COMPLETE JUST SHOWING HOW TO A POST WITH A BODY
  // console.log("PhoneNumber", phoneNumber);
  // console.log("OTP", oneTimePassword);
  const loginResponse = await fetch("https://dev.stedi.me/twofactorlogin", {
    method: "POST",
    body: JSON.stringify({ oneTimePassword, phoneNumber }),
    headers: {
      "content-type": "application/json",
    },
    // body: {
    //   phoneNumber,
    //   oneTimePassword
    // },
  });
  const responseCode = loginResponse.status;
  if (responseCode == 200) {
    setUserLoggedIn(true);
  }

  // const loginResponse = await fetch("https://dev.stedi.me/twofactorlogin/", {
  //   method: "POST",
  //   body:JSON.sstringify({oneTimePassword, phoneNumber}),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   // body: {
  //   //   phoneNumber,
  //   //   oneTimePassword
  //   // },
  // });
  const token = await loginResponse.text();
  console.log(token);
};

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor="grey"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          sendText(phoneNumber);
        }}
      >
        <Text>Get OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getToken({
            phoneNumber,
            oneTimePassword,
            setUserLoggedIn: props.setUserLoggedIn,
          });
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  margin: {
    marginTop: 100,
  },
  button: {
    alignItems: "center",
    width: 100,
    margin: 10,
    borderwidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#DDDD",
    alignSelf: "center",
  },
});

export default Login;
