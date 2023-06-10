"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import {BsFillPlusCircleFill} from "react-icons/bs";

import {deleteProduct, getAllProducts} from "@/api/ProductApi";
import CircleLoading from "@/components/ui/CircleLoading";
import {convertToCurrency, getHumanReadableDatetime, shortenDescription} from "@/util/Helper";

import { useState } from "react";
import type {Product, ProductPageResponse} from "@/types/Product";

import ProductSearch from "@/app/admin/product/ProductSearch";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductCategoryTable({ name, page, size }: { name: string; page: number; size: number }) {
    const [searchQuery, setSearchQuery] = useState(name);
    const [currentPage, setCurrentPage] = useState(page);
    const [currentSize, setCurrentSize] = useState(size);

    const { data: productPageResponse, error, isLoading, mutate } = useSWR<ProductPageResponse>(
        getAllProducts(searchQuery, currentPage, currentSize),
        fetcher
    );

    const handlePreviousPage = () => {
        if (!productPageResponse?.data.first) {
            setCurrentPage((prevPage) => prevPage - 1);
            setSearchQuery("");
        }
    };

    const handleNextPage = () => {
        if (!productPageResponse?.data.last) {
            setCurrentPage((prevPage) => prevPage + 1);
            setSearchQuery("");
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page when a new search query is entered
    };

    const handleDeleteProduct = async (product: Product) => {
        const confirm = window.confirm(`Are you sure you want to delete ${product.name}?`);
        if (confirm) {
            const response = await deleteProduct(product);
            if (response.http_code === 200) {
                await mutate();
            } else {
                console.log(response);
            }
        }
    }

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
            <div className="flex justify-between items-center">
                <ProductSearch onSearch={handleSearch} />
                <Link href={"/admin/product/add"} className={"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"}>
                    <BsFillPlusCircleFill className={"mr-2"} />
                    Create Product
                </Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Timestamp
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {productPageResponse?.data.content.map((product: Product) => (
                        <tr key={product.sku_code} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-32 p-4">
                                <Link href={`/admin/product/view/${product.slug}`}>
                                    <Image
                                        src={"/assets/product.png"}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className="rounded"
                                    />
                                </Link>
                            </td>
                            <th className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {product.name}
                                <div className="flex items-center space-x-3 mt-2">
                                    <span className="px-2 py-1 text-xs font-small text-green-800 bg-green-100 rounded-full">
                                        {product.product_category.name}
                                    </span>
                                </div>
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {shortenDescription(product.description)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-white">
                                {convertToCurrency(product.price)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {product.stock}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {product.updated_at ? (
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Last Updated
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {getHumanReadableDatetime(product.updated_at)}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Created
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {getHumanReadableDatetime(product.created_at)}
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                                <Link href={`/admin/product/edit/${product.slug}`}>
                                    <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
                                        Edit
                                    </span>
                                </Link>
                                <span className="text-gray-300 mx-2">|</span>
                                <span
                                    className="text-red-500 hover:text-red-600 cursor-pointer"
                                    onClick={() => handleDeleteProduct(product)}
                                >
                                    Delete
                                </span>
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
                        {productPageResponse?.data.totalPages &&
                            Array.from(Array(productPageResponse?.data.totalPages).keys()).map((index) => {
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
                        disabled={currentPage === productPageResponse?.data.totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
