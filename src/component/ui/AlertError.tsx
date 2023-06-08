import {HiOutlineX} from "react-icons/hi";

export default function AlertError({message}: {message: string}) {
    return (
        <div className="alert alert-error">
            <div className="flex-1">
                <label className="mx-2">Error</label>
            </div>
            <button className="btn btn-ghost btn-sm rounded-btn">
                <HiOutlineX />
            </button>
        </div>
    );
}