"use client"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 py-10 border-t border-gray-200 flex flex-col md:flex-row gap-3 md:justify-between md:items-center bg-violet-50">
        <div className="flex flex-col gap-1">
            <Link href="/" className="flex flex-grow-0 flex-shrink-0 flex-basis-auto">
            <h1 className="text-2xl font-bold duration-200 ease-linear text-black">
                Doze
            </h1>
            </Link>
            <span className="block text-sm text-gray-500  dark:text-gray-400">© 2024 Doze™. All Rights Reserved.</span>
        </div>
            <ul className="flex gap-5 text-sm font-medium text-gray-500  dark:text-gray-40">
                <Link href="/about" className="hover:text-gray-400 rounded-full p-2  text-nowrap" >About us</Link>
                <Link href="/help" className="hover:text-gray-400 rounded-full p-2  text-nowrap" >Help center</Link>
                <Link href="/contact" className="hover:text-gray-400 rounded-full p-2  text-nowrap" >Contact</Link>
            </ul>



    </footer>
  )
}

export default Footer