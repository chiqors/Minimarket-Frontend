import {HiOutlineX} from "react-icons/hi";

export default function AlertSuccess({message}: {message: string}) {
    return (
        <div className="alert alert-success">
            <div className="flex-1">
                <label className="mx-2">Success</label>
            </div>
            <button className="btn btn-ghost btn-sm rounded-btn">
                <HiOutlineX />
            </button>
        </div>
    );
}