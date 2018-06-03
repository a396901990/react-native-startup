import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { AppCreators } from '../Redux/AppRedux';
import * as APIService from '../Service/API/APIService';
import AutoEraseDatePicker from './AutoEraseDatePicker';
import color from '../colors';

import moment from 'moment';

// "amount" => 1.5,
//   "arbitror_username" => "FB3D5CDE-86F4-43D9-868C-7341D723CE1D",
//   "description" => "sell me stuff",
//   "receiver_username" => "77CAE105-C1AB-4559-8AD2-B83DC6D3EDE8",
//   "time_to_pay" => 10000
export class CreateContractScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    this.state = {
      form: {
        amount: '',
        arbitror_username: '',
        description: '',
        receiver_username: '',
        time_to_pay: '',
        fee: ''
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
            title: 'Home'
          }
        }
      ]
    };
  };

  _pickDate = () => {
    AutoEraseDatePicker.setSelectValue([null, null, null, null, null], (pickedValue, pickedIndex) => {
      let form = this.state.form;
      form.time_to_pay = pickedValue;
      this.setState({
        form: form
      });
    });
    AutoEraseDatePicker.show();
  };

  handleValueChange(values) {
    this.setState({ form: values });
  }

  _signupAction = () => {};

  render() {
    const { amount, arbitror_username, description, receiver_username, time_to_pay, fee } = this.state.form;

    return (
      <View style={{ flex: 1 }}>
        <GiftedForm
          formName="contractForm"
          clearOnClose={true}
          openModal={route => {}}
          onValueChange={this.handleValueChange.bind(this)}
        >
          <GiftedForm.TextInputWidget
            name="amount"
            title="Amount"
            placeholder="put your amount"
            clearButtonMode="while-editing"
            value={amount}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let username = GiftedFormManager.getValue('contractForm', 'amount');
                if (username) {
                  return username.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />

          <GiftedForm.TextInputWidget
            name="fee"
            title="Fee"
            placeholder="10 - 10000"
            clearButtonMode="while-editing"
            value={fee}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let username = GiftedFormManager.getValue('contractForm', 'fee');
                if (username) {
                  return username.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />

          <GiftedForm.TextInputWidget
            name="arbitror_username"
            title="Arbitror"
            placeholder="put Arbitror Username"
            clearButtonMode="while-editing"
            value={arbitror_username}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let name = GiftedFormManager.getValue('contractForm', 'arbitror_username');
                if (name) {
                  return name.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />
          <GiftedForm.TextInputWidget
            name="receiver_username"
            title="Receiver"
            placeholder="put Receiver Username"
            clearButtonMode="while-editing"
            value={receiver_username}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let name = GiftedFormManager.getValue('contractForm', 'receiver_username');
                if (name) {
                  return name.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />

          <GiftedForm.TextInputWidget
            name="description" // mandatory
            title="Description"
            clearButtonMode="while-editing"
            placeholder="put Description"
            value={description}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                let password = GiftedFormManager.getValue('contractForm', 'description');
                if (password) {
                  return password.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />

          <TouchableOpacity
            style={{ backgroundColor: 'white', width: '100%', padding: 12, flexDirection: 'row' }}
            onPress={() => {
              this._pickDate();
            }}
          >
            <Text style={{}}>Time To Pay</Text>
            <Text style={{ paddingLeft: 20 }}>{time_to_pay}</Text>
          </TouchableOpacity>

          <GiftedForm.SubmitWidget
            title="Create"
            widgetStyles={{
              submitButton: {
                backgroundColor: color.selectPo1
              }
            }}
            onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
              try {
                let second =
                  parseInt(time_to_pay[4]) * 60 +
                  parseInt(time_to_pay[2]) * 60 * 60 +
                  parseInt(time_to_pay[0]) * 60 * 60 * 24;
                let form = this.state.form;
                form.time_to_pay = second;

                // alert(JSON.stringify(form));
                APIService.createTransaction(form)
                  .then(result => {
                    postSubmit();
                    this.props.dispatch(AppCreators.fetchTransaction());
                    this.props.navigator.pop({
                      animated: true,
                      animationType: 'fade'
                    });
                  })
                  .catch(e => {
                    alert('ERROR');
                    postSubmit(['An error occurred, please try again']);
                  });
              } catch (e) {}
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

export default connect(mapStateToProps)(CreateContractScreen);
