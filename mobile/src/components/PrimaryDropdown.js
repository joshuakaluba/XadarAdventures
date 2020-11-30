import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const PrimaryDropdown = (props) => {
    return (
        <DropDownPicker
            items={props.options}
            disabled={props.disabled}
            containerStyle={{ height: 50 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => props.onChangeItem(item)}
        />
    );
};

export default PrimaryDropdown;
