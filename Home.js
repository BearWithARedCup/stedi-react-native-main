import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import Icons from "./Icons.js";
import Bar from "./Bar.js";

const getEmail = async (props) => {
  email = await fetch('https://dev.stedi.me/validate'+props.getUserLoggedIn)
  return email
}

const Home = (props) => {
  return (
    <View>
      <Bar loggedInUser={getEmail(props)} />

      <Icons />
    </View>
  );
};

export default Home;
