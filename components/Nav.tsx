 'use client';
 import Image from "next/image";
 import Link from "next/link";
 import { useState } from "react";

const NavList = [
    {
        tag: 'Home',
        link: '/'
    },
    {
        tag: 'Products',
        link: '#products'
    },
    {
        tag: 'Vendors',
        link: '#vendors'
    },
    {
        tag: 'About',
        link: '#about'
    },
    {
        tag: 'Contact',
        link: '#contact'
    },
]

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src="/img/Dark@2x.png" alt="MultiVendor Logo" width={100} height={50} className="cursor-pointer" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {NavList.map(({tag, link}, index) => (
                            <Link
                                key={index}
                                href={link}
                                className="text-gray-700 hover:text-[#159C47] transition-colors font-medium"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {NavList.map(({tag, link}, index) => (
                                <Link
                                    key={index}
                                    href={link}
                                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}