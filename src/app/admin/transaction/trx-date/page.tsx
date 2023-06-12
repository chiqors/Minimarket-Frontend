import TransactionCard from "@/app/admin/transaction/trx-date/TransactionCard";

export default function TransactionPage({ params }: { params: { [key: string]: string | string[] | undefined } }) {
    const page = parseInt((params.page as string) || '1');
    const size = parseInt((params.size as string) || '3');
    const startDate = params.start_date as string;
    const endDate = params.end_date as string;

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Transaction Between Date</h1>
            <hr className="my-5" />
            <TransactionCard page={page} size={size} startDate={startDate} endDate={endDate} />
        </div>
    );
}