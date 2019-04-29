import React, { Component } from 'react'
import
{
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Clipboard,
  InteractionManager
} from 'react-native'
import { getKanjiFromRadicalNames } from "./kanjiLookup/kanjilookup.js"
import Toast from "./Toast.js"

const enableLog = false

export default class App extends Component
{
  constructor(props)
  {
    super(props)

    setInterval(() =>
    {
      if (this.state.currentRadicalInput == this.state.lastRadicalInputSearched)
        return

      this.setState((state) => ({
        isKanjiRadicalsInputSpecified: state.currentRadicalInput.trim().length > 0,
        kanjiFromRadicals: getKanjiFromRadicalNames(state.currentRadicalInput.toLocaleLowerCase().split(",")),
        lastRadicalInputSearched: state.currentRadicalInput
      }))
    }, 300)
  }

  state = {
    kanjiFromRadicals: [],
    isKanjiRadicalsInputSpecified: false,
    log: "",
    lastTimestamp: Date.now(),
    currentRadicalInput: "",
    lastRadicalInputSearched: "",
  }

  // It's important to declare functions with this "functionName = () => {...}" syntax
  // as it guarantees that "this" is automatically bound to the main component
  writeLog = (text, showTimeDifferenceFromLastLog) => 
  {
    if (!enableLog) return

    const logMessage = (showTimeDifferenceFromLastLog
      ? (Date.now() - this.state.lastTimestamp) / 1000 + " " + text + "...\n" + this.state.log
      : text + "...\n" + this.state.log);

    this.setState({
      log: logMessage,
      lastTimestamp: Date.now()
    })
  }

  onRadicalNamesChanged = (text) =>
  {
    this.setState({ currentRadicalInput: text })
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
          {
            this.state.isKanjiRadicalsInputSpecified
              ? this.state.kanjiFromRadicals.length + " results"
              : "Please type something..."
          }
        </Text>
        {<Text style={{ color: textColor }}>
          {this.state.log}
        </Text>}
        <KanjiGrid kanjiFromRadicals={this.state.kanjiFromRadicals} />
      </View>
    );
  }
}

class KanjiGrid extends Component
{
  render()
  {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {
          this.props.kanjiFromRadicals.slice(0, 50).map((kanji, index) =>
          {
            return <KanjiButton kanji={kanji} key={index}></KanjiButton>
          })
        }
      </View>)
  }
}

class KanjiButton extends Component
{
  render()
  {
    return <TouchableHighlight
      style={{ width: 50, height: 50 }}
      onPress={() =>
      {
        Clipboard.setString(this.props.kanji)
        // TODO On IOS this should use alert() or some other alternative
        Toast.show("Copied " + this.props.kanji + " to clipboard.", Toast.SHORT);
      }}>
      <View style={{ padding: 10, width: 50, height: 50 }}>
        <Text style={{ color: textColor, fontSize: 30 }} >
          {this.props.kanji}
        </Text>
      </View>
    </TouchableHighlight>
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
