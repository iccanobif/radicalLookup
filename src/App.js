import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { getKanjiFromRadicalNames } from "./kanjiLookup/kanjilookup.js"

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = { kanjiFromRadicals: "" }
  }
  render()
  {
    return (
      <View style={styles.container}>
        <TextInput
          style={{color: "red", borderColor: "white", borderWidth: 3}}
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={(text =>
          {
            this.setState({
              kanjiFromRadicals:
                this.state.radicalsToSearch == ""
                  ? ""
                  : getKanjiFromRadicalNames(text.toLocaleLowerCase().split(","))
                    .join(",")
                    .substr(0, 200)
            })
          })}></TextInput>
        <Text style={{color: "red"}}>{this.state.kanjiFromRadicals.length}</Text>
        <Text style={{color: "red", fontSize: 30}}>
          {this.state.kanjiFromRadicals}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#000000",
    padding: 20
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
