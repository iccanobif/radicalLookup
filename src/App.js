import React, { Component } from 'react'
import
{
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Clipboard
} from 'react-native'
import { getKanjiFromRadicalNames } from "./kanjiLookup/kanjilookup.js"
import Toast from "./Toast.js"

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      kanjiFromRadicals: [],
      isLoading: false,
      kanjiRadicalsInputSpecified: false
    }
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
            // TODO: If it's already loading, put the request on hold
            //       If it's already loading and there's another request on hold, replace the old request with this one
            //       if it's not already loading, load now
            this.setState({ isLoading: true })
            setTimeout(() =>
            {
              this.setState({
                kanjiRadicalsInputSpecified: text.trim().length > 0,
                kanjiFromRadicals:
                  getKanjiFromRadicalNames(text.toLocaleLowerCase().split(",")),
                isLoading: false
              })
            }, 0)
          })}></TextInput>
        <Text style={{ color: textColor }}>
          {this.state.isLoading ? "Loading..." : "Ready."}
        </Text>
        <Text style={{ color: textColor }}>
          {
            this.state.kanjiRadicalsInputSpecified
              ? this.state.kanjiFromRadicals.length + " results"
              : "Please type something..."
          } </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.state.kanjiFromRadicals.slice(0, 100).map((kanji) =>
          {
            return (
              <TouchableHighlight key={kanji} onPress={() =>
              {
                Clipboard.setString(kanji)
                // TODO On IOS this should use alert() or some other alternative
                Toast.show("Copied " + kanji + " to clipboard.", Toast.SHORT);
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
