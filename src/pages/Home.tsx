/** @format */

import React, { useEffect, useState } from 'react';

import PageTransition from '@/components/PageTransition';
import Ckeditor from '@/components/Ckeditor';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import parse from 'html-react-parser';
export const loader = async () => {
	// throw new Response("Not Found", { status: 404 });
	return null;
};

const Title = () => {
	return <div>Title</div>;
};

const Home = () => {
	const [preView, setPreView] = useState('');

	useEffect(() => {
		// console.log(homeLoaderDate)
	}, []);
	return (
		<PageTransition>
			<Grid2 width={1} p={3} container spacing={2}>
				<Grid2 md={6}>
					<Ckeditor setPreView={setPreView} />
				</Grid2>
				<Grid2 md={6}>
					<Box minHeight={'50vh'} border={1}>
						{parse(preView)}
					</Box>
				</Grid2>
			</Grid2>
		</PageTransition>
	);
};

export default Home;
