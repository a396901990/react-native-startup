import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export default class HomeTitleButton extends Component {
  static defaultProps = {
    title: ''
  };

  onPress() {
    this.props.navigator.toggleDrawer({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <View style={styles.container}>
          <Image style={styles.button} source={require('../Images/user.png')} />
          {/* <Text style={styles.title_txt}>{this.props.title}</Text> */}
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
    height: 24,
    width: 24
  },
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
