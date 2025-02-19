"use client";
import Link from 'next/link';
import { Breadcrumb } from '../../ui/Breadcrumb';
import { useState } from 'react';
import { Handshake, Home } from 'lucide-react';

const PrivacyPolicy = () => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Support", href: "#", icon: <Handshake className="w-4 h-4" /> },
        { label: "Privacy Policy", href: "/support/privacy-policy" }
    ]);
    return (
        <div>
            <div className="my-2"><Breadcrumb items={BreadcrumbView} /></div>
            <main>
                <div className="container mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                        <p className="mb-8 text-lg">
                            At Fynaza, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website{' '}
                            <Link href="https://fynaza.com/">
                                <span className="font-semibold cursor-pointer">https://fynaza.com/</span>
                            </Link>.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                        <p className="mb-6">
                            We may collect the following types of information:
                        </p>
                        <ul className="list-disc list-inside mb-8 pl-4">
                            <li className="mb-2">Personal Information: Name, email address, phone number, etc.</li>
                            <li className="mb-2">Usage Data: IP address, browser type, pages visited, etc.</li>
                            <li className="mb-2">Cookies: We use cookies to enhance your experience on our website.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                        <p className="mb-6">
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className="list-disc list-inside mb-8 pl-4">
                            <li className="mb-2">To provide and maintain our services.</li>
                            <li className="mb-2">To improve your experience on our website.</li>
                            <li className="mb-2">To communicate with you, including responding to inquiries.</li>
                            <li className="mb-2">To analyze website usage and trends.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing Your Information</h2>
                        <p className="mb-8">
                            We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this Privacy Policy or with your consent.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Security</h2>
                        <p className="mb-8">
                            We implement a variety of security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
                        <p className="mb-6">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside mb-8 pl-4">
                            <li className="mb-2">Access the personal information we hold about you.</li>
                            <li className="mb-2">Request correction or deletion of your personal information.</li>
                            <li className="mb-2">Opt-out of receiving communications from us.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Privacy Policy</h2>
                        <p className="mb-8">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
                        <p className="mb-8">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong>{' '}
                            <Link href="mailto:info@fynaza.com">
                                <span className="font-semibold cursor-pointer">info@fynaza.com</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;