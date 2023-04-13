/** @format */

import { motion } from 'framer-motion';

interface Props {
	children?: React.ReactNode;
}

const PageTransition = (props: Props) => {
	const { children } = props;
	return (
		<motion.main
			className="page-transtion"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.6 }}
		>
			{children}
		</motion.main>
	);
};

export default PageTransition;
