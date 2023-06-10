import CustomerTable from "@/app/admin/customer/CustomerTable";

export default function CustomerPage(
    {
        searchParams
    }: {
        searchParams: { [key: string]: string | string[] | undefined };
    }) {
    const name = searchParams.name ? String(searchParams.name) : '';
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const size = searchParams.size ? Number(searchParams.size) : 3;

    return (
        <>
            <h1 className="text-3xl font-bold mb-3">Customer List</h1>
            <div className="flex justify-end mb-3">
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Add New
                </button>
            </div>

            <CustomerTable name={name} page={page} size={size} />
        </>
    );
}