import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { AppCreators } from '../Redux/AppRedux';
import { Web3Creators } from '../Redux/Web3Redux';

export class WelcomeScreen extends Component {
  async componentDidMount() {
    await this.props.dispatch(Web3Creators.setWeb3Provider({ provider: 'http://13.230.241.186:8545' }));
  }

  static navigatorStyle = {
    navBarHidden: true
  };

  _login = () => {
    this.props.navigator.push({
      screen: 'LoginScreen',
      navigatorStyle: {
        navBarHidden: false,
        tabBarHidden: true,
        navBarTransparent: true
      },
      animated: true,
      animationType: 'fade'
    });
  };

  _signup = () => {
    this.props.navigator.push({
      screen: 'SignupScreen',
      navigatorStyle: {
        navBarHidden: false,
        tabBarHidden: true,
        navBarTransparent: true
      },
      animated: true,
      animationType: 'fade'
    });
  };

  render() {
    return (
      <View>
        <Image
          source={require('../Images/logo.png')}
          style={{
            width: 130,
            height: 130,
            alignSelf: 'center',
            marginTop: 80
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 40,
            marginVertical: 20
          }}
        >
          Trust Chain
        </Text>
        <TouchableOpacity
          style={{ width: '100%', height: 50, justifyContent: 'center', marginTop: 120 }}
          onPress={this._login}
        >
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center' }} onPress={this._signup}>
          <Text style={{ justifyContent: 'center', textAlign: 'center' }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null)(WelcomeScreen);
