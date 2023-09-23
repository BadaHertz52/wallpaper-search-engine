import React from 'react';

type RadioBtnProps = {
    name: string;
    id: string;
    value: string | number;
    selectedOption: string | number;
};
const RadioBtn = ({ name, id, value, selectedOption }: RadioBtnProps) => {
    return (
        <input
            type="radio"
            name={name}
            id={id}
            value={value}
            checked={selectedOption === value}
        />
    );
};

export default React.memo(RadioBtn);
