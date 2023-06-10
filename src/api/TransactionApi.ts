import {APP_BACKEND_URL} from "@/config";
import type {FormTransactionRequest, Transaction} from "@/types/Transaction";
import type {JSONResponse} from "@/types/misc/JSONResponse";

const API_URL = APP_BACKEND_URL + '/api';

/**
 * Get all transactions
 *
 * @param page Page number
 * @param size Page size
 * @returns String URL Generated
 */
export const getAllTransactions = (page?: number, size?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (size) params.append('size', size.toString());

    return `${API_URL}/transactions?${params.toString()}`;
};

/**
 * Get transaction by transaction code
 *
 * @param transactionCode
 */
export const getTransactionByTransactionCode = (transactionCode: string) => {
    return `${API_URL}/transactions/view/${transactionCode}`;
}

/**
 * Add transaction
 *
 * @param transaction form data
 * @returns JSONResponse FormTransactionRequest
 */
export async function addTransaction (transaction: FormTransactionRequest)  {
    const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });

    return await response.json() as JSONResponse<Transaction>;
}