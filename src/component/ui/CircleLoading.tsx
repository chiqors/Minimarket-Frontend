export default function CircleLoading({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center justify-center w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            <div className="mt-4 text-xl font-bold text-gray-700">{message}</div>
        </div>
    );
}