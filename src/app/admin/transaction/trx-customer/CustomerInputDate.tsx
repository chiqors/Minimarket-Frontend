"use client"

import {FormEvent, useCallback, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function CustomerInputDate ({ startDate, endDate, onDateChange }: { startDate: string | number | readonly string[] | undefined, endDate: string | number | readonly string[] | undefined, onDateChange: (startDate: string | number | readonly string[] | undefined, endDate: string | number | readonly string[] | undefined) => void }) {
    const [currentStartDate, setCurrentStartDate] = useState(startDate);
    const [currentEndDate, setCurrentEndDate] = useState(endDate);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!


    const handleFilter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onDateChange(currentStartDate, currentEndDate);
    };

    return (
        <div className="relative mt-1">
            <form onSubmit={handleFilter}>
                <input
                    type="date"
                    id="start_date"
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input Start Date"
                    value={currentStartDate}
                    onChange={(e) => setCurrentStartDate(e.target.value)}
                />
                <input
                    type="date"
                    id="end_date"
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input End Date"
                    value={currentEndDate}
                    onChange={(e) => setCurrentEndDate(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Filter
                </button>
            </form>
        </div>
    );
};