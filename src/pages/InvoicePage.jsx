import React, { useEffect, useState } from 'react'
import "../styles/invoice.css"
import { db } from '../config/firebase'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";

const InvoicePage = () => {
    const navigate=useNavigate();
    const [tracker, setTracker] = useState([]);
  let sum=0;
    const dataCollection = collection(db, "tracker");
    const getData = async () => {
        try {
            const data = await getDocs(dataCollection);
            const filtererdData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTracker(filtererdData);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getData();
    },[])

    // const downloadInvoive=()=>{
    //     let div = document.querySelector(".main-container-invoice");
    //     let btn = document.querySelector("#btn-pdf");
    //     btn.addEventListener('click', () => {
    //         html2pdf().from(div).save();
    //     })
    // }

    return (
        <div className="main-container-invoice">
            <header className="header">
                <h1> Invoice Page</h1>
                <hr />
            </header>
            <header className="below-header">
                <h3>Name::</h3>
                <span id="name"></span>
                <h3>Company Name ::</h3>
                <span id="compname"></span>

            </header>
            <hr />
            <section>
                <div className="title-main">
                    <h1>This is the Invoice Page </h1>
                </div>
                <div className="table-main">
                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Amount</th>

                                </tr>
                            </thead>
                            <tbody id="expenseTable">
                                {
                                    tracker.map((track) => (
                                        <tr key={track.id}>
                                            <td>{track.name}</td>
                                            <td>{track.option}</td>
                                            <td>{track.date}</td>
                                            <td>{track.amount}</td>
                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
                <hr />
                <h4 id="total">   {
                       tracker.map((track) => {
                        return  sum+=(parseInt(track.amount)) 
                       } ) 
                    }</h4>
                <div className="total-menu">
                   
                    <h1>Total::{sum}</h1>
                </div>
                <div className="btn-pdf">
                    <button id="btn-pdf" >Download PDF</button>
                </div>
                <div className="btn-new">
                    <button id="btn-new" onClick={()=>navigate('/')}>New Records</button>
                </div>
            </section>
        </div>
    )
}

export default InvoicePage