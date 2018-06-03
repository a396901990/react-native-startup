import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { AppCreators } from '../Redux/AppRedux';
import { Web3Creators } from '../Redux/Web3Redux';



export class CreateEscrow extends Component {
  async componentDidMount() {
   await this.props.dispatch(Web3Creators.setWeb3Provider({provider: 'http://13.230.241.186:8545'}));
   this.createEscrow()
  }
  state = {

  }

  createEscrow = async () => {
    const { instance, accounts } = this.props.web3;
    // console.tron.display({
    //   name: 'instance',
    //   value: instance
    // }) 
    const getEscrowHash = await instance.methods.getEscrowHash(0, accounts[2], accounts[3], accounts[4], 10000, 50 ).call();
    console.tron.display({
      name: 'getEscrowHash',
      value: getEscrowHash
    }) 
    
  }

  render() {
    console.tron.display({
      name: 'props2',
      value: this.props.web3
    })
    this.createEscrow()    
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {}}>
          <Text>
            Create escrow
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.Web3 
  };
};

export default connect(mapStateToProps)(CreateEscrow);
