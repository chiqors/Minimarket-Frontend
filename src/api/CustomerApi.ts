import { APP_BACKEND_URL } from "@/config";

const API_URL = APP_BACKEND_URL + '/api';

/**
 * Get all customer
 * @param name Search by name
 * @param page Page number
 * @param size Page size
 * @returns String URL Generated
 */
export const getAllCustomer = (name?: string, page?: number, size?: number) => {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (page) params.append('page', page.toString());
    if (size) params.append('size', size.toString());

    return `${API_URL}/customers?${params.toString()}`;
};