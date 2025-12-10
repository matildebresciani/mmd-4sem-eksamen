// // HeaderClient.tsx (Client Component)
// 'use client';

// import LogoLink from '@/components/atoms/frontend/logo/Link';
// import SearchBar from '@/components/molecules/frontend/SearchBar';
// import { motion } from 'framer-motion';
// import React, { useEffect, useState } from 'react';
// import MainNavigation from './components/MainNavigation';
// import MobileNavigation from './components/MobileNavigation';
// import SecondaryNavigation from './components/SecondaryNavigation';

// export default function HeaderClient({ main, secondary, mobile, locale }: any) {
//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 50);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <motion.header
//             className="fixed top-0 left-0 w-full z-50 bg-bg-base overflow-hidden py-4 md:py-8"
//             animate={{ height: scrolled ? 112 : 303 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         >
//             {secondary && <SecondaryNavigation data={secondary} locale={locale} />}
//             <div className="base-block flex lg:flex-col items-center justify-between gap-5 relative">
//                 <motion.div
//                     className="absolute left-1/2 transform -translate-x-1/2 lg:block"
//                     animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0, scale: 1 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                 >
//                     <LogoLink variant="full" />
//                 </motion.div>

//                 <motion.div
//                     className="absolute left-1/2 transform -translate-x-1/2 lg:block"
//                     animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -20, scale: scrolled ? 0.85 : 1 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                 >
//                     <LogoLink />
//                 </motion.div>

//                 <div className="hidden lg:flex lg:gap-l bg-bg-base items-center">
//                     {main && <MainNavigation data={main} locale={locale} />}
//                     <SearchBar />
//                 </div>

//                 <div className="lg:hidden flex justify-between w-full">
//                     {/* <LogoLink /> */}
//                     <div className="flex gap-base items-center">
//                         <SearchBar />
//                         {mobile && <MobileNavigation data={mobile} locale={locale} />}
//                     </div>
//                 </div>
//             </div>
//         </motion.header>
//     );
// }
// 'use client';

// import LogoLink from '@/components/atoms/frontend/logo/Link';
// import SearchBar from '@/components/molecules/frontend/SearchBar';
// import { motion } from 'framer-motion';
// import React, { useEffect, useState } from 'react';
// import MainNavigation from './components/MainNavigation';
// import MobileNavigation from './components/MobileNavigation';
// import SecondaryNavigation from './components/SecondaryNavigation';

// export default function HeaderClient({ main, secondary, mobile, locale }: any) {
//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 50);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <motion.header
//             className="fixed top-0 left-0 w-full z-50 bg-bg-base overflow-hidden"
//             animate={{ height: scrolled ? 140 : 303 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         >
//             {secondary && <SecondaryNavigation data={secondary} locale={locale} />}

//             <div className="base-block flex flex-col justify-between h-full relative gap-xxs">
//                 {/* Logo øverst */}
//                 <div className="relative w-full flex justify-center pt-l">
//                     <motion.div
//                         className="lg:block"
//                         animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0, scale: 1 }}
//                         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                     >
//                         <LogoLink variant="full" />
//                     </motion.div>

//                     <motion.div
//                         className="lg:block absolute top-2 left-1/2 transform -translate-x-1/2"
//                         animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -20, scale: scrolled ? 0.85 : 1 }}
//                         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                     >
//                         <LogoLink />
//                     </motion.div>
//                 </div>

//                 {/* Navigation nederst */}
//                 <div className="hidden lg:flex justify-between items-center bg-bg-base w-full mb-0 py-2">
//                     {main && <MainNavigation data={main} locale={locale} />}
//                     <SearchBar />
//                 </div>

//                 {/* Mobile */}
//                 <div className="lg:hidden flex justify-between w-full mt-auto">
//                     <div className="flex gap-base items-center">
//                         <SearchBar />
//                         {mobile && <MobileNavigation data={mobile} locale={locale} />}
//                     </div>
//                 </div>
//             </div>
//         </motion.header>
//     );
// }

'use client';

import LogoLink from '@/components/atoms/frontend/logo/Link';
import SearchBar from '@/components/molecules/frontend/SearchBar';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import MainNavigation from './components/MainNavigation';
import MobileNavigation from './components/MobileNavigation';
import SecondaryNavigation from './components/SecondaryNavigation';

export default function HeaderClient({ main, secondary, mobile, locale }: any) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Her sætter vi positionen for navigation afhængigt af header-højde
    const navTop = scrolled ? 100 : 240; // pixels fra toppen

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 bg-bg-base overflow-hidden"
            animate={{ height: scrolled ? 140 : 303 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {secondary && <SecondaryNavigation data={secondary} locale={locale} />}

            {/* Logo container */}
            <div className="relative w-full flex justify-center pt-l">
                <motion.div
                    className="lg:block"
                    animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <LogoLink variant="full" />
                </motion.div>

                <motion.div
                    className="lg:block absolute top-2 left-1/2 transform -translate-x-1/2"
                    animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -20, scale: scrolled ? 0.85 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <LogoLink />
                </motion.div>
            </div>

            {/* MainNavigation absolut placeret */}
            <div
                className="hidden lg:flex justify-between items-center bg-bg-base w-full px-4"
                style={{ position: 'absolute', top: navTop }}
            >
                {main && <MainNavigation data={main} locale={locale} />}
                <SearchBar />
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex justify-between w-full mt-auto px-4">
                <div className="flex gap-base items-center">
                    <SearchBar />
                    {mobile && <MobileNavigation data={mobile} locale={locale} />}
                </div>
            </div>
        </motion.header>
    );
}
