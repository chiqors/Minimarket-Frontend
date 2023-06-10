import {getProductBySlug} from '@/api/ProductApi';
import {ProductResponse} from "@/types/Product";
import {convertToCurrency, getHumanReadableDatetime} from "@/util/Helper";

async function getData(slug: string) {
    const response = await fetch(getProductBySlug(slug), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 10
        }
    });

    console.log(response);
    return await response.json() as ProductResponse;
}

export default async function ProductView({ params }: { params: { slug: string } }) {
    const productResponse: ProductResponse = await getData(params.slug);

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">View Product</h1>
            <div className="flex flex-col bg-white p-4 rounded-md shadow-md dark:bg-gray-800">
                <div className="flex flex-row justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">{productResponse.data.name}</h2>
                        <p>{productResponse.data.description}</p>
                        <p>Stock: {productResponse.data.stock}</p>
                        <p>Category: {productResponse.data.product_category?.name}</p>
                        <p>SKU Code: {productResponse.data.sku_code}</p>
                    </div>
                    <div>
                        <img src={"/assets/product.png"} alt="Product" className="w-64"/>
                    </div>
                </div>
                <div>
                    <p>Price: {convertToCurrency(productResponse.data.price)}</p>
                    {productResponse.data.updated_at ? (
                        <div>
                            Last updated: {getHumanReadableDatetime(productResponse.data.updated_at)}
                        </div>
                    ) : (
                        <div>
                            Created at: {getHumanReadableDatetime(productResponse.data.created_at)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}