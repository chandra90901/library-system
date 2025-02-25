import React from "react";

function RadioDelete(props) {
    const { title, options, setValue, name, id } = props;

    return (
        <div className="row">
            <div className='col-1'>
                {/* <label className="col-6">{title}</label> */}
                {/* <span className="col-5"> */}
                {options.map((option) => (
                    <>
                        <input type="radio" id={option.value} name={id} value={option.value} />
                        <label for={option.value} style={{ paddingLeft: '2px', paddingRight: '7px' }}>{option.label}</label>
                    </>
                ))}
                {/* </span> */}
            </div>
        </div>
    )
}

export default RadioDelete;