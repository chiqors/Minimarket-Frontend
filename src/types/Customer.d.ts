/**
 * @interface CustomerResponse
 *
 * @property {string} message
 * @property {Object} data
 * @property {Customer[]} data.content
 * @property {array} errors
 * @property {number} http_code
 */
export interface CustomerResponse {
    message: string;
    data: {
        content: Customer[];
        pageable: {
            sort: {
                empty: boolean;
                sorted: boolean;
                unsorted: boolean;
            };
            offset: number;
            pageSize: number;
            pageNumber: number;
            unpaged: boolean;
            paged: boolean;
        };
        totalElements: number;
        totalPages: number;
        last: boolean;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    };
    errors: null;
    http_code: number;
}

/**
 * @interface Customer
 *
 * @property {string} name
 * @property {string} gender
 * @property {string} birth_date
 * @property {string} address
 * @property {string} phone_number
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} customer_code
 */
export interface Customer {
    name: string;
    gender: string;
    birth_date: string;
    address: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    customer_code: string;
}