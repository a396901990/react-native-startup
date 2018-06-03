import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { AppCreators } from '../Redux/AppRedux';
import * as APIService from '../Service/API/APIService';
import color from '../colors';
export class LoginScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    this.state = {
      form: {
        username: '',
        name: '',
        password: ''
      }
    };
  }

  navigatorButtons = navigator => {
    return {
      leftButtons: [
        {
          component: 'BackTitleButton',
          id: 'title',
          passProps: {
            navigator,
            title: 'Back'
          }
        }
      ]
    };
  };

  handleValueChange(values) {
    this.setState({ form: values });
  }

  _loginAction = () => {
    // get user info from server
    this.props.dispatch(AppCreators.login());
  };

  render() {
    const { username, name, password } = this.state.form;

    return (
      <View style={{ flex: 1 }}>
        <GiftedForm formName="signupForm" openModal={route => {}} onValueChange={this.handleValueChange.bind(this)}>
          <GiftedForm.TextInputWidget
            name="username"
            title="User Name"
            placeholder="put your user name"
            clearButtonMode="while-editing"
            value={username}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let username = GiftedFormManager.getValue('signupForm', 'username');
                if (username) {
                  return username.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />
          <GiftedForm.TextInputWidget
            name="password" // mandatory
            title="Password"
            placeholder="******"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let password = GiftedFormManager.getValue('signupForm', 'password');
                if (password) {
                  return password.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />
          <GiftedForm.SubmitWidget
            title="Login"
            widgetStyles={{
              submitButton: {
                backgroundColor: color.selectPo1
              }
            }}
            onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
              APIService.login(this.state.form)
                .then(result => {
                  this.props.dispatch(AppCreators.login(result));
                })
                .catch(e => {
                  postSubmit(['An error occurred, please try again']);
                });
            }}
          />
        </GiftedForm>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(LoginScreen);
