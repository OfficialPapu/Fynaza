"use client"
import React from "react"
import { useState } from "react"
import * as Slider from '@radix-ui/react-slider';
import { Checkbox } from "@/Components/ui/checkbox"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Star } from "lucide-react"
const Filter = ({ Products, Categories, setFilteredProducts, maxPrice }) => {
    const [priceRange, setPriceRange] = useState([0, maxPrice])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [minRating, setMinRating] = useState(0)

    const handlePriceChange = (value) => {
        setPriceRange(value)
    }

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category])
    }

    const handleRatingChange = (rating) => {
        setMinRating(rating === minRating ? 0 : rating)
    }

    const applyFilters = () => {
        const filtered = Products.filter(
            (product) =>
                (selectedCategories.length == 0 ||selectedCategories.includes(product.category)) &&
                (product.price >= priceRange[0] && product.price <= priceRange[1])
            // product.rating >= minRating,
        )
        setFilteredProducts(filtered)
    }

    const resetFilters = () => {
        setPriceRange([0, maxPrice])
        setSelectedCategories([])
        setMinRating(0)
        setFilteredProducts(Products)
    }
    return (
        <Card className="w-full lg:w-1/4 h-fit lg:sticky lg:top-4">
            <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your product search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                    <Slider.Root
                        className="relative flex items-center w-full h-6"
                        min={0}
                        max={maxPrice}
                        step={1}
                        value={priceRange}
                        onValueChange={(value) => handlePriceChange(value)}
                    >
                        <Slider.Track className="relative h-1 bg-gray-200 rounded-full flex-grow">
                            <Slider.Range className="absolute h-full bg-[#51ADF6] rounded-full" />
                        </Slider.Track>
                        <Slider.Thumb className="mr-2 block w-5 h-5 bg-[#2196F3] rounded-full cursor-pointer focus:outline-none" />
                        <Slider.Thumb className="ml-2 block w-5 h-5 bg-[#2196F3] rounded-full cursor-pointer focus:outline-none" />
                    </Slider.Root>

                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Rs. {priceRange[0]}</span>
                        <span>Rs. {priceRange[1]}</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Categories</h3>
                    {Categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2 mb-2 mt-2">
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <label
                                htmlFor={category}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Minimum Rating</h3>
                    <div className="flex sm:space-x-2 space-x-1 flex-wrap !md:justify-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <Button className="bg-white hover:bg-[#F4F4F5] mb-1"
                                key={rating}
                                variant="default"
                                onClick={() => handleRatingChange(rating)}
                            >
                                <Star className={`${rating <= minRating ? "fill-[#FAAF00] text-[#FAAF00]" : "text-black"}`} />
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={applyFilters} className="bg-gray-700 hover:bg-gray-800 duration-300">Apply Filters</Button>
                <Button variant="outline" onClick={resetFilters}>
                    Reset
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Filter
