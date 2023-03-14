import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';
import styles from '../components/TableStyle';
import configData from "../Server.json";

const RegisteredData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${configData.SERVER_URL}api/registered_data`);
      setTableData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const filteredData = tableData.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));

//  const styles = ({
//   page: {
//     backgroundColor: 'white',
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   table: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: 'black',
//     color: 'white',
//     height: 40,
//     fontSize: 14,
//   },
//   tableColHeader: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tableColHeaderLabel: {
//     color: 'white',
//     // fontSize: 18,
//     fontWeight: 'bold',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     height: 50,
//   },
//   tableColData: {
//     flex:1,
//     justifyContent: "center",
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#000',
//     fontSize: 12
//   },
//   tableColDataLabel: {
//     // fontSize: 14,
//   },
// });


  return (
    <div className="mx-auto lg:px-8">
        {/* <h1 className='text-center text-3xl font-bold w-screen m-12'>Registered Data</h1> */}
      <div className="flex items-center w-screen my-4">
        <label htmlFor="search" className="sr-only">Search</label>
        <input type="text" id="search" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-80 sm:text-sm border-gray-300 rounded-md" placeholder="Search name" value={searchTerm} autocomplete="off" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <table className="divide-y divide-gray-200 border-2">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map(({ scannedId, name, email, phone,city, designation,companyName}) => (
            <tr key={scannedId}>
              <td className="px-2 py-4 whitespace-nowrap border-2">{scannedId}</td>
              <td className="px-2 py-4 whitespace-nowrap border-2">{name}</td>
              <td className="px-2 py-4 whitespace-nowrap border-2">{email}</td>
              <td className="px-2 py-4 whitespace-nowrap border-2">{phone}</td>
              <td className="px-2 py-4 whitespace-nowrap border-2">{city}</td>
              <td className="px-2 py-4 whitespace-nowrap border-2">{designation}</td>
              <td className="px-2 py-4 whitespace-nowrap border-2">{companyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PDFDownloadLink document={<Document>
        <Page size={'A3'}>
        <View style={styles.page}>
        <Text style={styles.title}>Registered Data</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableColHeader}><Text>Id</Text></View>
            <View style={styles.tableColHeader}><Text>Name</Text></View>
            <View style={styles.tableColHeader}><Text>Email</Text></View>
            <View style={styles.tableColHeader}><Text>Phone</Text></View>
            <View style={styles.tableColHeader}><Text>City</Text></View>
            <View style={styles.tableColHeader}><Text>Designation</Text></View>
            <View style={styles.tableColHeader}><Text>Company</Text></View>
          </View>
          {filteredData.map(({ scannedId, name, email, phone,city, designation,companyName}) => (
            <View style={styles.tableRow} key={scannedId}>
              <View style={styles.tableColData}><Text>{scannedId}</Text></View>
              <View style={styles.tableColData}><Text>{name}</Text></View>
              <View style={styles.tableColData}><Text>{email}</Text></View>
              <View style={styles.tableColData}><Text>{phone}</Text></View>
              <View style={styles.tableColData}><Text>{city}</Text></View>
              <View style={styles.tableColData}><Text>{designation}</Text></View>
              <View style={styles.tableColData}><Text>{companyName}</Text></View>
            </View>
          ))}
        </View>
      </View>
        </Page>
      </Document>} fileName="myTable.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : <button className='bg-gray-100 rounded-md m-5 p-3 hover:bg-gray-200'>Download PDF</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default RegisteredData;
