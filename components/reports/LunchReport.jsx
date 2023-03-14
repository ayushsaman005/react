import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configData from "../../Server.json";



function LunchReport() {
    const [searchTerm, setSearchTerm] = useState('');
    const [tableData, setTableData] = useState([]);
    const [availdDataExpand , setAvaildDataExpand] = useState(false);
    const [availdNotDataExpand , setAvaildNotDataExpand] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${configData.SERVER_URL}api/reports/lunch`);
            setTableData(response.data);
        } catch (error) {
        }
    };

     fetchData();
    }, []);

    function expandAvaildTable() {
        setAvaildDataExpand(!availdDataExpand)
        setAvaildNotDataExpand(false)
    }
    function expandNotAvaildTable() {
        setAvaildNotDataExpand(!availdNotDataExpand)
        setAvaildDataExpand(false)
    }

    let uniqueCount = [], uniqueScannedId = new Set();
    let u = [];
    tableData[0]?.availed.forEach((data,i) => {
        const count = tableData[0]?.availed.filter((obj) => obj.scannedId === data.scannedId).length;
        if (!u.includes(data.scannedId)) {
            uniqueCount.push(count)
            u.push(data.scannedId)
        }
        uniqueScannedId.add(data.scannedId)
    });
    uniqueScannedId = Array.from(uniqueScannedId)

   let availdata = uniqueScannedId.map((e,i)=> {
        let data = []
        for (let index = 0; index < tableData[0]?.availed.length; index++) {
            const element = tableData[0]?.availed[index];
            if (element.scannedId === e) {
                element.Qty = uniqueCount[i]
                data.push(element);
                break
            }
        }
        return data
    });

    availdata = availdata.flat(1);

    const QtyArr = []
    const filteredAvaildData = availdata?.filter(({ user }) => user.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredNotAvaildData = tableData[1]?.notAvailed.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    filteredAvaildData?.forEach(e => {
        QtyArr.push(e.Qty)
    });
    const qtyTotalCount = QtyArr.reduce((a, b) => a + parseInt(b), 0);

      return (
        <div className="text-center text-3xl font-bold mt-14 mb-7"><h1>
            Lunch Report
        </h1>
            <div className="flex items-center justify-center w-screen my-10">
                <label htmlFor="search" className="sr-only">Search name</label>
                <input type="text" id="search" className='text-sm font-thin w-2/4 border-2 p-2' 
                    placeholder="Search name" value={searchTerm} autoComplete="off" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

        <div className="bg-gray-50 flex">
        <p scope="col" onClick={expandAvaildTable} className={`${availdDataExpand && "font-extrabold underline"} px-6 py-3 w-6/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}><p> Availd: <span className=' '>{filteredAvaildData?.length}</span></p> <p>Total Qty: <span className=' '>{qtyTotalCount}</span></p></p>
            <p scope="col" onClick={expandNotAvaildTable} className={`${availdNotDataExpand && "font-extrabold underline"} px-6 py-3 w-6/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>Not Availd: <span className=' '>{filteredNotAvaildData?.length}</span></p> 
        </div>
<div className='flex relative w-screen'>
        <div className={`${availdDataExpand? "w-full z-10" : "w-1/2"} tracking-wider flex flex-col text-xs font-thin transition-width duration-700 ease bg-white divide-y divide-gray-200 absolute h-96 left-0 overflow-x-scroll`}>
        {filteredAvaildData?.map(({ user, category, Qty },i) => (
                <div key={i} className={"text-center flex flex-col p-1 border-2 bg-white divide-y divide-gray-200"}>
                <p className=' bg-slate-200 w-5 rounded-full text-xs p-1'>{i+1}</p>
                <tr>
                            <td className={`${category === "Pharma" && "text-green-400"} ${category === ("Chairperson" || "Faculty") && "text-red-400"} ${category === "Delegate" && "text-blue-400"} py-4 px-2 whitespace-nowrap`}>Name: </td>
                            <td className={`${category === "Pharma" && "text-green-400"} ${category === ("Chairperson" || "Faculty") && "text-red-400"} ${category === "Delegate" && "text-blue-400"} py-4 whitespace-nowrap`}>{user}</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-2 whitespace-nowrap">Category: </td>
                            <td className="py-4 whitespace-nowrap">{category}</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-2 whitespace-nowrap">Qty: </td>
                            <td className="py-4 whitespace-nowrap">{Qty}</td>
                </tr>
                <hr />
                </div>
              ))}
        </div>
        <div className={`${availdNotDataExpand? "w-full z-10" : "w-1/2"} tracking-wider flex flex-col text-xs font-thin transition-width duration-700 ease bg-white divide-y divide-gray-200 absolute h-96 right-0 overflow-x-scroll`}>
        {filteredNotAvaildData?.map(({ name, category },i) => (
            
                <div key={i} className="flex flex-col p-1 border-2 bg-white divide-y divide-gray-200">
                <p className='text-current bg-slate-200 w-5 rounded-full text-xs p-1'>{i+1}</p>
                        <tr>
                            <td className="py-4 px-2 whitespace-nowrap">Name: </td>
                            <td className="py-4  whitespace-nowrap">{name}</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-2 whitespace-nowrap">Category: </td>
                            <td className="py-4 whitespace-nowrap">{category}</td>
                        </tr>
                </div>
              ))}
            </div>
            </div>
        </div>
    )
}

export default LunchReport