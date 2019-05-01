import React, { Component } from 'react'
import
{
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Clipboard,
  Dimensions
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
  calculateKanjiPerRow = () =>
  {
    console.log("calculating kanji")
    const containerWidth = Dimensions.get("window").width - styles.container.padding * 2
    return Math.floor(containerWidth / kanjiButtonSize)
  }

  state = {
    collapsed: true,
    numberOfKanjiPerRow: this.calculateKanjiPerRow()
  }

  render()
  {
    if (this.props.kanjiFromRadicals.length == 0)
      return null

    return <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        borderWidth: 3,
        borderColor: bordersColor
      }}
      onLayout={(e) =>
      {
        this.setState({ numberOfKanjiPerRow: this.calculateKanjiPerRow() })
      }} >
      {
        this.props.kanjiFromRadicals.slice(0, this.state.numberOfKanjiPerRow).map((kanji, index) =>
        {
          return <KanjiButton kanji={kanji} key={index}></KanjiButton>
        })
      }
    </View>
  }
}

class KanjiButton extends Component
{
  render()
  {
    return <TouchableHighlight
      style={{ width: kanjiButtonSize, height: kanjiButtonSize }}
      onPress={() =>
      {
        Clipboard.setString(this.props.kanji)
        // TODO On IOS this should use alert() or some other alternative
        Toast.show("Copied " + this.props.kanji + " to clipboard.", Toast.SHORT);
      }}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: textColor, fontSize: 30 }} >
          {this.props.kanji}
        </Text>
      </View>
    </TouchableHighlight>
  }
}


const textColor = "black"
const bordersColor = "#aa6e00"
const kanjiButtonSize = 50

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
    borderColor: bordersColor,
    borderWidth: 3,
    fontSize: 30
  }
});
