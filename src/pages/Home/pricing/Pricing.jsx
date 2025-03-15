import React from 'react';

const Pricing = () => {
    // Array of objects containing pricing card data
    const pricingPlans = [
        {
            title: 'Starter',
            description: 'For Individuals and Small Teams',
            price: '$10',
            features: [
                '50 Page Unlock',
                '10 GB Storage',
                '6 Team Members',
                'Unlimited Book Mark',
                'Unlimited basic feature',
            ],
            isBestDeal: false,
        },
        {
            title: 'Professional',
            description: 'For Individuals and Largest Teams',
            price: '$20',
            features: [
                '100 Page Unlock',
                '20 GB Storage',
                '8 Team Members',
                'Unlimited Book Mark',
                'Unlimited basic feature',
            ],
            isBestDeal: true,
        },
        {
            title: 'Business',
            description: 'For Multiples and Largest Teams',
            price: '$100',
            features: [
                '300 Page Unlock',
                '100 GB Storage',
                '100 Team Members',
                'Unlimited Book Mark',
                'Unlimited basic feature',
            ],
            isBestDeal: false,
        },
    ];

    return (
        <div className="p-4">
            <div className=" max-lg:max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-primary text-3xl font-bold mb-4">Value That Scales With You</h2>
                    <p className="text-sm text-slate-500">Change your plan according to your needs</p>
                </div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-10 max-sm:max-w-sm max-sm:mx-auto">
                    {/* Map through the pricingPlans array to render cards */}
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className="border shadow rounded-md p-6">
                            <h3 className="text-slate-900 text-xl font-semibold mb-2 flex items-center">
                                {plan.title}
                                {plan.isBestDeal && (
                                    <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md ml-3">
                                        Best Deal
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-slate-500">{plan.description}</p>

                            <div className="mt-6">
                                <h3 className="text-slate-900 text-2xl font-semibold">
                                    {plan.price} <sub className="text-slate-500 text-sm font-medium">per month</sub>
                                </h3>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-slate-900 text-lg font-semibold mb-2">Include</h4>
                                <p className="text-sm text-slate-500">Everything you get in this plan</p>

                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-slate-500 font-medium">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                className="mr-3 fill-green-500"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    type="button"
                                    className="w-full mt-6 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-secondary rounded-md"
                                >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;