import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { AppCreators } from '../Redux/AppRedux';
import colors from '../colors';
import TransactionCard from './TransactionCard';
import * as APIService from '../Service/API/APIService';
import config from '../config';

export class HomeScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    this.state = {
      transaction: []
    };
  }

  navigatorButtons = navigator => {
    return {
      leftButtons: [
        {
          component: 'HomeTitleButton',
          id: 'title',
          passProps: {
            navigator,
            title: 'Hi Dean'
          }
        }
      ],
      rightButtons: [
        {
          component: 'CreateButton',
          id: 'title',
          passProps: {
            navigator,
            title: 'Back'
          }
        }
      ]
    };
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.dispatch(AppCreators.fetchTransaction());
    }, config.INTERVAL_TIME);

    this.props.dispatch(AppCreators.fetchTransaction());
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  _goToCreateEscrow = () => {
    this.props.navigator.push({
      screen: 'CreateEscrow',
      navigatorStyle: {
        navBarHidden: false,
        tabBarHidden: true,
        navBarTransparent: true
      },
      animated: true,
      animationType: 'fade'
    });
  };

  _renderItem = ({ item }) => {
    return (
      <TransactionCard
        {...item}
        onPress={() => {
          this.props.navigator.push({
            screen: 'TransactionScreen',
            passProps: {
              transactionID: item.id
            },
            navigatorStyle: {
              navBarHidden: false,
              tabBarHidden: true,
              navBarTransparent: true
            },
            animated: true,
            animationType: 'fade'
          });
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.selectB2 }}>
        {/* <TouchableOpacity onPress={this._goToCreateEscrow}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.dispatch(AppCreators.logout());
          }}
        >
          <Text>logout</Text>
        </TouchableOpacity> */}
        <FlatList
          style={{
            flex: 1
          }}
          data={this.props.transaction}
          keyExtractor={(item, index) => item.key}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    transaction: state.App.transaction,
    web3: state.Web3
  };
};

export default connect(mapStateToProps)(HomeScreen);
