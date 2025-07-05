"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar(){
    const pathname = usePathname(); //will have current url path
    const linkClass = (path: string)=> `px-3 py-2 font-medium rounded text-lg ${pathname==path ? "text-purple-700" : "text-black"}`;
    return (
        <nav className=" bg-white flex gap-4 items-center justify-center p-3">
            <Link href="/quote-generator"className={linkClass("/quote-generator")} > Quote Generator</Link>
            <Link href="/favourites"className={linkClass("/favourites")} >Favourites</Link>
        </nav>
    );
}