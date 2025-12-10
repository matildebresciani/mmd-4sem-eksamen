'use client';

import { Search } from 'lucide-react';
import { motion } from 'motion/react';

type Props = {
    className?: string;
};

const SearchBar = ({ className }: Props) => {
    //TODO: implement search functionality
    return (
        <motion.div transition={{ duration: 0.2, ease: 'easeIn' }} whileHover={{ scale: 1.2 }} className={className}>
            <Search />
        </motion.div>
    );
};

export default SearchBar;
