import {getMostPurchaseProduct} from '@/api/TransactionApi'
import {JSONResponse} from "@/types/misc/JSONResponse";
import {MostPurchaseProduct} from "@/types/Transaction";

async function getData() {
    const response = await fetch(getMostPurchaseProduct(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: {
            revalidate: 10
        }
    });

    return await response.json() as JSONResponse<MostPurchaseProduct[]>;
}

export default async function TransactionTopPurchasesPage() {
    const mostPurchaseProductResponse: JSONResponse<MostPurchaseProduct[]> = await getData();

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Transaction Top 3 Purchases</h1>
            <hr className="my-5" />
            <div className="mx-auto max-w-4xl mt-4">
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Product SKU Code</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Total Purchases</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostPurchaseProductResponse.data.map((product: MostPurchaseProduct) => (
                        <tr key={product.sku_code}>
                            <td className="border px-4 py-2">{product.sku_code}</td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.category}</td>
                            <td className="border px-4 py-2">{product.total_purchased}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}