import TransactionCard from "@/app/admin/transaction/TransactionCard";
import Link from "next/link";

import {BsFillCalendarDateFill, BsFillCartPlusFill} from "react-icons/bs";

export default function TransactionPage({ params }: { params: { [key: string]: string | string[] | undefined } }) {
    const page = parseInt((params.page as string) || '1');
    const size = parseInt((params.size as string) || '3');

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Transaction List</h1>
            <Link href={`/admin/transaction/add`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <BsFillCartPlusFill className="inline-block mr-2 mb-1" /> Add Transaction
            </Link>
            <Link href={`/admin/transaction/trx-date`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                <BsFillCalendarDateFill className="inline-block mr-2 mb-1" /> Transaction Between Date
            </Link>
            <hr className="my-5" />
            <TransactionCard page={page} size={size}/>
        </div>
    );
}