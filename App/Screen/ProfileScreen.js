import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import color from '../colors';
import { connect } from 'react-redux';
import { AppCreators } from '../Redux/AppRedux';
import Avatar from 'react-native-badge-avatar';

class ProfileScreen extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 60 }}>
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <Avatar size={68} name={userInfo.name} style={{ justifyContent: 'center', alignSelf: 'center' }} />
          <Text style={{ paddingLeft: 4, fontSize: 22, paddingTop: 10, justifyContent: 'center', alignSelf: 'center' }}>
            {userInfo.name}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.create_btn}
          onPress={() => {
            this.props.dispatch(AppCreators.logout());
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', alignItems: 'center' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.App.userInfo
  };
};

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  create_btn: {
    marginBottom: 40,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: color.selectA5,
    height: 33,
    borderRadius: 20,
    padding: 8,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
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
