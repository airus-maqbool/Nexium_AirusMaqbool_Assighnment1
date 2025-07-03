"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar(){
    const pathname = usePathname();
    const linkClass = (path: string)=> `px-4 py-2 font-medium rounded ${pathname==path ? "text-green-500" : "text-white"}`;
    return (
        <nav className="mb-6 flex gap-4 items-center justify-center">
            <Link href="/quote-generator"className={linkClass("/quote-generator")} > Quote Generator</Link>
            <Link href="/favourites"className={linkClass("/favourites")} >Favourites</Link>
        </nav>
    );
}