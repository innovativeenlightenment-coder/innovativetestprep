// 

"use client";

import React from "react";

const plans = [
    {
        id: 1,
        tier: "Basic Plan",
        title: "Starter",
        price: "₹ 699/-",
        subject: "subject",
        features: [
            "Chapter-wise online test series 2 Test per Chapter",
            "Instant score & solutions",
            "Detailed progress reports",
            "12-month access",
            "Notes will be provided in PDF"
        ],
    },
    {
        id: 2,
        tier: "Premium Plan",
        title: "Achiever 🚀",
        price: "₹ 1299/-",
        subject: "subject",
        popular: true,
        features: [
            "Unlimited Chapter-wise online test",
            "Full syllabus mock tests",
            "Notes will be provided in PDF, Video & audio content",
            "12 months validity",
            "Detailed progress reports",
            "Doubt Session after Test",
        ],
    },
    {
        id: 3,
        tier: "Pro Plan",
        title: "Champion ✨",
        price: "₹ 2199/-",
        subject: "subject",
        features: [
            "Unlimited online test access",
            "Adaptive difficulty levels",
            "Notes will be provided in PDF,Video & audio content",
            "Detailed progress reports",
            "Lifetime access to resources",
            "Doubt Session after Test and 3 months expert mentorship",
        ],
    },
];

export default function SubscriptionPage() {
    return (
        <div
            className="min-h-screen w-full py-16"
            style={{
                background:
                    "radial-gradient(circle at 10% 20%, rgba(255,107,53,0.05) 0, transparent 10%), radial-gradient(circle at 80% 80%, rgba(255,200,0,0.08) 0, transparent 12%), #fdfcfb",
            }}
        >
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5x font-extrabold text-gray-900 tracking-tight">
                        Subscription Plans
                    </h1>
                    <p className="text-lg text-gray-600 mt-2 font-medium">
                        Choose the plan that fits your preparation journey best
                    </p>
                    <div className="mx-auto mt-3 w-20 h-1 bg-blue-500 rounded" />
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((p) => (
                        <div
                            key={p.id}
                            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex flex-col justify-between border-t-4 ${p.popular ? "border-orange-500" : "border-gray-200"
                                }`}
                        >
                            {/* Popular badge */}
                            {p.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wide">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Card content */}
                            <div className="pt-6">
                                {/* Tier: now BIG & ATTRACTIVE */}
                                <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-900 tracking-wide">
                                    {p.tier}
                                </h2>

                                {/* Title: smaller and supportive */}
                                <p className="text-lg text-center font-medium text-orange-500 mt-1">
                                    {p.title}
                                </p>

                                {/* Price */}
                                <div className="text-center mt-6">
                                    <span className="text-3xl md:text-6x font-black text-indigo-600 tracking-wide">
                                        {p.price}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-1 align-top">
                                        {p.subject}
                                    </span>
                                </div>

                                {/* Features */}
                                <ul className="mt-8 space-y-4">
                                    {p.features.map((f, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-gray-700 text-base"
                                        >
                                            <svg
                                                className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            {/* <div className="mt-8">
                                <button
                                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 text-white font-semibold py-4 rounded-full shadow-lg transition transform hover:scale-105 text-lg"
                                    aria-label={`Read more about ${p.title}`}
                                >
                                    Join Now →
                                </button>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating up arrow */}
            <a
                href="#top"
                className="fixed right-6 bottom-6 z-50 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition"
                aria-label="Scroll to top"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M5 15l7-7 7 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
        </div>
    );
}

