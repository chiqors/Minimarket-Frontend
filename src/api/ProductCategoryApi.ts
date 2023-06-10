import { APP_BACKEND_URL } from "@/config";

const API_URL = APP_BACKEND_URL + '/api';

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