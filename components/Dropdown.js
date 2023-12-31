import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TYPE, GRADE, LANG } from './Filters';

const DropdownComponent = ({filter, placeholder, setType, setLang, setGrade, clear,}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  useEffect(() => {
    if (clear) {
      if (filter && filter.length > 0) {
        setValue(filter[0].value);
      }
      
      // Call the onClearComplete function to reset the clear state in the parent component
      
    }
  }, [clear, filter]);
  

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={filter}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          if (filter == TYPE) {
            setType(item.value);
          }
          else if (filter == LANG) {
            setLang(item.value);
          }
          else if (filter == GRADE) {
            setGrade(item.value);
          }
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
    paddingBottom: 3,
  },
  dropdown: {
    height: 50,
    width: 103.33,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
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
