import React from 'react';

const PrersonalInfoForm = ({data, onChange, removeBg, setRemoveBg }) => {

    const handleFieldChange = (field,value) => {
        onchange({
            ...data,
            [field]: value
        }) 

    }
  return (
    <div>
        <h2>Personal Information</h2>
        </div>
  );
};

export default PrersonalInfoForm;