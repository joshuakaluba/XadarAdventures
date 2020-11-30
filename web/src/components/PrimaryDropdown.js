import React from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const PrimaryDropdown = (props) => {
    return (
        <Dropdown
            options={props.options}
            value={props.defaultOption}
            onChange={props.onChange}
            placeholder={props.placeholder} />
    );
};

export default PrimaryDropdown;