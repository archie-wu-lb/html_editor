/** @format */

import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PageTransition from '@/components/PageTransition';
import Ckeditor from '@/components/Ckeditor';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Icon, IconButton } from '@mui/material';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { globalActions } from '@/store/global.slice';
export const loader = async () => {
	// throw new Response("Not Found", { status: 404 });
	return null;
};

const Title = () => {
	return <div>Title</div>;
};

const Home = () => {
	const [preView, setPreView] = useState('');

	const dispatch = useDispatch();

	return (
		<PageTransition>
			<Grid2 width={1} p={3} container spacing={2}>
				<Grid2 md={6}>
					<Ckeditor setPreView={setPreView} />
				</Grid2>
				<Grid2 md={6}>
					<h3>預覽</h3>
					<Box minHeight={'50vh'} border={1}>
						{parse(preView)}
					</Box>
				</Grid2>
			</Grid2>

			<Box ml={3}>資料不會保存畫面關閉前請複製,且請勿重新整理頁面</Box>
			<Box m={3} p={3} border={1}>
				{preView}
			</Box>
			<Box display="flex" justifyContent="center">
				<CopyToClipboard text={preView}>
					<IconButton size="small">
						點擊複製
						<Icon style={{ fontSize: 24 }}>content_copy</Icon>
					</IconButton>
				</CopyToClipboard>
			</Box>
		</PageTransition>
	);
};

export default Home;
