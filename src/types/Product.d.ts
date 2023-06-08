import type {ProductCategory} from "@/types/ProductCategory";

/**
 * @interface ProductResponse
 *
 * @property {string} message
 * @property {object} data
 * @property {Product[]} data.content
 * @property {array} errors
 * @property {number} http_code
 */
export interface ProductResponse {
    message: string;
    data: {
        content: Product[];
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
 * @interface Product
 *
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} stock
 * @property {string} slug
 * @property {string} sku_code
 * @property {string} created_at
 * @property {string} updated_at
 * @property {ProductCategory} product_category
 */
export interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    slug: string;
    sku_code: string;
    created_at: string;
    updated_at: string;
    product_category: ProductCategory;
}