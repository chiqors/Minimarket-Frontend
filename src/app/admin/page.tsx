import {redirect} from "next/navigation";

export default function Home() {
    redirect('/admin/product-category');
}