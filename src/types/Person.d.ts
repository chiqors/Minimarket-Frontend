/**
 * @interface Customer children of Person
 *
 * @property {string} customer_code
 */
export interface Customer extends Person {
    customer_code: string;
}

/**
 * @interface Employee children of Person
 *
 * @property {string} employee_code
 * @property {Account} account
 */
export interface Employee extends Person {
    employee_code: string;
    account: Account;
}

/**
 * @interface Account
 *
 * @property {string} username
 * @property {string} email
 * @property {boolean} status
 * @property {number} role
 * @property {string} created_at
 * @property {string} updated_at
 */
export interface Account {
    username: string;
    email: string;
    status: boolean;
    role: number;
    created_at: string;
    updated_at: string;
}

/**
 * @interface Person
 *
 * @property {string} name
 * @property {string} gender
 * @property {string} birth_date
 * @property {string} address
 * @property {string} phone_number
 * @property {string} created_at
 * @property {string} updated_at
 */
export interface Person {
    name: string;
    gender: string;
    birth_date: string;
    address: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}