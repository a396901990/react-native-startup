import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { GiftedForm, GiftedFormManager } from "react-native-gifted-form";
import { AppCreators } from "../Redux/AppRedux";
import * as APIService from "../Service/API/APIService";
import TransactionCard from "../Screen/TransactionCard";
import InputView from "./InputView";
import colors from "../colors";
import config from "../config";
import ChatModal from "./ChatModal";
import { Web3Creators } from "../Redux/Web3Redux";

class TransactionScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.navigator.setButtons(
      this.navigatorButtons(this.props.navigator)
    );
    this.state = {
      transaction: null
    };
  }

  async componentDidMount() {
    console.tron.log("component did mount");
    await this._fetchOneTransaction();
    this.timer = setInterval(() => {
      this._fetchOneTransaction();
    }, config.INTERVAL_TIME);
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  setEscrowHash = async () => {
    const { payer, arbitror, receiver, id } = this.state.transaction;
    console.tron.display({
      name: "set escrows hash ",
      value: this.state.transaction
    });
    const { instance } = this.props.web3;
    try {
      const escrowHash = await instance.methods
        .getEscrowHash(
          id,
          payer.public_key,
          receiver.public_key,
          arbitror.public_key,
          10000,
          50
        )
        .call();
      console.tron.display({
        name: "escrowHash",
        value: escrowHash
      });
    } catch (error) {
      console.tron.display({
        name: "escrowHash error",
        value: error
      });
    }
  };

  navigatorButtons = navigator => {
    return {
      leftButtons: [
        {
          component: "BackTitleButton",
          id: "title",
          passProps: {
            navigator,
            title: "Home"
          }
        }
      ]
    };
  };

  createNewEscrow = async () => {
    const { payer, arbitror, receiver, id } = this.state.transaction;
    const { instance, web3Provided, accounts } = this.props.web3;

    const balance = await web3Provided.eth.getBalance(accounts[0]);

    // console.tron.log('hahahahahahahas')
    console.tron.display({
      name: "BALANCE",
      value: balance
    });

    // const create = await instance.methods
    // .createEscrow(245, accounts[0], accounts[1], accounts[2], 1000, 360, 50 ).send({
    //   from: accounts[0],
    //   value:1000,
    //   gas: '30000000'
    // })
    // console.tron.log(accounts)

    const { eth } = web3Provided;

    const create = await instance.methods
      .createEscrow(21, accounts[0], accounts[1], accounts[2], 1000, 360, 50)
      .send({
        from: accounts[0],
        value: "1000"
        //gas: '3000000000'
      });

    // const changeFee = await instance.methods.changeFee(20).send({
    //   from: accounts[0]
    // })

    console.tron.display({
      name: "create",
      value: create
    });
  };

  _approveTransaction = async () => {
    APIService.approveTransaction(this.props.transactionID)
      .then(response => {
        this.setState({
          transaction: response
        });
      })
      .catch(e => {});
  };

  _dismissTransaction = () => {
    APIService.dismissTransaction(this.props.transactionID)
      .then(response => {
        this.setState({
          transaction: response
        });
      })
      .catch(e => {});
  };

  _activateTransaction = async () => {
    await this.createNewEscrow();
    // APIService.activateTransaction(this.props.transactionID)
    //   .then(response => {
    //     this._createEscrow();
    //     this.setState({
    //       transaction: response
    //     });
    //   })
    //   .catch(e => {});
  };

  _confirmTransaction = () => {
    APIService.confirmTransaction(this.props.transactionID)
      .then(response => {
        this.setState({
          transaction: response
        });
      })
      .catch(e => {});
  };

  _disputeTransaction = () => {
    APIService.disputeTransaction(this.props.transactionID)
      .then(response => {
        this.setState({
          transaction: response
        });
      })
      .catch(e => {});
  };

  _resolveTransaction = () => {
    console.tron.log("OK");
    APIService.resolveTransaction(this.props.transactionID)
      .then(response => {
        this.setState({
          transaction: response
        });
      })
      .catch(e => {});
  };

  _fetchOneTransaction = () => {
    APIService.fetchOneTransaction(this.props.transactionID)
      .then(response => {
        this.setState({
          transaction: response
        });
      })
      .catch(e => {
        this.setState({
          transaction: null
        });
      });
  };

  _cancelBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA1,
          alignSelf: "center"
        }}
        onPress={this._dismissTransaction}
      >
        <Text style={{ color: "white" }}>CANCEL</Text>
      </TouchableOpacity>
    );
  };

  _approveBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA2,
          alignSelf: "center"
        }}
        onPress={this._approveTransaction}
      >
        <Text style={{ color: "white" }}>APPROVE</Text>
      </TouchableOpacity>
    );
  };

  _activateBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA3,
          alignSelf: "center"
        }}
        onPress={this._activateTransaction}
      >
        <Text style={{ color: "white" }}>ACTIVE</Text>
      </TouchableOpacity>
    );
  };

  _confirmBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA4,
          alignSelf: "center"
        }}
        onPress={this._confirmTransaction}
      >
        <Text style={{ color: "white" }}>CONFIRM</Text>
      </TouchableOpacity>
    );
  };

  _disputeBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA5,
          alignSelf: "center"
        }}
        onPress={this._disputeTransaction}
      >
        <Text style={{ color: "white" }}>DISPUTE</Text>
      </TouchableOpacity>
    );
  };

  _disputeBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA5,
          alignSelf: "center"
        }}
        onPress={this._disputeTransaction}
      >
        <Text style={{ color: "white" }}>DISPUTE</Text>
      </TouchableOpacity>
    );
  };

  _resolveBtn = ({ name, id }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectA6,
          alignSelf: "center"
        }}
        onPress={this._resolveTransaction}
      >
        <Text style={{ color: "white" }}>{`Send to ${name}`}</Text>
      </TouchableOpacity>
    );
  };

  _chatBtn = () => {
    return (
      <TouchableOpacity
        style={{
          padding: 6,
          margin: 6,
          borderRadius: 4,
          backgroundColor: colors.selectPo1,
          alignSelf: "center"
        }}
        onPress={() => {
          this.chatModal.show();
        }}
      >
        <Text style={{ color: "white" }}>{"Chat"}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { transaction } = this.state;
    if (!transaction) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    let button;
    switch (this.props.userInfo.id) {
      case transaction.receiver.id:
        // receiver
        switch (transaction.status) {
          case -1: // cancel
            button = [];
            // display details. no action
            break;
          case 0: // pending
            button = transaction.receiver_approval
              ? []
              : [this._approveBtn(), this._cancelBtn()];
            // Can approve or cancel if not already
            // button: approve and cancel
            break;
          case 1: // active
            // Confirm payment or raise dispute
            button = transaction.receiver_confirm
              ? []
              : [this._confirmBtn(), this._disputeBtn()];
            break;
          case 2: // dispute
            button = [];
            // no action
            break;
          case 3: // success
            button = [];
            // no action
            break;
          case 4: // resolve
            button = [];
            // no action
            break;
        }
        break;
      case transaction.payer.id:
        // payer
        switch (transaction.status) {
          case -1: // cancel
            // display details. no action
            button = [];
            break;
          case 0: // pending
            button =
              transaction.arbitror_approval && transaction.receiver_approval
                ? [this._activateBtn()]
                : [];
            // no action until arbitror and receiver approve.
            // once both approve, payer can activate contract
            // one button: activate (disable unti)
            break;
          case 1: // active
            button = transaction.payer_confirm
              ? []
              : [this._confirmBtn(), this._disputeBtn()];
            // Confirm payment or raise dispute
            break;
          case 2: // dispute
            // no action
            button = [];
            break;
          case 3: // success
            // no action
            button = [];
            break;
          case 4: // resolve
            // no action
            button = [];
            break;
        }
        break;
      case transaction.arbitror.id:
        // arbitror
        switch (transaction.status) {
          case -1: // cancel
            // display details. no action
            button = [];
            break;
          case 0: // pending
            button = transaction.arbitror_approval
              ? []
              : [this._approveBtn(), this._cancelBtn()];
            // can approve or cancel if not already
            // button: approve and cancel
            break;
          case 1: // active
            // no action
            button = [];
            break;
          case 2: // dispute
            // send money to payer or sender
            button = [
              this._resolveBtn({
                name: transaction.receiver.name,
                id: transaction.receiver.id
              }),
              this._resolveBtn({
                name: transaction.payer.name,
                id: transaction.payer.id
              })
            ];
            break;
          case 3: // success
            // no action
            button = [];
            break;
          case 4: // resolve
            // no action
            button = [];
            break;
        }
        break;
    }

    let chatButton = null;
    switch (this.props.userInfo.id) {
      case transaction.receiver.id:
      case transaction.payer.id:
        if (transaction.status == 1) {
          chatButton = this._chatBtn();
        }
        break;
      case transaction.arbitror.id:
        if (transaction.status == 2) {
          chatButton = this._chatBtn();
        }
        break;
    }
    if (transaction) {
      return (
        <View
          style={{
            backgroundColor: colors.selectB2,
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <View>
            <TransactionCard {...transaction} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {button === null ? null : (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  {button.map(btnView => {
                    return btnView;
                  })}
                </View>
              )}
              {chatButton === null ? null : chatButton}
            </View>
          </View>
          <ChatModal
            transactionId={transaction.id}
            ref={chatModal => {
              this.chatModal = chatModal;
            }}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.App.userInfo,
    web3: state.Web3
  };
};

export default connect(mapStateToProps)(TransactionScreen);

// {
//   "transaction": {
//     "trade_hash": null,
//     "time_to_pay": 3600,
//     "status": 0,
//     "receiver_approval": false,
//     "receiver": {
//       "username": "dean",
//       "name": "Dean",
//       "id": "2668511a-06a6-4969-9f0d-dabac534dcde"
//     },
//     "payer": {
//       "username": "matt",
//       "name": "Matt",
//       "id": "f47e8015-b37e-48c0-a74a-37214b1aadea"
//     },
//     "id": 1,
//     "fee": 1000,
//     "description": "Selling you a 1000 of",
//     "arbitror_approval": false,
//     "arbitror": {
//       "username": "dastan",
//       "name": "Dastan",
//       "id": "06abfe89-33d2-4e09-85e6-6903740cae3d"
//     },
//     "amount": 1000
//   }
// }
