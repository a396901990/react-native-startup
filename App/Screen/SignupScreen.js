import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { AppCreators } from '../Redux/AppRedux';
import * as APIService from '../Service/API/APIService';
import { Web3Creators } from '../Redux/Web3Redux';
import color from '../colors';

export class SignupScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    this.state = {
      form: {
        username: '',
        name: '',
        password: '',
        public_key: ''
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

  async componentDidMount() {
    await this.props.dispatch(Web3Creators.createPublicKey({ provider: 'http://13.230.241.186:4000' }));
    await this.setState({
      form: {
        ...this.state.form,
        public_key: this.props.web3.public_key
      }
    });
  }

  handleValueChange(values) {
    this.setState({ form: values });
  }

  _signupAction = () => {};

  render() {
    const { username, name, password } = this.state.form;

    console.tron.display({
      name: 'sign up page state',
      value: this.state
    });

    return (
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
          name="name"
          title="Name"
          placeholder="put your name"
          clearButtonMode="while-editing"
          value={name}
          onTextInputFocus={(currentText = '') => {
            if (!currentText) {
              let name = GiftedFormManager.getValue('signupForm', 'name');
              if (name) {
                return name.replace(/[^a-zA-Z0-9-_]/g, '');
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
          title="Sign up"
          widgetStyles={{
            submitButton: {
              backgroundColor: color.selectPo1
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            APIService.signup({ ...this.state.form, public_key: this.props.web3.public_key })
              .then(result => {
                this.props.dispatch(AppCreators.signup(result));
              })
              .catch(e => {
                alert('ERROR');
                postSubmit(['An error occurred, please try again']);
              });
          }}
        />
      </GiftedForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.Web3
  };
};

export default connect(mapStateToProps)(SignupScreen);
