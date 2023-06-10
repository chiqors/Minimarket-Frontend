"use client"

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import type { TransactionDetail } from '@/types/Transaction';

const TransactionDetailsSlider = ({ transactionDetails }: { transactionDetails: TransactionDetail[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const currentDetail = transactionDetails[currentIndex];
    const isFirstPage = currentIndex === 0;
    const isLastPage = currentIndex === transactionDetails.length - 1;

    return (
        <div className="mt-6">
            <hr className="border-gray-300 dark:border-gray-600" />
            <div className="mt-4">
                <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Product Details</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>Quantity</p>
                        <p>{currentDetail.quantity}</p>
                    </div>
                    <div>
                        <p>Product SKU</p>
                        <p>{currentDetail.product_sku}</p>
                    </div>
                    <div className="border rounded p-4">
                        <p className="font-medium mb-2">Snapshot Product</p>
                        {currentDetail.snapshot ? (
                            <div>
                                <p>Name: {currentDetail.snapshot.name}</p>
                                <p>Stock: {currentDetail.snapshot.stock}</p>
                                <p>Category: {currentDetail.snapshot.product_category?.name}</p>
                                <p>Price: {currentDetail.snapshot.price}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Snapshot not found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button
                    className={`flex items-center px-2 py-1 text-sm rounded ${
                        isFirstPage ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    }`}
                    onClick={handlePrev}
                    disabled={isFirstPage}
                >
                    <FaChevronLeft className="mr-1" /> Previous
                </button>
                <button
                    className={`flex items-center px-2 py-1 text-sm rounded ${
                        isLastPage ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    }`}
                    onClick={handleNext}
                    disabled={isLastPage}
                >
                    Next <FaChevronRight className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default TransactionDetailsSlider;