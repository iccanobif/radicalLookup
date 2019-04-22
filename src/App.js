import React, { Component } from 'react'
import
{
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native'
import { getKanjiFromRadicalNames } from "./kanjiLookup/kanjilookup.js"

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = { kanjiFromRadicals: [] }
  }
  render()
  {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={(text =>
          {
            this.setState({
              kanjiFromRadicals:
                getKanjiFromRadicalNames(text.toLocaleLowerCase().split(","))
            })
          })}></TextInput>
        <Text style={{ color: textColor }}>{this.state.kanjiFromRadicals.length}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.state.kanjiFromRadicals.slice(0, 100).map((kanji) =>
          {
            return (
              <TouchableHighlight key={kanji} onPress={() =>
              {
                alert(kanji)
              }}>
                <View style={{ padding: 10 }}>
                  <Text style={{ color: textColor, fontSize: 30 }} >
                    {kanji}
                  </Text>
                </View>
              </TouchableHighlight>)
          })}
        </View>

      </View>
    );
  }
}
const textColor = "black";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#fff3dd",
    padding: 20
  },
  textInput: {
    color: textColor,
    borderColor: "#aa6e00",
    borderWidth: 3,
    fontSize: 30
  }
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
