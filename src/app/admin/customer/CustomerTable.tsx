"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import { getAllCustomer } from "@/api/CustomerApi";
import CircleLoading from "@/components/ui/CircleLoading";
import {getAgeFromBirthDate, getGenderName} from "@/util/Helper";


import { useState } from "react";
import CustomerSearch from "@/app/admin/customer/CustomerSearch";
import type { Customer } from "@/types/Person";
import type {JSONResponse, PageJSONResponse} from "@/types/misc/JSONResponse";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CustomerTable({ name, page, size }: { name: string; page: number; size: number }) {
    const [searchQuery, setSearchQuery] = useState(name);
    const [currentPage, setCurrentPage] = useState(page);
    const [currentSize, setCurrentSize] = useState(size);

    const { data: customerResponse, error, isLoading } = useSWR<JSONResponse<PageJSONResponse<Customer>>>(
        () => getAllCustomer(searchQuery, currentPage, currentSize),
        fetcher
    );

    const handlePreviousPage = () => {
        if (!customerResponse?.data.first) {
            setCurrentPage((prevPage) => prevPage - 1);
            setSearchQuery("");
        }
    };

    const handleNextPage = () => {
        if (!customerResponse?.data.last) {
            setCurrentPage((prevPage) => prevPage + 1);
            setSearchQuery("");
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page when a new search query is entered
    };

    if (error) {
        console.log(error);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <CircleLoading />
            </div>
        );
    }

    return (
        <>
            <CustomerSearch onSearch={handleSearch} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {customerResponse?.data.totalElements !== 0 ? (
                        customerResponse?.data.content.map((customer: Customer) => (
                        <tr
                            key={customer.customer_code}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <Image className="w-10 h-10 rounded-full" src="/assets/profile-picture.jpg" alt="Profile Picture" width={40} height={40} />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">{customer.name}</div>
                                    <div className="font-normal text-gray-500">{getGenderName(customer.gender)} / {getAgeFromBirthDate(customer.birth_date)} y/o</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{customer.address}</td>
                            <td className="px-6 py-4">{customer.phone_number}</td>
                            <td className="px-6 py-4">{customer.created_at}</td>
                            <td className="px-6 py-4">
                                <Link href={`/customers/${customer.customer_code}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                </Link>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                                <div className="flex justify-center items-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No data found.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {customerResponse?.data.totalPages !== 0 ?
            <div className="flex justify-between items-center mt-4">
                <div className="flex-1 flex justify-between items-center">
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="hidden md:flex">
                        {/* Render page numbers */}
                        {customerResponse?.data.totalPages &&
                            Array.from(Array(customerResponse?.data.totalPages).keys()).map((index) => {
                                const pageNumber = index + 1;
                                const isCurrentPage = pageNumber === currentPage;

                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`relative inline-flex items-center px-4 py-2 border ${
                                            isCurrentPage
                                                ? 'bg-blue-500 text-white'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        } text-sm font-medium rounded-md focus:outline-none`}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                    </div>
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        onClick={handleNextPage}
                        disabled={currentPage === customerResponse?.data.totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            : null}
        </>
    );
}
