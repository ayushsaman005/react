import React,{useState} from 'react'
import AttendanceReport from '../components/reports/AttendanceReport';
import DinnerReport from '../components/reports/DinnerReport';
import KItDistributionReport from '../components/reports/KItDistributionReport';
import LunchReport from '../components/reports/LunchReport';
import PresentationReport from '../components/reports/PresentationReport';
import {Link} from 'react-router-dom';
import configData from "../Server.json";


function Reports() {
  const authUser = localStorage.getItem("token");
  const [attendanceReport, setAttendanceReport] = useState(true);
  const [lunchReport, setLunchReport] = useState(false);
  const [kitDistributionReport, setKitDistributionReport] = useState(false);
  const [prensentationReport, setPresentationReport] = useState(false);
  const [dinnerReport, setDinnerReport] = useState(false);

  return (
      <>
      <nav
  className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 pt-1 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start"
  data-te-navbar-ref=""
>
  <div className="flex w-full flex-wrap items-center justify-between px-6">
    <button
      className="block border-0 bg-transparent py-2 px-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
      type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="[&>svg]:w-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
    {authUser &&<Link to="/activities" className="flex items-center">
        <button className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Activities
        </button>
    </Link>}
    <div
      className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
      id="navbarSupportedContent1"
      data-te-collapse-item=""
    >
      {/* Left links */}
      <ul
        className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
        data-te-navbar-nav-ref=""
      >
        <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                  setPresentationReport(false)
                  setKitDistributionReport(false)
                  setLunchReport(false)
                  setDinnerReport(false)
                  setAttendanceReport(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Attendance Report
            </button>
          </li>
          
          <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                setPresentationReport(false)
                setKitDistributionReport(false)
                setAttendanceReport(false)
                setDinnerReport(false)
                setLunchReport(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Lunch Report
            </button>
          </li>
          <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                setPresentationReport(false)
                setKitDistributionReport(false)
                setAttendanceReport(false)
                setLunchReport(false)
                setDinnerReport(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Dinner Report
            </button>
          </li>
        <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                setPresentationReport(false)
                setAttendanceReport(false)
                setLunchReport(false)
                setDinnerReport(false)
                setKitDistributionReport(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Kit Distribution Report
            </button>
          </li>
          <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                setKitDistributionReport(false)
                setAttendanceReport(false)
                setLunchReport(false)
                setDinnerReport(false)
                setPresentationReport(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Prensentation Report
            </button>
          </li>
      </ul>
    </div>
  </div>
</nav>
  <div>
    {attendanceReport && <AttendanceReport />}
    {lunchReport && <LunchReport />}
    {kitDistributionReport && <KItDistributionReport />}
    {prensentationReport && <PresentationReport />}
    {dinnerReport && <DinnerReport />}
  </div>
</>
  )
}

export default Reports
