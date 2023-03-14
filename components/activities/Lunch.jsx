import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configData from "../../Server.json";


function Lunch() {
    const auth_token = localStorage.getItem("token");
    const [openScanner, setScannerBtn] = useState(false)
    const [scannedId, setScannedId] = useState("");
    const [userData, setUserData] = useState([]);
    const [foundData, setFoundData] = useState(false);
    const [userFound, setUserFound] = useState("")
    const [authUser, setAuthUser] = useState("")



    useEffect( () => {
       async function getLoginUser() {
            const response = await fetch(`${configData.SERVER_URL}api/auth/getuser`,{
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    "auth-token": auth_token
                }
            })   
            let res = await response.json();
            setAuthUser(res.name);
        }
        getLoginUser();
    }, [])




    const fetchDetails = () => {
        axios.post(`${configData.SERVER_URL}api/fetch_user_data`, { "scannedId": scannedId })
            .then(function (response) {
                setFoundData(true)
                setUserData(response.data)
                if (response.data.length === 0) {
                    setUserFound("User not found");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            })
            .catch(function (error) {
                console.log(error);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            });
    };
    const addEntry = () => {
        axios.post(`${configData.SERVER_URL}api/activities_records`, {
            "user": userData[0].name,
            "scannedId": userData[0].scannedId,
            "category": userData[0].category,
            "activity": "lunch",
            "Qty": 1,
            "loggedInUser": authUser
        }).then(function (response) {
                console.log(response);
                if(response.status === 200){
                    toast.success("Successfully submitted", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }else{
                    toast.error("Error, please try again!", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
                setScannedId("");
                setTimeout(() => {
                    window.location.reload();
                }, 1800);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <>
            <h1 className="text-center text-4xl font-bold mt-14 mb-7">Lunch</h1>
            {/* scanner */}
            <div className="flex flex-col justify-center items-center m-6">
                {openScanner && <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setScannedId(result?.text)
                            console.log("scannedId", result?.text);
                            setScannerBtn(false);
                        }
                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    className="w-72 h-72"
                />}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { setScannerBtn(!openScanner) }}>{openScanner ? "Close scanner" : "Open scanner"}</button>
            </div>
            <div className="mb-4">
                <label htmlFor="id" className="block text-gray-700 font-bold mb-2">
                    Scanned Id
                </label>
                <input
                    type="text"
                    id="id"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="scanned Id"
                    disabled
                    required
                    value={scannedId}
                />
            </div>
            {!foundData && <div className='text-center'>
                 <button className='"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"' onClick={fetchDetails}>Fetch user details</button>
            </div>}

            {foundData ? <><table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Name</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].name}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Id</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].scannedId}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Email</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].email}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Phone</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].phone}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">City</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].city}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Designation</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].designation}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Company</td>
                            <td className="px-6 py-4 whitespace-nowrap">{userData[0].companyName}</td>
                        </tr>
                </tbody>
            </table>
            <div className='text-center'>
            <button className='"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"' onClick={addEntry}>Entry lunch</button>
       </div></>
            :             <h3 className='text-center p-6 text-lg font-bold'>{userFound}</h3>
        }
            {/* toast */}
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    )
}

export default Lunch