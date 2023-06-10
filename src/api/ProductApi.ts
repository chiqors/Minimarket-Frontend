import { APP_BACKEND_URL } from "@/config";

import type {FormProductRequest, Product} from "@/types/Product";
import type {JSONResponse} from "@/types/misc/JSONResponse";

const API_URL = APP_BACKEND_URL + '/api';

/**
 * Get all products
 * @param name Search by name
 * @param page Page number
 * @param size Page size
 * @returns String URL Generated
 */
export const getAllProducts = (name?: string, page?: number, size?: number) => {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (page) params.append('page', page.toString());
    if (size) params.append('size', size.toString());

    return `${API_URL}/products?${params.toString()}`;
};

/**
 * Get all product category
 * @param name Search by name
 * @param page Page number
 * @param size Page size
 * @returns String URL Generated
 */
export const getAllProductCategory = (name?: string, page?: number, size?: number) => {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (page) params.append('page', page.toString());
    if (size) params.append('size', size.toString());

    return `${API_URL}/product-categories?${params.toString()}`;
};

/**
 * get all product category for dropdown
 *
 * @returns String URL Generated
 */
export const getAllProductCategoryForDropdown = () => {
    return `${API_URL}/product-categories/dropdown`;
}

/**
 * Get product by slug
 *
 * @param slug
 * @returns String URL Generated
 */
export const getProductBySlug = (slug: string) => {
    return `${API_URL}/products/${slug}`;
}

/**
 * Add product
 *
 * @param formProduct form product request to add
 * @returns response json
 */
export async function addProduct (formProduct: FormProductRequest) {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formProduct),
    });

    return await response.json() as JSONResponse<Product>
}

/**
 * Update product
 *
 * @param formProduct form product request to update
 * @returns response json
 */
export async function updateProduct (formProduct: FormProductRequest) {
    const response = await fetch(`${API_URL}/products`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formProduct),
    });

    return await response.json() as JSONResponse<Product>
}

/**
 * Delete product
 *
 * @param formProduct form product request to delete
 * @returns response json
 */
export async function deleteProduct (formProduct: FormProductRequest) {
    const response = await fetch(`${API_URL}/products`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formProduct),
    });

    return await response.json() as JSONResponse<Product>
}