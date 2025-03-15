import { Search } from 'lucide-react';
import React from 'react'

const SearchDesktop = () => {
    return (
        <>
            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-2xl">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-4 py-2 bg-muted rounded-md outline-none"
                    />
                </div>
            </div>
        </>
    )
}


const SearchMobile = () => {
    return (
        <>
            <div className="lg:hidden py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-4 py-2 bg-muted rounded-md outline-none"
                    />
                </div>
            </div>
        </>
    )
}

export { SearchDesktop, SearchMobile }
