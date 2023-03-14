import React, {useState} from 'react'
import Attendance from '../components/activities/Attendance';
import Dinner from '../components/activities/Dinner';
import KitDistribution from '../components/activities/KitDistribution';
import Lunch from '../components/activities/Lunch';
import Presentation from '../components/activities/Presentation';
import RegistrationForm from '../components/activities/RegistrationForm';
import {Link} from 'react-router-dom'


function Activities() {
  const [registrationForm, setRegistrationForm] = useState(true);
  const [attendancePage, setAttendancePage] = useState(false);
  const [kitDistribution, setKitDistribution] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [prensentation, setPresentation] = useState(false);
  const [dinner, setDinner] = useState(false);
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
    <Link to="/reports" className="flex items-center">
        <button className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Reports
        </button>
    </Link>
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
                  setAttendancePage(false)
                  setKitDistribution(false)
                  setLunch(false)
                  setPresentation(false)
                  setDinner(false)
                  setRegistrationForm(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Registration
            </button>
          </li>
        <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                  setLunch(false)
                  setPresentation(false)
                  setRegistrationForm(false)
                  setAttendancePage(false)
                  setDinner(false)
                  setKitDistribution(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Kit Distribution
            </button>
          </li>
          
          <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                  setPresentation(false)
                  setRegistrationForm(false)
                  setAttendancePage(false)
                  setKitDistribution(false)
                  setDinner(false)
                  setLunch(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Lunch
            </button>
          </li>
          <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                  setPresentation(false)
                  setRegistrationForm(false)
                  setAttendancePage(false)
                  setKitDistribution(false)
                  setLunch(false)
                  setDinner(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Dinner
            </button>
          </li>
        <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                  setKitDistribution(false)
                  setLunch(false)
                  setPresentation(false)
                  setRegistrationForm(false)
                  setDinner(false)
                  setAttendancePage(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Attendance
            </button>
          </li>
          <li className='py-3 px-2'>
            <button
              className="text-gray-900 dark:text-white hover:underline"
              onClick={()=>{
                  setRegistrationForm(false)
                  setAttendancePage(false)
                  setKitDistribution(false)
                  setLunch(false)
                  setDinner(false)
                  setPresentation(true)
              }}
              type="button"
      data-te-collapse-init=""
      data-te-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
            >
              Prensentation
            </button>
          </li>
      </ul>
      {/* Left links */}
    </div>
    {/* Collapsible wrapper */}
    
  </div>
</nav>
  <div className='mx-4'>
    {registrationForm && <RegistrationForm />}
    {attendancePage && <Attendance />}
    {kitDistribution && <KitDistribution />}
    {lunch && <Lunch />}
    {prensentation && <Presentation />}
    {dinner && <Dinner />}
  </div>
</>
  )
}

export default Activities

