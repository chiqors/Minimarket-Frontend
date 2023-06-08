"use client"

import { useEffect, useState } from 'react';

import type {Product, ProductResponse} from "@/types/Product";

export default function ProductTable({data}: {data: ProductResponse}) {
    const [products, setProducts] = useState<ProductResponse>(data);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">SKU Code</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3">Updated At</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.data?.content?.map((product: Product) => (
                        <tr key={product.sku_code} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4">{product.price}</td>
                            <td className="px-6 py-4">{product.stock}</td>
                            <td className="px-6 py-4">{product.sku_code}</td>
                            <td className="px-6 py-4">{product.created_at}</td>
                            <td className="px-6 py-4">{product.updated_at}</td>
                            <td className="px-6 py-4">
                                <button type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Edit
                                </button>
                                <button type="button"
                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-6">
                <div className="flex-1 flex justify-between items-center">
                    <button type="button"
                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none">
                        Prev
                    </button>
                    <button type="button"
                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}