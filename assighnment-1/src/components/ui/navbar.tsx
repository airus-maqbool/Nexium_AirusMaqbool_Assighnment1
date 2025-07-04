"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar(){
    const pathname = usePathname(); //will have current url path
    const linkClass = (path: string)=> `px-4 py-2 font-medium rounded ${pathname==path ? "text-green-600" : "text-black"}`;
    return (
        <nav className="mb-3 flex gap-4 items-center justify-center">
            <Link href="/quote-generator"className={linkClass("/quote-generator")} > Quote Generator</Link>
            <Link href="/favourites"className={linkClass("/favourites")} >Favourites</Link>
        </nav>
    );
}