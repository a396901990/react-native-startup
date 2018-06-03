import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import color from '../colors';

export default class CreateButton extends Component {
  static defaultProps = {
    title: ''
  };

  onPress() {
    this.props.navigator.push({
      screen: 'CreateContractScreen',
      navigatorStyle: {
        navBarHidden: false,
        tabBarHidden: true,
        navBarTransparent: true
      },
      animated: true,
      animationType: 'fade'
    });
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.create_btn}
        onPress={() => {
          this.onPress();
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', alignItems: 'center' }}>Create</Text>
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
  create_btn: {
    flexDirection: 'row',
    width: 80,
    backgroundColor: color.selectPo1,
    height: 33,
    borderRadius: 20,
    padding: 8,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
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
