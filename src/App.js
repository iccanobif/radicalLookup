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
    lastTimestamp: Date.now(),
    lookupRequestsCount: 0
  }

  // It's important to declare functions with this "functionName = () => {...}" syntax
  // as it guarantees that "this" is automatically bound to the main component
  writeLog = (text, showTimeDifferenceFromLastLog) => 
  {
    const logMessage = this.state.lookupRequestsCount + " " +
      (showTimeDifferenceFromLastLog
        ? (Date.now() - this.state.lastTimestamp) / 1000 + " " + text + "...\n" + this.state.log
        : text + "...\n" + this.state.log);

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
    this.setState({ isLoading: true, lookupRequestsCount: this.state.lookupRequestsCount + 1 })
    this.writeLog("updated lookup requests count...", false)
    setTimeout(() =>
    {
      const kanjiFromRadicals = getKanjiFromRadicalNames(text.toLocaleLowerCase().split(","))
      this.writeLog("finished loading " + text + "...", true)
      this.setState({ isLoading: false, lookupRequestsCount: this.state.lookupRequestsCount - 1 })
      if (this.state.lookupRequestsCount == 0) // ?????
      {
        // I start rendering only if during the execusion of getKanjiFromRadicalNames()
        // the user hasn't changed again the input textbox
        setTimeout(() =>
        {
          this.writeLog("finished rendering " + text + "...", true)
          this.setState({
            kanjiRadicalsInputSpecified: text.trim().length > 0,
            kanjiFromRadicals: kanjiFromRadicals
          })
        }, 0)
      }
    }, 100)
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
        {/* {<Text style={{ color: textColor }}>
          {this.state.log}
        </Text>} */}
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
        {/* <KanjiButton kanji={this.props.kanjiFromRadicals[0]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[1]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[2]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[3]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[4]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[5]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[6]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[7]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[8]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[9]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[10]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[11]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[12]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[13]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[14]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[15]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[16]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[17]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[18]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[19]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[20]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[21]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[22]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[23]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[24]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[25]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[26]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[27]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[28]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[29]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[30]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[31]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[32]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[33]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[34]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[35]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[36]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[37]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[38]} />
        <KanjiButton kanji={this.props.kanjiFromRadicals[39]} /> */}
      </View>)
  }
}

class KanjiButton extends Component
{
  render()
  {
    return <TouchableHighlight onPress={() =>
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
