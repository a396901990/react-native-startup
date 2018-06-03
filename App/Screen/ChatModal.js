// Libraries
import React, { Component } from 'react';

// UI Elements
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  Animated,
  Modal
} from 'react-native';

import Avatar from 'react-native-badge-avatar';
import colors from '../colors';
import InputView from './InputView';
import * as APIService from '../Service/API/APIService';
import config from '../config';
/* ------------- Component ------------- */

export default class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      visible: false
    };
  }

  _getMessage = () => {
    APIService.getTransactionMessages(this.props.transactionId)
      .then(response => {
        this.setState({
          message: response
        });
      })
      .catch(e => {});
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this._getMessage();
    }, config.INTERVAL_TIME);
    this._getMessage();
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  show() {
    this.setState({
      visible: true
    });
  }

  hide() {
    this.setState({
      visible: false
    });
  }

  _renderItem = ({ item, index }) => {
    console.tron.log(item);
    const { body, owner, inserted_at } = item;
    return (
      <View style={{ padding: 6 }}>
        <View style={{ flexDirection: 'row', padding: 6 }}>
          <Avatar size={32} name={owner.name} style={{ justifyContent: 'center' }} />
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ paddingLeft: 4, fontSize: 18 }}>{owner.name}</Text>
          </View>
        </View>
        <Text
          style={{
            paddingLeft: 6,
            paddingRight: 6,
            color: 'gray',
            fontSize: 14
          }}
        >
          {body}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <Modal onRequestClose={() => {}} animationType={'slide'} visible={this.state.visible} transparent={true}>
        <View style={styles.container}>
          {/* blank header */}
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                visible: false
              });
            }}
          >
            <View style={styles.blankHeader} />
          </TouchableWithoutFeedback>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                this.setState({
                  visible: false
                });
              }}
            >
              <Text style={{ fontSize: 20 }}>Messages</Text>
              <Text style={{ fontSize: 20 }}>X</Text>
            </TouchableOpacity>
            <FlatList
              ref={list => {
                this._list = list;
              }}
              renderItem={this._renderItem}
              data={this.state.message}
              keyExtractor={(item, index) => item.id}
            />
            <InputView
              onSend={text => {
                APIService.sendTransactionMessage(this.props.transactionId, text)
                  .then(result => {
                    this._getMessage();
                  })
                  .catch(e => {});
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

/* ------------- Styles ------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.selectB3,
    flex: 1
  },
  blankHeader: {
    height: 60,
    backgroundColor: colors.translucent
  },
  closeBtn: {
    marginTop: 6,
    marginRight: 12,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  suggestSegmentContainer: {
    alignItems: 'center',
    height: 100,
    marginTop: 6
  },
  itemContainer: {
    alignItems: 'center',
    width: 20,
    marginLeft: 12,
    marginRight: 12
  }
});
