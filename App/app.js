import '../global';
import { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './Screen';
import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';
import { compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './Redux';
import { AppCreators } from './Redux/AppRedux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import Web3 from './Services/Web3';

new Web3();

if (__DEV__) {
  console.disableYellowBox = true;
  console.tron = Reactotron;
}

Reactotron.configure({ name: 'rn' })
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const store = Reactotron.createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

registerScreens(store, Provider);

export default class App extends Component {
  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(AppCreators.initApp());
  }

  onStoreUpdate() {
    let { root } = store.getState().App;
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'WELCOME':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'WelcomeScreen',
            title: 'welcome'
          }
        });
        return;
      case 'HOME':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'HomeScreen',
            title: ''
          },
          drawer: {
            left: {
              screen: 'ProfileScreen',
              passProps: {},
              fixedWidth: 500
            },
            disableOpenGesture: true,
            type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
            animationType: 'door'
          }
        });
        return;
      case 'CREATE_ESCROW':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'CreateEscrow',
            title: 'CreateEscrow'
          }
        });
        return;
    }
  }
}
