import React from "react";
function Select(props) {
    const { title, id, options, value, setChangeValue } = props;
    const onCommonChange = (e) => {
        setChangeValue(e.target.value);
    };

    return (
        //     <div className="row" style={{ marginBottom: "5px" }}>
        //     <label htmlFor={id} className="col-6">{title}</label>
        //     <select id="country" name="country" className="col-5" onChange={onCommonChange}>
        //         <option value="uk">UK</option>
        //         <option value="usa">USA</option>
        //         <option value="india">India</option>
        //         <option value="australia">Australia</option>
        //     </select>
        // </div>
        <div className="row" style={{ marginBottom: "5px" }}>
            <label htmlFor={id} className="col-6">{title}</label>
            <select id="country" name="country" className="col-5" onChange={onCommonChange} value={value}>
                <option value="uk">UK</option>
                <option value="usa">USA</option>
                <option value="india">India</option>
                <option value="australia">Australia</option></select>
            {/* <select
                id={id}
                name={id}
                value={value}
                className="col-5"
                onChange={onCommonChange}
            >
                <option value="enter country"></option>
                {options.map((option) => (
                    <option id={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> */}
        </div>
    );
}

export default Select;