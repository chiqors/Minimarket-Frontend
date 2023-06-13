"use client"

import { CiViewTimeline } from "react-icons/ci";
import { FaListAlt } from "react-icons/fa";
import { BsChevronDoubleRight } from "react-icons/bs";
import Link from "next/link";
import useSWR from "swr";

import {getTransactionByDate} from "@/api/TransactionApi";

import type { Transaction, TransactionBetweenDateResponseData } from "@/types/Transaction";
import type { JSONResponse, PageJSONResponse } from "@/types/misc/JSONResponse";
import {convertToCurrency, getHumanReadableDatetimeV2} from "@/util/Helper";
import {useState} from "react";
import CircleLoading from "@/components/ui/CircleLoading";
import TransactionInputDate from "@/app/admin/transaction/trx-date/TransactionInputDate";
import {TransactionBetweenDate} from "@/types/Transaction";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TransactionCard({ page, size, startDate, endDate }: { page: number; size: number; startDate: string | number | readonly string[] | undefined; endDate: string | number | readonly string[] | undefined }) {
    const [currentPage, setCurrentPage] = useState(page);
    const [currentSize, setCurrentSize] = useState(size);

    const [currentStartDate, setCurrentStartDate] = useState(startDate);
    const [currentEndDate, setCurrentEndDate] = useState(endDate);

    const { data: transactionResponse, error, isLoading } = useSWR<JSONResponse<TransactionBetweenDateResponseData<PageJSONResponse<TransactionBetweenDate>>>>(
        getTransactionByDate(currentStartDate, currentEndDate, currentPage, currentSize),
        fetcher
    );

    const handleDateChange = (startDate: string | number | readonly string[] | undefined, endDate: string | number | readonly string[] | undefined) => {
        setCurrentStartDate(startDate);
        setCurrentEndDate(endDate);
        setCurrentPage(1); // Reset to the first page when a new query is entered
    }

    const handlePreviousPage = () => {
        if (!transactionResponse?.data.data_pagination.first) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!transactionResponse?.data.data_pagination.last) {
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
            <TransactionInputDate startDate={currentStartDate} endDate={currentEndDate} onDateChange={handleDateChange} />
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y-2 divide-gray-200">
                {/* i hate this TS error typing */}
                {transactionResponse?.data.data_pagination.content.map((transaction: TransactionBetweenDate) => (
                    <div key={transaction.transaction_code} className="px-4 py-5 sm:p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                    <FaListAlt className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5">
                                    <dl>
                                        <dt className="text-sm font-bold text-gray-700 truncate">
                                            {transaction.customer_name}
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <CiViewTimeline className="mr-1" />
                                                <span>
                                                    {getHumanReadableDatetimeV2(transaction.created_at)}
                                                </span>
                                            </span>
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                {/* Add your additional details here */}
                                                {/*Purchased: 2 items*/}
                                                {/*Total QTY: 4*/}
                                                <div className="flex flex-col">
                                                    <span className="text-gray-700">
                                                        Purchased: {transaction.total_products} items
                                                    </span>
                                                    <span className="text-gray-700">
                                                        Operator: {transaction.employee_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            {/* Add your details at the top right corner */}
                            <div className="flex flex-col items-end ml-auto">
                                <span className="text-gray-500">{transaction.transaction_code}</span>
                                <span className="px-2 py-1 text-sm font-semibold bg-gray-200 text-gray-800 mb-2">
                                    Total Price: {convertToCurrency(transaction.total_price)}
                                </span>
                                <Link href={"/admin/transaction/view/" + transaction.transaction_code} className="text-indigo-600 hover:text-indigo-500">
                                    View Details <BsChevronDoubleRight className="inline-block h-5 w-5" aria-hidden="true" />
                                </Link>
                                {/* Add more details if needed */}
                            </div>
                        </div>
                    </div>
                ))}
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
                    {transactionResponse?.data.data_pagination.totalPages &&
                        Array.from(Array(transactionResponse?.data.data_pagination.totalPages).keys()).map((index) => {
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
                    disabled={currentPage === transactionResponse?.data.data_pagination.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
        </>
    );
}
