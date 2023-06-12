import CustomerTable from "@/app/admin/transaction/trx-customer/CustomerTable";
import {getDateAWeekAgo, getDateToday} from "@/util/Helper";

export default function TransactionCustomerPage({ params }: { params: { [key: string]: string | string[] | undefined } }) {
    const page = parseInt((params.page as string) || '1');
    const size = parseInt((params.size as string) || '3');
    const startDate = params.start_date as string || getDateAWeekAgo();
    const endDate = params.end_date as string || getDateToday();

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Customer Purchases In Between Date</h1>
            <hr className="my-5" />
            <CustomerTable page={page} size={size} startDate={startDate} endDate={endDate} />
        </div>
    );
}