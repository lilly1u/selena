import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TYPE = [
  { label: 'Type' },
  { label: 'One-to-Ones' },
  { label: 'Audio Scripts' },
  { label: 'Workbooks' },
  { label: 'Audio Exercises' },
  { label: 'Activity Guides' },
  { label: 'Action Videos' },
  { label: 'Lesson Plans' },
  { label: 'Powerpoints' },
  { label: 'Selfie Videos' },
  { label: 'Cartoon Videos' },
];

const LANG = [
  { label: 'Langauge' },
  { label: 'English' },
  { label: 'Arabic' },
  { label: 'Spanish' },
];

const DropdownComponent = ({filter}) => {
  const [label, setLabel] = useState('null');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={filter}
        search={false}
        maxHeight={300}
        labelField="label"
        label={label}
        placeholder={!isFocus ? 'Type' : '   '}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setLabel(item.label);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 103.33,
    
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});