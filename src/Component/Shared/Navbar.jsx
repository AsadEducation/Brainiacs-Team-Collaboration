import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Desktop Navbar */}
            <nav className="relative px-4 py-4 flex justify-between items-center">
                <a className="text-3xl font-bold leading-none">
                    Brainiacs
                </a>
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center p-3" onClick={toggleMenu}>
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                <ul className="hidden relative lg:left-24 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <a className="text-sm hover:text-accent">Home</a>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <a className="text-sm hover:text-accent">About Us</a>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <a className="text-sm hover:text-accent">Services</a>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <a className="text-sm hover:text-accent">Pricing</a>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </motion.li>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <a className="text-sm hover:text-accent">Contact</a>
                    </motion.li>
                </ul>
                <motion.a 
                    className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-sm font-bold rounded-xl transition duration-200 bg-secondary hover:bg-accent text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Log In
                </motion.a>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className="md:hidden fixed top-0 left-0 right-0 bottom-0 flex flex-col w-full max-w-xs py-6 px-6 bg-white border-r overflow-y-auto z-50"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center mb-8">
                            <a className="mr-auto text-3xl font-bold leading-none text-primary">
                                Brainiacs
                            </a>
                            <button className="navbar-close text-4xl text-primary" onClick={toggleMenu}>
                                x
                            </button>
                        </div>
                        <motion.ul>
                            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                                <a className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">Home</a>
                            </motion.li>
                            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <a className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">About Us</a>
                            </motion.li>
                            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                <a className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">Services</a>
                            </motion.li>
                            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <a className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">Pricing</a>
                            </motion.li>
                            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                <a className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-secondary rounded">Contact</a>
                            </motion.li>
                        </motion.ul>
                        <motion.div className="mt-auto">
                            <motion.div 
                                className="pt-6"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.6 }}
                            >
                                <a className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-secondary hover:bg-accent text-white rounded-xl">
                                    Log in
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
