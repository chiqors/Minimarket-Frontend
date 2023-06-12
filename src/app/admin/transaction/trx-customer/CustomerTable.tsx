"use client"

import useSWR from "swr";

import {getCustomerPurchased, getTransactionByDate} from "@/api/TransactionApi";

import type {Transaction, TransactionBetweenDateResponseData, TransactionCustomerPurchases} from "@/types/Transaction";
import type { JSONResponse, PageJSONResponse } from "@/types/misc/JSONResponse";
import {convertToCurrency, getAgeFromBirthDate, getGenderName, getHumanReadableDatetimeV2} from "@/util/Helper";
import {useState} from "react";
import CircleLoading from "@/components/ui/CircleLoading";
import CustomerInputDate from "@/app/admin/transaction/trx-customer/CustomerInputDate";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CustomerTable({ page, size, startDate, endDate }: { page: number; size: number; startDate: string | number | readonly string[] | undefined; endDate: string | number | readonly string[] | undefined }) {
    const [currentPage, setCurrentPage] = useState(page);
    const [currentSize, setCurrentSize] = useState(size);

    const [currentStartDate, setCurrentStartDate] = useState(startDate);
    const [currentEndDate, setCurrentEndDate] = useState(endDate);

    const { data: transactionCustomerResponse, error, isLoading } = useSWR<JSONResponse<PageJSONResponse<TransactionCustomerPurchases>>>(
        getCustomerPurchased(currentStartDate, currentEndDate, currentPage, currentSize),
        fetcher
    );

    const handleDateChange = (startDate: string | number | readonly string[] | undefined, endDate: string | number | readonly string[] | undefined) => {
        setCurrentStartDate(startDate);
        setCurrentEndDate(endDate);
        setCurrentPage(1); // Reset to the first page when a new query is entered
    }

    const handlePreviousPage = () => {
        if (!transactionCustomerResponse?.data.first) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!transactionCustomerResponse?.data.last) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
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
            <CustomerInputDate startDate={currentStartDate} endDate={currentEndDate} onDateChange={handleDateChange} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Purchases
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Purchased
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionCustomerResponse?.data.totalElements !== 0 ? (
                        transactionCustomerResponse?.data?.content?.map((customer: TransactionCustomerPurchases, index) => (
                            <tr
                                key={customer.customer_code}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <Image className="w-10 h-10 rounded-full" src="/assets/profile-picture.jpg" alt="Profile Picture" width={40} height={40} />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{customer.name}</div>
                                        <div className="font-normal text-gray-500">{getGenderName(customer.gender)} / {getAgeFromBirthDate(customer.birth_date)} y/o</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4 text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {customer.total_purchased} qty
                                </td>
                                <td className="px-6 py-4 text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {convertToCurrency(customer.total_price)}
                                </td>
                                <td className="px-6 py-4 text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {getHumanReadableDatetimeV2(customer.created_at)}
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
                        {transactionCustomerResponse?.data.totalPages &&
                        Array.from(Array(transactionCustomerResponse?.data.totalPages).keys()).map((pageNumber) => (
                            <button
                                type="button"
                                key={pageNumber}
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                    currentPage === pageNumber + 1
                                        ? "text-gray-700 bg-gray-200"
                                        : "text-gray-500 hover:bg-gray-50"
                                } focus:outline-none`}
                                onClick={() => setCurrentPage(pageNumber + 1)}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        onClick={handleNextPage}
                        disabled={currentPage === transactionCustomerResponse?.data.totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}