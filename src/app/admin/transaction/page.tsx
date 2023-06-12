import TransactionCard from "@/app/admin/transaction/TransactionCard";
import Link from "next/link";

import {BsFillAwardFill, BsFillCalendarDateFill, BsFillCartPlusFill} from "react-icons/bs";
import {FaPersonBooth} from "react-icons/fa";

export default function TransactionPage({ params }: { params: { [key: string]: string | string[] | undefined } }) {
    const page = parseInt((params.page as string) || '1');
    const size = parseInt((params.size as string) || '3');

    return (
        <div className="mx-auto max-w-4xl mt-4">
            <h1 className="text-3xl font-bold mb-3">Transaction List</h1>
            <Link href={`/admin/transaction/add`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                <BsFillCartPlusFill className="inline-block mr-1 mb-0.5" /> Add
            </Link>
            <Link href={`/admin/transaction/trx-date`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
                <BsFillCalendarDateFill className="inline-block mr-1 mb-0.5" /> Date Range
            </Link>
            <Link href={`/admin/transaction/trx-top-purchases`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
                <BsFillAwardFill className="inline-block mr-1 mb-0.5" /> Top 3 Purchases
            </Link>
            <Link href={`/admin/transaction/trx-customer`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
                <FaPersonBooth className="inline-block mr-1 mb-0.5" /> Customer Purchases
            </Link>
            <hr className="my-5" />
            <TransactionCard page={page} size={size}/>
        </div>
    );
}