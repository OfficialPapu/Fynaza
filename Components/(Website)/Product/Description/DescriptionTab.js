import React from 'react'
import { TabsContent } from "@/Components/ui/tabs"
import { Card, CardContent } from "@/Components/ui/card"
const DescriptionTab = () => {
    return (
        <TabsContent value="description" className="mt-6">
            <Card className="border-none">
                <CardContent className="p-6">
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
                        <h1>Product Overview</h1>
                        <p>
                            Welcome to our latest innovation in comfort and style. This product represents the pinnacle of design
                            and functionality.
                        </p>

                        <h2>Key Features</h2>
                        <ul>
                            <li>Ergonomic design for maximum comfort</li>
                            <li>Durable materials ensure longevity</li>
                            <li>Versatile use for various settings</li>
                        </ul>

                        <h3>Design Philosophy</h3>
                        <p>
                            Our team of expert designers have crafted this product with both form and function in mind. Every
                            curve, every material choice has been carefully considered.
                        </p>

                        <img
                            src="https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg"
                            alt="Product Design Sketch"
                            className="w-[50vh] rounded-lg shadow-md my-4"
                        />

                        <h4>Materials Used</h4>
                        <p>We've sourced the finest materials to ensure durability without compromising on style:</p>
                        <ol>
                            <li>High-grade aluminum frame</li>
                            <li>Premium fabric upholstery</li>
                            <li>Eco-friendly padding materials</li>
                        </ol>

                        <blockquote>
                            "This product has revolutionized my daily routine. I can't imagine life without it now!" - Satisfied
                            Customer
                        </blockquote>

                        <h5>Care Instructions</h5>
                        <p>To maintain the quality of your product, follow these simple care instructions:</p>
                        <ul>
                            <li>Clean with a damp cloth</li>
                            <li>Avoid direct sunlight for prolonged periods</li>
                            <li>Regular maintenance checks recommended</li>
                        </ul>

                        <h6>Additional Resources</h6>
                        <p>For more information, check out our detailed video guide:</p>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg shadow-md"
                            ></iframe>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default DescriptionTab
