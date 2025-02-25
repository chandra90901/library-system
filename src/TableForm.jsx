import React, { useEffect } from 'react';
import Input from './components/Input';
import Select from './components/select'
import Checkbox from './components/checkbox';
import RadioButton from './components/RadioButton'

function TableForm(props) {
    const { company, contact, country, errors, onSave, setCompany, setContact, setCountry, editRecord, formMode } = props;
    const genderOptions = [{
        value: 'male',
        label: 'Male'
    }, {
        value: 'female',
        label: 'Female'
    }]
    const dropdownOptions = [{
        value: 'Uk', label: 'Uk'
    },
    { value: 'Usa', label: 'Usa' },
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' }]


    useEffect(() => {
        setCompany(editRecord.company);
        setContact(editRecord['contact-name']);
        setCountry(editRecord.country);
    }, [editRecord])

    return (
        <><RadioButton title="Gender" name="gender" id="gender" options={genderOptions} />
            <Input
                title="Company"
                id="company"
                placeholder="company name"
                value={company}
                setChangeValue={setCompany}
                error={errors.company || false}
                isDisable={formMode === "edit"}
            />
            <Input title="Contact" id="contact" placeholder="contact name" value={contact} setChangeValue={setContact} error={errors.contact || false} />
            {/* <Select title="Country" id="country" setChangeValue={setCountry} value={country} /> */}
            <Select title="Country" id="country" options={dropdownOptions} setChangeValue={setCountry} />
            <Checkbox title="VIP" id="vip" defaultValue={true} />
            <RadioButton title="Gender" name="gender" id="gender" options={genderOptions} />
            <button className='btn btn-primary' onClick={onSave}>Add</button>
        </>
    )
}

export default TableForm;