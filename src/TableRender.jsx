import React, { useEffect, useState } from 'react';
import Table from 'react-table';
import TableForm from './TableForm';
// import RadioButton from './components/RadioButton';

const TableRender = () => {
    const [data, setData] = useState([{}]);
    const [errors, setErrors] = useState({});
    const [editRecord, setEditRecord] = useState({});
    const [company, setCompany] = useState("");
    const [contact, setContact] = useState("");
    const [country, setCountry] = useState("");
    const [formMode, setFormMode] = useState("create");
    const [selectRows, setSelectRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setData([
            { id: 1, company: 'Blueverse', "contact-name": "XYZ", country: "uk" },
            { id: 2, company: 'Garudaven', "contact-name": "Chenna Reddy", country: "usa" }
        ])
    }, []);

    const selectedRow = (index) => {
        const findRecord = data[index]
        setEditRecord(findRecord);
        setCompany(findRecord.company);
        setContact(findRecord["contact-name"]);
        setCountry(findRecord.country);
        setFormMode("edit");
    }

    const onSave = () => {
        if (!company || !contact || country === "") {
            let errorsCopy = errors;
            errorsCopy.company = !company ? true : false;
            errorsCopy.contact = !contact ? true : false;
            errorsCopy.country = !country ? true : false;
            setErrors(errorsCopy);
            if (Object.values(errorsCopy).includes(true)) {
                return;
            }
        }
        if (formMode === "edit") {
            let recordIndex;
            data.find((record, index) => {
                if (record.company === editRecord.company) {
                    recordIndex = index;
                }
            });
            let actualData = data;
            actualData[recordIndex]["contact-name"] = contact;
            actualData[recordIndex].country = country;
            setData(actualData);
            setEditRecord({});
            setFormMode("create");
        } else {
            setData([...data, { company, "contact-name": contact, country: country }]);
        }
        setErrors({});
        setCompany("");
        setContact("");
        setCountry("");
    }


    const deleteRecord = (e) => {
        let copyData = data;
        // const id = parseInt(e.target.id) - 1;
        // // @parseInt — A string to convert into a number.
        const id = parseInt(e.target.id);
        copyData.splice(id, 1);
        // deleting the elements from the data
        setData([...copyData]);
    }

    const deleteAllRecord = () => {
        setData([]);

    }
    // const deleteSelectedRecords = (index) => {
    //     const filteredData = data.filter((_, i) => i !== index);
    //     setData(filteredData);
    // };

    // Delete selected records
    const deleteSelectedRecords = () => {
        const filteredData = data.filter((_, index) => !selectRows.includes(index));
        setData(filteredData);
        setSelectAll([]);
    };

    // Move handleSelectAll outside handleCheckboxChange
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectRows([]); // Deselect all
        } else {
            setSelectRows(data.map((_, index) => index)); // Select all
        }
        setSelectAll(!selectAll);
    };
    // Handle individual checkbox selection
    const handleCheckboxChange = (index) => {
        setSelectRows((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index) // Deselect
                : [...prev, index] // Select
        );
    };

    return (
        <>
            <div className='row'>
                <div className='col-6 d-flex justify-content-end'>
                    <button className='btn btn-primary' style={{ float: 'right' }}>+</button>
                    <button className='btn btn-danger' id="delete-all" onClick={deleteAllRecord} style={{ marginLeft: '5px' }}>-</button>
                    {selectRows.length > 0 && (
                        <button className='btn btn-danger' id="delete-all" onClick={deleteSelectedRecords} style={{ marginLeft: '5px' }}>DEL</button>)}
                </div>
            </div>
            <div className='row'>
                <span className='col-1'></span>
                <table className='col-3' style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th><input type="checkbox" onClick={handleSelectAll} /></th>
                        <th style={{ border: '1px solid black' }}>Company</th>
                        <th style={{ border: '1px solid black' }}>Contact</th>
                        <th style={{ border: '1px solid black' }}>Country</th>
                        <th style={{ border: '1px solid black' }}></th>
                    </tr>
                    {data.map((entry, index) => (
                        <tr style={{ border: '1px solid black' }}>
                            <td > <input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={selectRows.includes(index)} /></td>
                            <td style={{ border: '1px solid black' }} onClick={selectedRow} id={index}>{entry.company}</td>
                            <td style={{ border: '1px solid black' }}>{entry["contact-name"]}</td>
                            <td style={{ border: '1px solid black' }}>{entry?.country || "India"}</td>
                            <td style={{ border: '1px solid black' }}>
                                <button className='btn btn-danger' id={index} onClick={deleteRecord}>-</button>
                            </td>
                        </tr>
                    ))}
                </table>
                <div className='col-6'>
                    <TableForm
                        company={company}
                        contact={contact}
                        country={country}
                        errors={errors}
                        setCompany={setCompany}
                        setContact={setContact}
                        setCountry={setCountry}
                        editRecord={editRecord}
                        onSave={onSave}
                        formMode={formMode}
                    />
                </div>
            </div >
        </>
    )
};


export default TableRender;