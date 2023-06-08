import ProductTable from "@/app/admin/product/ProductTable";

import type {ProductResponse} from "@/types/Product";

async function getData(name?: string, page?: number, size?: number): Promise<ProductResponse> {
    let url = process.env.BACKEND_URL + '/api/products';

    // Append query parameters if provided
    if (name || page || size) {
        url += '?';

        if (name) {
            url += 'name=' + name;
        }

        if (page) {
            url += (name ? '&' : '') + 'page=' + page;
        }

        if (size) {
            url += ((name || page) ? '&' : '') + 'size=' + size;
        }
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 10,
        },
    });

    return await response.json();
}

export default async function ProductPage(
    {
        searchParams
    }: {
        searchParams: { [key: string]: string | string[] | undefined };
    }) {

    const data = await getData(searchParams.name as string, Number(searchParams.page), Number(searchParams.size));

    return (
        <>
            <h1 className="text-3xl font-bold mb-3">Product List</h1>
            <div className="flex justify-end mb-3">
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Add New
                </button>
            </div>

            <ProductTable data={data} />
        </>
    );
}