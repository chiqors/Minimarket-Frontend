import {FaCheckCircle, FaListAlt, FaTimesCircle} from "react-icons/fa";
import {getTransactionByTransactionCode} from "@/api/TransactionApi";

import TransactionDetailsSlider from "@/app/admin/transaction/view/[code]/TransactionDetailsSlider";

import type {JSONResponse} from "@/types/misc/JSONResponse";
import type {Transaction} from "@/types/Transaction";
import {convertToCurrency, getHumanReadableDatetimeV2} from "@/util/Helper";

async function getTransaction(code: string) {
    const res = await fetch(getTransactionByTransactionCode(code), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 10
        }
    });

    return await res.json() as JSONResponse<Transaction>
}

export default async function TransactionViewPage({ params }: { params: { code: string } }) {
    const transactionResponse: JSONResponse<Transaction> = await getTransaction(params.code);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y-2 dark:divide-gray-700">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-start">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                <FaListAlt className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div className="ml-5 flex-1">
                                <div className="flex items-center">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Transaction Details</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y-2 dark:divide-gray-700 mt-3">
                <div className="px-4 py-5 sm:p-6">
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Status</p>
                                <div className="flex items-center">
                                    {transactionResponse.data.status === 1 ? (
                                        <FaCheckCircle className="text-green-500 mr-2" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 mr-2" />
                                    )}
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transactionResponse.data.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {transactionResponse.data.status === 1 ? "Success" : "Failed"}
                        </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Transaction Code</p>
                                <p>{transactionResponse.data.transaction_code}</p>
                            </div>
                            <div>
                                <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Last Created</p>
                                <p>{getHumanReadableDatetimeV2(transactionResponse.data.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Total Products</p>
                                <p>{transactionResponse.data.total_products} item(s)</p>
                            </div>
                            <div>
                                <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Total Price</p>
                                <p>{convertToCurrency(transactionResponse.data.total_price)}</p>
                            </div>
                        </div>

                        {transactionResponse.data.transaction_details.length > 0 && (
                            <TransactionDetailsSlider transactionDetails={transactionResponse.data.transaction_details} />
                        )}

                        <hr className="mt-6 border-gray-300 dark:border-gray-600" />
                        <div className="mt-6">
                            <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Customer</p>
                            <p>Name: {transactionResponse.data.customer.name}</p>
                            {/* Additional customer details... */}
                        </div>

                        <hr className="mt-6 border-gray-300 dark:border-gray-600" />
                        <div className="mt-6">
                            <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Employee</p>
                            <p>Name: {transactionResponse.data.employee.name}</p>
                            {/* Additional employee details... */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}