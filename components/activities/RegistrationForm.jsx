import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    city: yup.string().required(),
    companyName: yup.string().required(),
    designation: yup.string().required(),
    category: yup.string().required(),
    // scannedId: yup.string().required(),
});

function RegistrationForm() {
    // QrScanner
    const [openScanner, setScannerBtn] = useState(false)


    //form hook validation
    const { register, setValue, control, reset, handleSubmit, formState: { errors } } = useForm({
        // defaultValues: { scannedId: data},
        resolver: yupResolver(schema),
    });

    const onSubmit = (formData) => {
        axios.post('http://localhost:5000/api/registration_form', formData)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.data, {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error(response.data, {
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
                reset()
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(function (error) {
                toast.error(error.response.data, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(error);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            });
    };

    return (
        <>
            <h1 className="text-center text-4xl font-bold mt-14 mb-7">Registration from</h1>
            {/* scanner */}
            <div className="flex flex-col justify-center items-center m-6">
                {openScanner && <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            // setData(result?.text);
                            setValue("scannedId", result?.text);
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
            {/* form  */}
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg" autoComplete="off">
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-bold mb-2">
                        Scanned Id
                    </label>
                    <Controller
                        name="scannedId"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="id"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="scanned Id"
                                disabled
                                {...register("scannedId")}
                            />
                        )}
                    />
                    {errors.scannedId && (
                        <p className="text-red-500 text-xs italic">{errors.scannedId.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your name"
                                autoComplete="off"
                            />
                        )}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email Address
                    </label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email address"
                                autoComplete="off"
                            />
                        )}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs italic">{errors.email.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                        Phone
                    </label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="phone"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter phone number"
                                autoComplete="off"
                            />
                        )}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs italic">{errors.phone.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="City" className="block text-gray-700 font-bold mb-2">
                        City
                    </label>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="city"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="City"
                                autoComplete="off"
                            />
                        )}
                    />
                    {errors.city && (
                        <p className="text-red-500 text-xs italic">{errors.city.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">
                        Company name
                    </label>
                    <Controller
                        name="companyName"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="companyName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Company name"
                                autoComplete="off"
                            />
                        )}
                    />
                    {errors.companyName && (
                        <p className="text-red-500 text-xs italic">{errors.companyName.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-1 font-bold">Category</label>
                    <select
                        id="category"
                        {...register('category', { required: true })}
                        className={`w-full border border-gray-300 p-2 rounded-md ${errors.category ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select category</option>
                        <option value="Faculty">Faculties</option>
                        <option value="Delegate">Delegate</option>
                        <option value="Organiser">Organiser</option>
                        <option value="Chairperson">Chairperson</option>
                        <option value="Pharma">Pharma</option>
                    </select>
                    {errors.category && (
                        <span className="text-red-500 text-sm">Please select your category.</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="designation" className="block text-gray-700 font-bold mb-2">
                        Designation
                    </label>
                    <Controller
                        name="designation"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="designation"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Designation"
                                autoComplete="off"
                            />
                        )}
                    />
                    {errors.designation && (
                        <p className="text-red-500 text-xs italic">{errors.designation.message}</p>
                    )}
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
            </form>

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
    );
}

export default RegistrationForm;
