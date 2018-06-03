import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Avatar from 'react-native-badge-avatar';
import PropTypes from 'prop-types';
import colors from '../colors';
export default class TransactionCard extends Component {
  static defaultProps = {
    time_to_pay: 0,
    status: 0,
    receiver: { name: '' },
    payer: { name: '' },
    arbitror: { name: '' },
    fee: 0,
    description: '',
    amount: 0,
    receiver_approval: false,
    arbitror_approval: false,
    onPress: () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {
      time_to_pay,
      status,
      receiver,
      payer,
      arbitror,
      fee,
      description,
      amount,
      receiver_approval,
      arbitror_approval,
      payer_confirm,
      receiver_confirm
    } = this.props;

    // avatar logic: avatar pic not null, will display pic not display name!
    // payer
    let payerAvatarPic;
    if (payer_confirm) {
      payerAvatarPic = require('../Images/check.png');
    }

    // // receiver avatar
    let receiverAvatarPic;
    if (receiver_confirm) {
      receiverAvatarPic = require('../Images/check.png');
    }

    // // arbitror avatar
    let arbitrorAvatarPic;
    // if (payer_confirm) {
    //   arbitrorAvatarPic = require("../Images/check.png");
    // }

    let statusBG;
    switch (status) {
      case -1:
        statusBG = colors.selectA5;
        status = 'CANCEL';
        break;
      case 0:
        statusBG = colors.selectA1;
        status = 'PENDING';
        break;
      case 1:
        statusBG = colors.selectA2;
        status = 'ACTIVE';
        break;
      case 2:
        statusBG = colors.selectA3;
        status = 'DISPUTE';
        break;
      case 3:
        statusBG = colors.selectA4;
        status = 'SUCCESS';
        break;
      case 4:
        statusBG = colors.selectA6;
        status = 'RESOLVE';
        break;
    }

    fee = Math.round(parseFloat(fee)) / 100 + '%';

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 6,
          marginLeft: 6,
          marginRight: 6,
          padding: 8
        }}
        onPress={this.props.onPress}
      >
        {/* header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              size={32}
              name={payerAvatarPic ? null : payer.name}
              borderColor={colors.selectA1}
              borderWidth={3}
              placeholder={payerAvatarPic}
              style={{ justifyContent: 'center' }}
            />
            <View style={{}}>
              <Text style={{ paddingLeft: 4, fontSize: 18 }}>{payer.name}</Text>
              <Text style={{ paddingLeft: 4, color: 'gray' }}>{'Payer'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              size={32}
              name={receiverAvatarPic ? null : receiver.name}
              borderColor={receiver_approval ? colors.selectA1 : colors.selectA5}
              borderWidth={3}
              placeholder={receiverAvatarPic}
              style={{ justifyContent: 'center' }}
            />
            <View style={{}}>
              <Text style={{ paddingLeft: 4, fontSize: 18 }}>{receiver.name}</Text>
              <Text style={{ paddingLeft: 4, color: 'gray' }}>{'Receiver'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              size={32}
              name={arbitrorAvatarPic ? null : arbitror.name}
              borderColor={arbitror_approval ? colors.selectA1 : colors.selectA5}
              borderWidth={3}
              placeholder={arbitrorAvatarPic}
              style={{ justifyContent: 'center' }}
            />
            <View style={{}}>
              <Text style={{ paddingLeft: 4, fontSize: 18 }}>{arbitror.name}</Text>
              <Text style={{ paddingLeft: 4, color: 'gray' }}>{'Arbitror'}</Text>
            </View>
          </View>
        </View>

        {/* detail */}
        <View style={{ padding: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* left detail */}
            <View>
              <Text style={{ fontSize: 18, color: 'gray' }}>{description}</Text>
              <View style={{ flexDirection: 'row', paddingTop: 6 }}>
                <Text>{'ETH: ' + amount}</Text>
                <Text style={{ paddingLeft: 20 }}>{'Fee: ' + fee}</Text>
              </View>
            </View>

            {/* status */}
            <View
              style={{
                padding: 6,
                borderRadius: 4,
                backgroundColor: statusBG,
                alignSelf: 'center'
              }}
            >
              <Text style={{ color: 'white' }}>{status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
