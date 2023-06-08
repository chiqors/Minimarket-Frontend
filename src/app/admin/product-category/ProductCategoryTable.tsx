"use client"

import { useEffect, useState } from 'react';

import type {ProductCategory, ProductCategoryResponse} from "@/types/ProductCategory";

export default function ProductCategoryTable({data}: {data: ProductCategoryResponse}) {
    const [productCategories, setProductCategories] = useState<ProductCategoryResponse>(data);

    useEffect(() => {
        setProductCategories(data);
    }, [data]);

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Slug</th>
                            <th scope="col" className="px-6 py-3">SKU Created</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3">Updated At</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productCategories?.data?.content?.map((productCategory: ProductCategory) => (
                        <tr key={productCategory.sku_created} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {productCategory.name}
                            </td>
                            <td className="px-6 py-4">{productCategory.slug}</td>
                            <td className="px-6 py-4">{productCategory.sku_created}</td>
                            <td className="px-6 py-4">{productCategory.created_at}</td>
                            <td className="px-6 py-4">{productCategory.updated_at}</td>
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
        </>
    );
}