/**
 * @interface ProductCategoryResponse
 *
 * @property {string} message
 * @property {object} data
 * @property {ProductCategory[]} data.content
 * @property {array} errors
 * @property {number} http_code
 */
export interface ProductCategoryResponse {
    message: string;
    data: {
        content: ProductCategory[];
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
 * @interface ProductCategory
 *
 * @property {string} slug
 * @property {string} name
 * @property {string} sku_created
 * @property {string} created_at
 * @property {string} updated_at
 */
export interface ProductCategory {
    slug: string;
    name: string;
    sku_created: string;
    created_at: string;
    updated_at: string;
}