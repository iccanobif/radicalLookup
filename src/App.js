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
  // constructor(props)
  // {
  //   super(props)
  // }

  state = {
    kanjiFromRadicals: [],
    isLoading: false,
    kanjiRadicalsInputSpecified: false,
    log: "",
    lastTimestamp: Date.now()
  }

  writeLog = (text, showTimeDifferenceFromLastLog) => 
  {
    const logMessage = showTimeDifferenceFromLastLog
      ? (Date.now() - this.state.lastTimestamp) / 1000 + " " + text + "...\n" + this.state.log
      : text + "...\n" + this.state.log;

    this.setState({
      log: logMessage,
      lastTimestamp: Date.now()
    })
  }

  onRadicalNamesChanged = (text) =>
  {

    // this onChangeText callback isn't called on every keystroke, if while the user is typing the
    // javascript thread is blocked by some CPU-intensive task, at the end of the operation it'll
    // receive only one ChangeText "event" with the current text.

    // TODO: If it's already loading, put the request on hold
    //       If it's already loading and there's another request on hold, replace the old request with this one
    //       if it's not already loading, load now
    this.writeLog("starting loading " + text + "...", false)
    this.setState({ isLoading: true })
    setTimeout(() =>
    {
      const kanjiFromRadicals = getKanjiFromRadicalNames(text.toLocaleLowerCase().split(","))
      this.writeLog("finished loading " + text + "...", true)
      this.setState({ isLoading: false })
      setTimeout(() =>
      {
        this.writeLog("finished rendering " + text + "...", true)
        this.setState({
          kanjiRadicalsInputSpecified: text.trim().length > 0,
          kanjiFromRadicals: kanjiFromRadicals,
          isLoading: false
        })
      }, 0)
    }, 0)
  }

  render()
  {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={this.onRadicalNamesChanged}></TextInput>
        <Text style={{ color: textColor }}>
          {this.state.isLoading ? "Loading..." : "Ready."}
        </Text>
        <Text style={{ color: textColor }}>
          {
            this.state.kanjiRadicalsInputSpecified
              ? this.state.kanjiFromRadicals.length + " results"
              : "Please type something..."
          }
        </Text>
        {/* <Text style={{ color: textColor }}>
          {this.state.log}
        </Text> */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.state.kanjiFromRadicals.slice(0, 5).map((kanji) =>
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
});
