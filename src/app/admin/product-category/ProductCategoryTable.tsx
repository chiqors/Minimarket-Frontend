"use client";

import useSWR from "swr";
import Link from "next/link";

import { getAllProductCategory } from "@/api/ProductApi";
import CircleLoading from "@/components/ui/CircleLoading";
import {getHumanReadableDatetime} from "@/util/Helper";

import { useState } from "react";
import type { JSONResponse, PageJSONResponse } from "@/types/misc/JSONResponse";
import type { ProductCategory } from "@/types/Product";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductCategoryTable({ name, page, size }: { name: string; page: number; size: number }) {
    const [searchQuery, setSearchQuery] = useState(name);
    const [currentPage, setCurrentPage] = useState(page);
    const [currentSize, setCurrentSize] = useState(size);

    const { data: productCategoryResponse, error, isLoading } = useSWR<JSONResponse<PageJSONResponse<ProductCategory>>>(
        () => getAllProductCategory(searchQuery, currentPage, currentSize),
        fetcher
    );

    const handlePreviousPage = () => {
        if (!productCategoryResponse?.data.first) {
            setCurrentPage((prevPage) => prevPage - 1);
            setSearchQuery("");
        }
    };

    const handleNextPage = () => {
        if (!productCategoryResponse?.data.last) {
            setCurrentPage((prevPage) => prevPage + 1);
            setSearchQuery("");
        }
    };

    if (error) {
        console.log(error);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <CircleLoading />
            </div>
        );
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-transparent">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SKU Created Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {productCategoryResponse?.data.content.map((productCategory: ProductCategory) => (
                        <tr key={productCategory.slug} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-${productCategory.sku_created}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`checkbox-${productCategory.sku_created}`} className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {productCategory.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {productCategory.sku_created}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {getHumanReadableDatetime(productCategory.created_at)}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                                <Link href={`/admin/product-category/${productCategory.slug}`} className="text-blue-600 hover:text-blue-900">
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex-1 flex justify-between items-center">
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="hidden md:flex">
                        {/* Render page numbers */}
                        {productCategoryResponse?.data.totalPages &&
                            Array.from(Array(productCategoryResponse?.data.totalPages).keys()).map((index) => {
                                const pageNumber = index + 1;
                                const isCurrentPage = pageNumber === currentPage;

                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`relative inline-flex items-center px-4 py-2 border ${
                                            isCurrentPage
                                                ? 'bg-blue-500 text-white'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        } text-sm font-medium rounded-md focus:outline-none`}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                    </div>
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        onClick={handleNextPage}
                        disabled={currentPage === productCategoryResponse?.data.totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
