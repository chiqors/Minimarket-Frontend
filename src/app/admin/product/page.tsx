import ProductTable from "@/app/admin/product/ProductTable";

export default function ProductPage(
    {
        searchParams
    }: {
        searchParams: { [key: string]: string | string[] | undefined };
    }) {

    const name = (searchParams.name as string) || '';
    const page = parseInt((searchParams.page as string) || '1');
    const size = parseInt((searchParams.size as string) || '5');

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Product List</h1>
            <ProductTable name={name} page={page} size={size}/>
        </div>
    );
}