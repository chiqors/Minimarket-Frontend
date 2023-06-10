"use client"

import {FormEvent, useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {getProductBySlug, getAllProductCategoryForDropdown, updateProduct} from "@/api/ProductApi";
import Image from "next/image";
import useSWR from "swr";
import CircleLoading from "@/components/ui/CircleLoading";
import ErrorAlert from "@/components/ui/ErrorAlert";

import type {FormProductRequest, Product} from "@/types/Product";
import type {ProductCategory} from "@/types/Product";
import type {JSONResponse} from "@/types/misc/JSONResponse";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UpdateProductPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [productCategorySku, setProductCategorySku] = useState<string | undefined>(undefined);
    const [image, setImage] = useState("");

    const [errorFlash, setErrorFlash] = useState<JSONResponse<Product> | null>(null);

    const router = useRouter();

    const {data: productResponse, error: productError, isLoading: productIsLoading} = useSWR<JSONResponse<Product>>(
        getProductBySlug(slug),
        fetcher
    );

    const {data: productCategoryResponse, error: productCategoryError, isLoading: productCategoryIsLoading} = useSWR<JSONResponse<ProductCategory[]>>(
        getAllProductCategoryForDropdown(),
        fetcher
    );

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productCategory: ProductCategory = {
            sku_created: productCategorySku
        }

        const product: FormProductRequest = {
            slug: slug,
            name: name,
            description: description,
            price: price,
            stock: stock,
            product_category: productCategory,
        }

        const response = await updateProduct(product);
        if (response.http_code === 200) {
            await router.push("/admin/product");
        } else {
            setErrorFlash(response);
        }
    }

    const handlePhoto = (e: FormEvent<HTMLInputElement>) => {
        console.log("Photo");
    }

    useEffect(() => {
        if (productResponse) {
            setName(productResponse.data.name);
            setDescription(productResponse.data.description);
            setPrice(productResponse.data.price);
            setStock(productResponse.data.stock);
            setProductCategorySku(productResponse.data.product_category.sku_created);
        }
    }, [productResponse]);

    if (productCategoryError || productError) {
        console.log(productCategoryError);
    }

    if (productCategoryIsLoading || productIsLoading) {
        return (
            <div className="flex justify-center items-center">
                <CircleLoading/>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Edit Product</h1>

            <div className="flex justify-between space-x-4">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className="text-gray-400 text-xs">(Slug cannot be changed)</span>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price (Rp)
                            </label>
                            <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Stock
                            </label>
                            <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter stock"
                                value={stock}
                                onChange={(e) => setStock(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={productCategorySku}
                                onChange={(e) => setProductCategorySku(e.target.value)}
                            >
                                <option value={""}>Select category</option>
                                {productCategoryResponse?.data.map((category) => (
                                    <option key={category.sku_created} value={category.sku_created}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full px-3 py-4 text-white bg-yellow-500 rounded-md focus:bg-yellow-600 focus:outline-none hover:bg-yellow-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    {errorFlash && <ErrorAlert error={errorFlash}/>}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="h-48 w-48 bg-base-100 shadow-xl overflow-hidden">
                            <Image src={"/assets/profile-picture.jpg"} width={200} height={200} alt={"Profile Picture"} priority={true} />
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                                <span>Upload Photo</span>
                                <input
                                    type="file"
                                    name="photo_file"
                                    hidden
                                    onChange={handlePhoto}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}