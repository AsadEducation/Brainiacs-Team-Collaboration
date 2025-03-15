const featuresData = [
    {
        id: 1,
        title: "Real-Time Collaboration",
        description:
            "Work together seamlessly with live document editing, task management, and instant updates for your team.",
        image:
            "/feature-images/real-time.avif",


    },
    {
        id: 2,
        title: "Secure File Sharing",
        description:
            "Share and store files securely with cloud-based access control, ensuring privacy and data protection.",
        image:
            "/feature-images/secure-file.avif",
        extraClass: 'lg: relative -top-30'

    },
    {
        id: 3,
        title: "Integrated Chat & Video Calls",
        description:
            "Stay connected with built-in messaging, voice, and video calls for smooth team communication.",
        image:
            "/feature-images/video-call.jpg",

    },
    {
        id: 4,
        title: "Task & Project Management",
        description:
            "Organize your workflow with to-do lists, kanban boards, and progress tracking for better productivity.",
        image:
            "/feature-images/project-management.jpg",
        extraClass: 'lg: relative -top-30'


    },
];

export default function Features() {
    return (
        <section className="bg-gray-800 text-white py-12">
            {/* <h2 className="text-center text-2xl font-bold">Features</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-6">
                {featuresData.map((feature) => (
                    //feature card
                    <div key={feature.id} className={`overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs ${feature?.extraClass} md:hover:scale-105 transition duration-300 ease-in-out`}>
                        <img
                            alt=""
                            src={feature.image}
                            className="h-56 w-full object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <a href="#">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {feature.title}
                                </h3>
                            </a>

                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                {feature.description}
                            </p>

                            <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                                Find out more

                                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                    &rarr;
                                </span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
