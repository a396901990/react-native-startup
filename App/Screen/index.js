import { Navigation } from 'react-native-navigation';
import LoginScreen from '../Screen/LoginScreen';
import HomeScreen from '../Screen/HomeScreen';
import SignupScreen from '../Screen/SignupScreen';
import WelcomeScreen from '../Screen/WelcomeScreen';
import CreateEscrow from '../Screen/CreateEscrow';
import CreateContractScreen from '../Screen/CreateContractScreen';
import TransactionScreen from '../Screen/TransactionScreen';
import BackTitleButton from '../Screen/BackTitleButton';
import CreateButton from '../Screen/CreateButton';
import HomeTitleButton from '../Screen/HomeTitleButton';
import ProfileScreen from '../Screen/ProfileScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('SignupScreen', () => SignupScreen, store, Provider);
  Navigation.registerComponent('WelcomeScreen', () => WelcomeScreen, store, Provider);
  Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('CreateEscrow', () => CreateEscrow, store, Provider);
  Navigation.registerComponent('CreateContractScreen', () => CreateContractScreen, store, Provider);
  Navigation.registerComponent('TransactionScreen', () => TransactionScreen, store, Provider);
  Navigation.registerComponent('BackTitleButton', () => BackTitleButton, store, Provider);
  Navigation.registerComponent('CreateButton', () => CreateButton, store, Provider);
  Navigation.registerComponent('HomeTitleButton', () => HomeTitleButton, store, Provider);
  Navigation.registerComponent('ProfileScreen', () => ProfileScreen, store, Provider);
}
