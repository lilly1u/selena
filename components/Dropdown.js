import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TYPE, GRADE, LANG } from './Filters';

const DropdownComponent = ({filter, setType, setLang, setGrade}) => {
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
        placeholder="Type"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
                  if (filter == TYPE) {
                    setType(item.label);
                  }
                  else if (filter == LANG) {
                    setLang(item.label);
                  }
                  else if (filter == GRADE) {
                    setGrade(item.label);
                  }
                  setLabel(item.label);
                  setIsFocus(false);
                  console.log(item.label)
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
    fontSize: 15
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
});