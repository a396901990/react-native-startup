// Libraries
import React, { Component } from 'react';

// UI Elements
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Constants
import colors from '../colors';

/* ------------- Component ------------- */
export default class InputView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.inputText}
            placeholder={this.props.placeholder}
            onChangeText={text => {
              this.text = text;
            }}
            underlineColorAndroid={colors.transparent}
            multiline={true}
            onFocus={() => {
              this.props.onFocus && this.props.onFocus();
            }}
            onChange={() => {}}
          />
          <TouchableOpacity
            style={styles.create_btn}
            onPress={() => {
              this.props.onSend && this.props.onSend(this.text);
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', alignItems: 'center' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/* ------------- Styles ------------- */

const styles = StyleSheet.create({
  create_btn: {
    flexDirection: 'row',
    width: 80,
    backgroundColor: colors.selectPo1,
    height: 33,
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    backgroundColor: colors.selectB3,
    borderTopColor: colors.selectN4,
    paddingLeft: 3,
    paddingRight: 3,
    borderTopWidth: 1
  },
  innerContainer: {
    maxHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6
  },
  container: {
    backgroundColor: colors.transparent,
    paddingTop: 3,
    paddingBottom: 3
  },
  textInput: {
    flex: 1,
    color: colors.selectP3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 6,
    paddingBottom: 6
  },
  inputText: {
    flex: 1,
    color: colors.selectP3,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingTop: 6,
    marginTop: 3,
    marginBottom: 3,
    borderColor: colors.selectG80,
    borderWidth: 1,
    borderRadius: 15
  },
  underline: {
    height: 1,
    backgroundColor: colors.selectN3
  }
});
