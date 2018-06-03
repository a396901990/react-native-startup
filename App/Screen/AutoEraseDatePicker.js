import Picker from 'react-native-picker';

const days = [];
for (var i = 0; i < 365; i++) {
  days.push(i);
}

const hours = [];
for (let i = 0; i < 24; i++) {
  hours.push(i);
}

const minutes = [];
for (let i = 0; i < 60; i++) {
  minutes.push(i);
}

var _isPickerShown;

const setSelectValue = (selectedValue, onPickerConfirm, onPickerCancel, onPickerSelect) => {
  Picker.init({
    pickerData: [days, ['day'], hours, ['hour'], minutes, ['minute']],
    // selectedValue: selectedValue,
    pickerTitleText: '',
    pickerConfirmBtnText: 'ok',
    pickerCancelBtnText: 'cancel',
    onPickerConfirm: (pickedValue, pickedIndex) => {
      onPickerConfirm && onPickerConfirm(pickedValue, pickedIndex);
    },
    onPickerCancel: (pickedValue, pickedIndex) => {
      onPickerCancel && onPickerCancel(pickedValue, pickedIndex);
    },
    onPickerSelect: (pickedValue, pickedIndex) => {
      onPickerSelect && onPickerSelect(pickedValue, pickedIndex);
    }
  });
};

const show = () => {
  Picker.show();
  this._isPickerShown = true;
};

const hide = () => {
  if (isShown()) {
    Picker.hide();
    this._isPickerShown = false;
  }
};

const isShown = () => {
  return this._isPickerShown;
};

export default { setSelectValue, show, hide, isShown };
