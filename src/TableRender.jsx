import React, { useEffect, useState } from 'react';
import Table from 'react-table';
import TableForm from './TableForm';

const TableRender = () => {
    const [data, setData] = useState([{}]);
    const [errors, setErrors] = useState({});
    const [editRecord, setEditRecord] = useState({});
    const [company, setCompany] = useState("");
    const [contact, setContact] = useState("");
    const [country, setCountry] = useState("");
    const [formMode, setFormMode] = useState("create");
    const [view, setView] = useState("table");

    useEffect(() => {
        setData([
            { company: 'Blueverse', "contact-name": "XYZ", country: "uk" },
            { company: 'Garudaven', "contact-name": "Chenna Reddy", country: "usa" }
        ])
    }, []);

    const selectedRow = (e) => {
        const findRecord = data[e.target.id];
        setEditRecord(findRecord);
        setFormMode("edit");
        setView("form");
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
        setView("table");
    }

    const deleteRecord = (e) => {
        let copyData = data;
        const id = parseInt(e.target.id);
        copyData.splice(id, 1);
        setData([...copyData]);
    }

    const deleteAllRecord = () => {
        setData([]);
    }

    return (
        <>
            <div className='row' style={{ marginTop: '5px' }}>
                {view === 'table' ?
                    <>
                        <div className='row'>
                            <div className='col-10 d-flex justify-content-end'>
                                <button className='btn btn-primary me-1' onClick={() => setView("form")}>+</button>
                                <button className='btn btn-danger ' id="delete-all" onClick={deleteAllRecord}>-</button>

                            </div>

                        </div>
                        <div className='row'>
                            <span className='col-1'></span>
                            <table className='col-10' style={{ border: '1px solid black' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <th style={{ border: '1px solid black' }}>Company</th>
                                    <th style={{ border: '1px solid black' }}>Contact</th>
                                    <th style={{ border: '1px solid black' }}>Country</th>
                                    <th style={{ border: '1px solid black' }}>

                                    </th>
                                </tr>
                                {data.map((entry, index) => (
                                    <tr style={{ border: '1px solid black' }}>
                                        <td style={{ border: '1px solid black' }} onClick={selectedRow} id={index}>{entry.company}</td>
                                        <td style={{ border: '1px solid black' }}>{entry["contact-name"]}</td>
                                        <td style={{ border: '1px solid black' }}>{entry?.country || "India"}</td>
                                        <td style={{ border: '1px solid black' }}>
                                            <button className='btn btn-danger' id={index} onClick={deleteRecord}>-</button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <span className='col-1'></span>
                        </div>
                    </> :
                    <>
                        <span className='col-1'></span>
                        <span className='col-10'>
                            <h2 style={{ textAlign: "center" }}>Enter Details</h2>
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
                                setView={setView}
                            />
                        </span>
                        <span className='col-1'></span>
                    </>
                }
            </div>
        </>
    )
}

export default TableRender;