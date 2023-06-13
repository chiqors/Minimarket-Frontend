import {getProductBySlug} from '@/api/ProductApi';
import {Product, RelatedMostPurchase} from "@/types/Product";
import {convertToCurrency, getHumanReadableDatetime} from "@/util/Helper";
import {JSONResponse} from "@/types/misc/JSONResponse";
import {getMostPurchasedProductBySkuCode} from "@/api/TransactionApi";

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

    return await response.json() as JSONResponse<Product>;
}

async function getRelatedMostPurchasedProducts(sku_code: string) {
    const response = await fetch(getMostPurchasedProductBySkuCode(sku_code), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 10
        }
    });

    return await response.json() as JSONResponse<RelatedMostPurchase[]>;
}

export default async function ProductView({ params }: { params: { slug: string } }) {
    const productResponse: JSONResponse<Product> = await getData(params.slug);
    const relatedMostPurchasedProductsResponse: JSONResponse<RelatedMostPurchase[]> = await getRelatedMostPurchasedProducts(productResponse.data.sku_code);

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
            <div className="mt-4">
                <h2 className="text-2xl font-bold mb-3">Related Most Purchased Products</h2>
                <div className="grid grid-cols-3 gap-4">
                    {relatedMostPurchasedProductsResponse.data.map((relatedProduct: RelatedMostPurchase) => (
                        <div key={relatedProduct.sku_code} className="flex flex-col bg-white p-4 rounded-md shadow-md dark:bg-gray-800">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{relatedProduct.name}</h2>
                                    <p>Stock: {relatedProduct.stock}</p>
                                    <p>Category: {relatedProduct.category}</p>
                                    <p>SKU Code: {relatedProduct.sku_code}</p>
                                </div>
                                <div>
                                    <img src={"/assets/product.png"} alt="Product" className="w-64"/>
                                </div>
                            </div>
                            <div>
                                <p>Price: {convertToCurrency(relatedProduct.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}