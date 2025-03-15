"use client";
import { Breadcrumb } from '../../ui/Breadcrumb';
import { useState } from 'react';
import { Handshake, Home } from 'lucide-react';

const TermsAndConditions = () => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Support", href: "#", icon: <Handshake className="w-4 h-4" /> },
        { label: "Terms and Conditions", href: "/support/terms-and-conditions" }
    ]);
    return (
        <div>
            <div className="my-2"><Breadcrumb items={BreadcrumbView} /></div>
            <div className="bg-[#f3f7fa] text-black">
                <div className=" bg-white p-8 rounded-lg shadow-lg mb-4">
                    <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Welcome to our website. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The content on this website, including text, graphics, logos, and images, is the property of our company and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without our prior written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                            <p className="text-gray-700 leading-relaxed">
                                You agree to use this website for lawful purposes only. You must not engage in any activity that disrupts or interferes with the website's functionality or security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We are not liable for any damages arising from your use of this website. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We reserve the right to modify these terms and conditions at any time. Your continued use of the website after any changes constitutes your acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed">
                                These terms and conditions are governed by and construed in accordance with the laws of Nepal. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Nepal.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12">
                        <p className="text-gray-600">
                            If you have any questions about these terms, please contact us at <a href="mailto:info@fynaza.com" className="text-black underline">info@fynaza.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;