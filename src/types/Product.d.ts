/**
 * @interface FormProductRequest
 *
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} stock
 * @property {string} slug
 * @property {string} sku_code
 * @property {ProductCategory} product_category
 */
export interface FormProductRequest {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    slug?: string;
    sku_code?: string;
    product_category?: ProductCategory;
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
    slug?: string;
    name?: string;
    sku_created?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RelatedMostPurchase {
    name: string;
    category: string;
    sku_code: string;
    total_purchased: number;
    stock: number;
    price: number;
}