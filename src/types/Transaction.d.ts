import {Customer, Employee} from "@/types/Person";
import {Product} from "@/types/Product";

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