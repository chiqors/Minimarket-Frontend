"use client"

import { useState } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { addTransaction } from "@/api/TransactionApi";

import ErrorAlert from "@/components/ui/ErrorAlert";

import type {FormTransactionRequest, Transaction, TransactionDetailRequest} from "@/types/Transaction";
import {JSONResponse} from "@/types/misc/JSONResponse";

export default function TransactionAddPage() {
    const [customerCode, setCustomerCode] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetailRequest[]>([]);

    const [errorFlash, setErrorFlash] = useState<JSONResponse<Transaction> | null>(null);

    const router = useRouter();

    const handleAddTransaction = async(e: FormEvent) => {
        e.preventDefault();

        // Create the transaction object
        const transaction: FormTransactionRequest = {
            customer: {
                customer_code: customerCode,
            },
            employee: {
                employee_code: employeeCode,
            },
            transaction_details: transactionDetails,
        };

        // Send the transaction object to the backend API
        const response = await addTransaction(transaction);
        if (response.http_code === 201) {
            // Redirect to the transaction list page
            await router.push("/admin/transaction");
        } else {
            // Show the error flash
            setErrorFlash(response);
        }
    };

    const handleAddTransactionDetail = () => {
        setTransactionDetails((prevDetails) => [
            ...prevDetails,
            { product_sku: "", quantity: 0 },
        ]);
    };

    const handleTransactionDetailChange = (
        index: number,
        field: "product_sku" | "quantity",
        value: string | number
    ) => {
        setTransactionDetails((prevDetails) =>
            prevDetails.map((detail, i) =>
                i === index ? { ...detail, [field]: value } : detail
            )
        );
    };

    const handleRemoveTransactionDetail = (index: number) => {
        setTransactionDetails((prevDetails) =>
            prevDetails.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Add Transaction</h1>
            {errorFlash && <ErrorAlert error={errorFlash} />}
            <div className="flex justify-between space-x-4">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleAddTransaction}>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Customer Code:
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter customer code"
                                value={customerCode}
                                onChange={(e) => setCustomerCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Employee Code:
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter employee code"
                                value={employeeCode}
                                onChange={(e) => setEmployeeCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <h2 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                                Transaction Details:
                            </h2>
                            {transactionDetails.map((detail, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        className="w-1/2 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Product SKU"
                                        value={detail.product_sku}
                                        onChange={(e) =>
                                            handleTransactionDetailChange(
                                                index,
                                                "product_sku",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="w-1/4 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Quantity"
                                        value={detail.quantity}
                                        onChange={(e) =>
                                            handleTransactionDetailChange(
                                                index,
                                                "quantity",
                                                Number(e.target.value)
                                            )
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="px-2 py-1 text-sm rounded bg-red-500 text-white"
                                        onClick={() => handleRemoveTransactionDetail(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="px-2 py-1 text-sm rounded bg-blue-500 text-white"
                                onClick={handleAddTransactionDetail}
                            >
                                Add Detail
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 px-4 py-2 text-sm rounded bg-green-500 text-white"
                        >
                            Create Transaction
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}