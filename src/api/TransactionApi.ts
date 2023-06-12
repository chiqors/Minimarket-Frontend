import {APP_BACKEND_URL} from "@/config";
import type {FormTransactionRequest, Transaction} from "@/types/Transaction";
import type {JSONResponse} from "@/types/misc/JSONResponse";
import {getDateAWeekAgo, getDateToday} from "@/util/Helper";

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
 * Get a list of transaction and the total of transaction in between date
 *
 * @param start_date start date
 * @param end_date end date
 * @param page page number
 * @param size page size
 * @return ResponseEntity with status code and JSONResponse
 */
export const getTransactionByDate = (start_date: string | number | readonly string[] | undefined, end_date: string | number | readonly string[] | undefined, page: number, size: number) => {
     const params = new URLSearchParams();
     if (start_date) params.append('start_date', start_date.toString());
     if (end_date) params.append('end_date', end_date.toString());
     params.append('page', page.toString());
     params.append('size', size.toString());

     return `${API_URL}/transactions/date?${params.toString()}`;
}

/**
 * Get the three most bought product
 *
 * @return List of MostPurchaseProductDTO
 */
export const getMostPurchaseProduct = () => {
    return `${API_URL}/transactions/most-purchase-product`;
}

/**
 * Get the list of customer who purchased items from transactions in between date
 *
 * @param start_date Start date of transaction
 * @param end_date End date of transaction
 * @return List of CustomerPurchasedDTO
 */
export const getCustomerPurchased = (start_date: string, end_date: string) => {
    return `${API_URL}/transactions/customer-purchased?start_date=${start_date}&end_date=${end_date}`;
}

/**
 * Get the list of product that often purchased by customer
 * Desc: User input product skuCode, then the system will return the list of product that often purchased with the input product by customer
 *
 * @param skuCode Product skuCode
 * @return List of MostPurchasedProductDTO
 */
export const getMostPurchasedProductBySkuCode = (skuCode: string) => {
    return `${API_URL}/transactions/most-purchased-product/${skuCode}`;
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