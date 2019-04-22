import React, { Component } from 'react'
import
{
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList
} from 'react-native'
import { getKanjiFromRadicalNames } from "./kanjiLookup/kanjilookup.js"

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      kanjiFromRadicals: [],
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
            this.setState({
              kanjiRadicalsInputSpecified: text.trim().length > 0,
              kanjiFromRadicals:
                getKanjiFromRadicalNames(text.toLocaleLowerCase().split(","))
                  .map(kanji =>
                  {
                    return {
                      key: kanji
                    }
                  })
            })
          })} />
        <Text style={{ color: textColor }}>
          {
            this.state.kanjiRadicalsInputSpecified
              ? this.state.kanjiFromRadicals.length + " results"
              : "Please type something..."
          }
        </Text>
        <FlatList
          data={this.state.kanjiFromRadicals}
          renderItem={({ item }) =>
            <Text style={{ color: textColor, fontSize: 30 }}>
              {item.key}
            </Text>}
        />
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
