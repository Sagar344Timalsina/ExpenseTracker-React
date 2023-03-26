import React, { useState, useEffect } from 'react'
import "../styles/style.css"
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


const HomePage = () => {
    const navigate=useNavigate();
    const [optionType, setOptionType] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [id, setId] = useState("");
    const [updatedValues, setUpdatedValues] = useState({
        name: "",
        date: "",
        option: "",
        amount: ""
    });
    // const [updatedName, setUpdatedName] = useState("");
    // const [updatedDate, setUpdatedDate] = useState("");
    // const [updatedAmount, setUpdatedAmount] = useState("");
    const [tracker, setTracker] = useState([]);

    const trackerCollection = collection(db, "tracker");


    function setUserName(e) {
        setName(e.target.value);
        setUpdatedValues({ ...updatedValues, name: e.target.value });

    }
    function setUserAmount(e) {
        setAmount(e.target.value);
        setUpdatedValues({ ...updatedValues, amount: e.target.value });
        console.log(e.target.value);
    }
    function setUserOption(e) {
        setOptionType(e.target.value);
        setUpdatedValues({ ...updatedValues, option: e.target.value });
    }
    function setUserDate(e) {
        setDate(e.target.value);
        setUpdatedValues({ ...updatedValues, date: e.target.value });
    }

    //Adding data to firebase
    const handleAddData = async () => {
        try {
            await addDoc(trackerCollection, {
                amount,
                date,
                name,
                option: optionType
            }
            )
            setUpdatedValues({name:"",option:"",date:"",amount:""});
            getData();
            console.log(name, date, optionType, amount)
        } catch (error) {
            console.log(error);
        }
    }

    //Getting data from firebase
    const getData = async () => {
        try {
            const data = await getDocs(trackerCollection);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTracker(filteredData);
            // console.log(filteredData);
        } catch (error) {
            console.log(error)
        }
    }

    //get data by id
    const getDataById = async (id) => {
        try {
            const data = doc(trackerCollection, id);
            const filteredData = await getDoc(data);
            console.log({ ...filteredData.data() })
            setUpdatedValues(filteredData.data());
            // console.log({...updatedValues})
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])

    //deleting data from firebase
    const deleteData = async (id) => {
        try {
            const trackerDoc = doc(db, "tracker", id)
            await deleteDoc(trackerDoc);
            getData();
            alert("Data deleted");
        } catch (error) {
            console.log(error)
        }
    }
    const updateValues = async () => {
        try {
            const trackerDoc = doc(db, "tracker", id);
            await updateDoc(trackerDoc, {
                option: updatedValues.option,
                amount: updatedValues.amount,
                date: updatedValues.date,
                name: updatedValues.name,
            })
            setUpdatedValues({name:"",option:"",date:"",amount:""});
            document.getElementById("update-expense").style.display = "none";
            document.getElementById("new-expense").style.display = "block";
            getData();
        } catch (error) {
            console.log(error);
        }
    }
    //updating Data
    const updateButton = (id) => {
        try {

            document.getElementById("update-expense").style.display = "block";
            document.getElementById("new-expense").style.display = "none";
            setId(id);
            getDataById(id)
            console.log(updatedValues);




        } catch (error) {
            console.log(error);
        }
    }

    const handleChangePage=()=>{
        navigate('/invoice');
    }

    return (
        <>
            <div className="main-container">
                <header className="header">
                    <div className="upper-header">
                        <h1>Expense Tracker App</h1>
                    </div>
                    <div className="lower-header">
                        <div className="lower-header-one">
                            Type::<select id="type" value={updatedValues.option} onChange={(e) => setUserOption(e)}>
                                <option value=""></option>
                                <option value="card">Card</option>
                                <option value="cash">Cash</option>
                                <option value="others">Others</option>
                            </select>
                            Name::<input type="text" id="name" value={updatedValues.name} onChange={(e) => setUserName(e)} />
                        </div>
                        <div className="lower-header-two">
                            Date::<input type="date" id="date" value={updatedValues.date} onChange={(e) => setUserDate(e)} />
                            Amount::<input type="text" id="amount" value={updatedValues.amount} onChange={(e) => setUserAmount(e)} />
                        </div>
                        <div className="button" id="submit">
                            <button className="btn-button" id="new-expense" onClick={handleAddData}>Add new Expense</button>
                        </div>
                        <div className="button" id="update">
                            <button className="btn-button" id="update-expense" onClick={updateValues} >Update</button>
                        </div>

                    </div>

                </header>


            </div>
            <div className="wrapper-table">
                <div className="table-content">
                    <table >
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody id="expenseTable">
                            {
                                tracker.map((track) => (
                                    <tr key={track.id}>
                                        <td>{track.option}</td>
                                        <td>{track.name}</td>
                                        <td>{track.date}</td>
                                        <td>{track.amount}</td>
                                        <td><button onClick={() => updateButton(track.id)}>Update</button></td>
                                        <td><button onClick={() => deleteData(track.id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                <div className="btn-Invoice">
                    <button onClick={handleChangePage} >InvoicePage</button>
                </div>
            </div>
        </>
    )
}

export default HomePage