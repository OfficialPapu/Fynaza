"use client"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Breadcrumb } from '../../ui/Breadcrumb';
import { useState } from 'react';
import { Handshake, Home } from 'lucide-react';

export default function HelpCenter() {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Support", href: "#", icon: <Handshake className="w-4 h-4" /> },
        { label: "Help Center", href: "/support/help-center" }
    ]);
    return (
        <div>
            <div className="my-2"><Breadcrumb items={BreadcrumbView} /></div>

            <div className="min-h-screen bg-white text-black">
                <header className="py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
                        <div className="relative max-w-2xl">
                            <Input
                                type="text"
                                placeholder="What can we help you with?"
                                className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-black focus:ring-2 focus:ring-black"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-6 h-6" />
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-12">
                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6">Popular Topics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularTopics.map((topic, index) => (
                                <Link
                                    key={index}
                                    href={topic.link}
                                    className="group p-6 bg-brand-gray rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    <h3 className="text-xl font-medium mb-2 group-hover:text-white">{topic.title}</h3>
                                    <p className="text-gray-600 mb-4 group-hover:text-gray-300">{topic.description}</p>
                                    <span className="inline-flex items-center text-black group-hover:text-white">
                                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((category, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="justify-start text-left h-auto py-4 px-6 border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    <span className="text-lg font-medium">{category}</span>
                                </Button>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Need More Help?</h2>
                        <div className="bg-brand-gray p-8 rounded-lg">
                            <p className="text-lg mb-4">
                                Our support team is available 24/7 to assist you with any questions or concerns.
                            </p>
                            <Button className="bg-black text-white hover:bg-gray-800">Contact Support</Button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

const popularTopics = [
    {
        title: "Getting Started",
        description: "Learn how to create an account and set up your profile.",
        link: "/help/getting-started",
    },
    {
        title: "Making Transactions",
        description: "Understand how to send and receive payments securely.",
        link: "/help/transactions",
    },
    {
        title: "Account Security",
        description: "Discover best practices to keep your account safe.",
        link: "/help/security",
    },
    {
        title: "Fees and Limits",
        description: "Find information about our fee structure and transaction limits.",
        link: "/help/fees-and-limits",
    },
    {
        title: "Mobile App Guide",
        description: "Learn how to use all features of our mobile application.",
        link: "/help/mobile-app",
    },
    {
        title: "Troubleshooting",
        description: "Solutions for common issues and error messages.",
        link: "/help/troubleshooting",
    },
]

const categories = [
    "Account Management",
    "Payments",
    "Security",
    "Mobile App",
    "Business Accounts",
    "Integrations",
    "Legal & Compliance",
    "Developers",
]

