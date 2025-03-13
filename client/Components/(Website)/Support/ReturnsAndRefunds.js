"use client"
import { RefreshCcw, Clock, DollarSign, ShieldCheck } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Breadcrumb } from '../../ui/Breadcrumb';
import { useState } from 'react';
import { Handshake, Home } from 'lucide-react';

export default function ReturnsAndRefunds() {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Support", href: "#", icon: <Handshake className="w-4 h-4" /> },
        { label: "Returns & Refunds", href: "/support/returns-and-refunds" }
    ]);
    return (
        <div>
            <div className="my-2"><Breadcrumb items={BreadcrumbView} /></div>
            <div className="min-h-screen bg-white text-black rounded-lg">
                <main className="mx-auto px-8 pb-12 pt-4">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8">Returns & Refunds</h1>

                    <section className="mb-12">
                        <p className="text-xl mb-6">
                            At Fynaza, we're committed to your satisfaction. Our returns and refunds policy is designed to be simple and
                            fair.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {policyHighlights.map((highlight, index) => (
                                <div key={index} className="flex items-start">
                                    {highlight.icon}
                                    <div className="ml-4">
                                        <h3 className="font-semibold mb-2">{highlight.title}</h3>
                                        <p className="text-gray-600">{highlight.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Separator className="my-8" />

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Return Process</h2>
                        <ol className="space-y-4">
                            {returnSteps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center mr-3 mt-1">
                                        {index + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <Separator className="my-8" />

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-brand-light p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Need More Information?</h2>
                        <p className="mb-4">If you have any questions about returns or refunds, our support team is here to help.</p>
                        <Button className="bg-black text-white hover:bg-gray-800">Contact Support</Button>
                    </div>
                </main>
            </div>
        </div>
    )
}

const policyHighlights = [
    {
        icon: <RefreshCcw className="w-6 h-6 text-black" />,
        title: "30-Day Returns",
        description: "Most items can be returned within 30 days of purchase.",
    },
    {
        icon: <Clock className="w-6 h-6 text-black" />,
        title: "Quick Processing",
        description: "Refunds are typically processed within 5-10 business days.",
    },
    {
        icon: <DollarSign className="w-6 h-6 text-black" />,
        title: "Full Refunds",
        description: "Receive a full refund to your original payment method.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-black" />,
        title: "Hassle-Free Returns",
        description: "Easy online return process with trackable shipping.",
    },
]

const returnSteps = [
    "Log into your Fynaza account and go to your order history.",
    "Select the item you wish to return and follow the prompts.",
    "Print the provided return shipping label.",
    "Pack the item securely with all original tags and accessories.",
    "Drop off the package at any authorized shipping location.",
    "Once received and inspected, we'll process your refund.",
]

const faqs = [
    {
        question: "What items are eligible for return?",
        answer:
            "Most items are eligible for return within 30 days of purchase, provided they are in original, unused condition with all tags attached. Some exceptions apply to personalized items or digital goods.",
    },
    {
        question: "Who pays for return shipping?",
        answer:
            "In most cases, customers are responsible for return shipping costs. If the return is due to our error or a defective product, we'll provide a free return shipping label.",
    },
    {
        question: "Can I exchange an item instead of returning it?",
        answer:
            "Yes, you can exchange items within the same 30-day return window. Simply initiate a return and select the 'exchange' option during the process.",
    },
    {
        question: "How long will it take to receive my refund?",
        answer:
            "Once we receive your return, refunds are typically processed within 5-10 business days. The time it takes for the refund to appear in your account may vary depending on your payment method and financial institution.",
    },
]

