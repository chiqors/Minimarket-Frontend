import {Customer, Employee} from "@/types/Person";
import {Product} from "@/types/Product";
import {PageJSONResponse} from "@/types/misc/JSONResponse";

export interface FormTransactionRequest {
    customer: {
        customer_code: string;
    }
    employee: {
        employee_code: string;
    }
    transaction_details: TransactionDetailRequest[];
}

export interface TransactionDetailRequest {
    quantity: number;
    product_sku: string;
}

/**
 * @interface TransactionBetweenDate
 *
 * @property {number} status
 * @property {string} transaction_code
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} total_products
 * @property {number} total_price
 * @property {string} customer_name
 * @property {string} employee_name
 */
export interface TransactionBetweenDate {
    status: number;
    transaction_code: string;
    created_at: string;
    updated_at: string;
    total_products: number;
    total_price: number;
    customer_name: string;
    employee_name: string;
}

/**
 * @interface TransactionCustomerPurchases
 *
 * @property {string} customer_code
 * @property {string} name
 * @property {string} gender
 * @property {string} birth_date
 * @property {string} address
 * @property {string} phone_number
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} total_price
 * @property {number} total_purchased
 */
export interface TransactionCustomerPurchases extends Customer {
    total_price: number;
    total_purchased: number;
}

/**
 * @interface Transaction
 *
 * @property {number} status
 * @property {string} transaction_code
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} total_products
 * @property {number} total_price
 * @property {TransactionDetail[]} transaction_details
 * @property {Customer} customer
 * @property {Employee} employee
 */
export interface Transaction {
    status: number;
    transaction_code: string;
    created_at: string;
    updated_at: string;
    total_products: number;
    total_price: number;
    transaction_details: TransactionDetail[];
    customer: Customer;
    employee: Employee;
}

/**
 * @interface TransactionDetail
 *
 * @property {number} quantity
 * @property {string} transaction_code
 * @property {string} product_sku
 * @property {Product} snapshot
 */
export interface TransactionDetail {
    quantity: number;
    transaction_code: string;
    product_sku: string;
    snapshot: Product;
}

/**
 * @interface MostPurchaseProduct
 *
 * @property {string} name
 * @property {string} category
 * @property {string} sku_code
 * @property {number} total_purchased
 */
export interface MostPurchaseProduct {
    name: string;
    category: string;
    sku_code: string;
    total_purchased: number;
}

/**
 * @interface TransactionBetweenDateResponseData
 *
 * @property {PageJSONResponse<T>} data_pagination
 * @property {double} total_price
 */
export interface TransactionBetweenDateResponseData<T> {
    data_pagination: PageJSONResponse<T>;
    total_price: double;
}