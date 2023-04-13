/** @format */

import { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import PageTransition from '@/components/PageTransition';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useLangNavigate } from '@roswell/hooks';

const RouteError: React.FC = () => {
	const error = useRouteError();
	const navigate = useLangNavigate();

	useEffect(() => {
		if (isRouteErrorResponse(error)) {
			if (error.status === 401) {
				navigate('/user');
			}
		}
	}, [error]);

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<PageTransition>
					<Box p={8} textAlign="center">
						<Box fontSize={32} py={3} fontWeight="bold">
							This page doesn&apos;t exist!
						</Box>
						<Button
							variant="contained"
							onClick={() => {
								navigate('/home');
							}}
						>
							BACK HOME
						</Button>
					</Box>
				</PageTransition>
			);
		}

		if (error.status === 401) {
			return <PageTransition>You aren&apos;t authorized to see this</PageTransition>;
		}

		if (error.status === 503) {
			return <PageTransition>Looks like our API is down</PageTransition>;
		}

		if (error.status === 418) {
			return <PageTransition>🫖</PageTransition>;
		}
	}

	return (
		<PageTransition>
			<Box p={8} textAlign="center">
				<Box fontSize={32} py={3} fontWeight="bold">
					Something went wrong
				</Box>
			</Box>
		</PageTransition>
	);
};

export default RouteError;
