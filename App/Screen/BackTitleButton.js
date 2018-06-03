import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export default class BackTitleButton extends Component {
  static defaultProps = {
    title: ''
  };

  onPress() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <View style={styles.container}>
          <Image style={styles.button} source={require('../Images/back.png')} />
          <Text style={styles.title_txt}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title_txt: {
    paddingLeft: 8,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18
  },
  button: {
    overflow: 'hidden',
    height: 14,
    width: 14
  },
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
