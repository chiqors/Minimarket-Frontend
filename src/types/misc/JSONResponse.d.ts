/**
 * JSONResponse interface
 *
 * @property {number} http_code
 * @property {string} message
 * @property {T} data
 * @property {array} errors
 */
export interface JSONResponse<T> {
    http_code: number;
    message: string;
    data: T;
    errors: string[];
}

/**
 * PageJSONResponse interface
 *
 * @property {T[]} content
 * @property {object} pageable
 * @property {object} sort
 * @property {boolean} sort.empty
 * @property {boolean} sort.sorted
 * @property {boolean} sort.unsorted
 * @property {number} offset
 * @property {number} pageSize
 * @property {number} pageNumber
 * @property {boolean} unpaged
 * @property {boolean} paged
 * @property {number} totalElements
 * @property {number} totalPages
 * @property {boolean} last
 * @property {number} size
 * @property {number} number
 * @property {number} numberOfElements
 * @property {boolean} first
 * @property {boolean} empty
 */
export interface PageJSONResponse<T> {
    content: T[];
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
}