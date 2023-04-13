/** @format */

import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { getGlobal } from './store/states';

import type { Locales } from './locales/global/index';
import AppPlugins from '@/components/AppPlugins';
import { Outlet, type Params } from 'react-router-dom';
import locales from './locales';
import type { EnhancedStore } from '@reduxjs/toolkit';

export const appLoader = async ({
	store,
	request,
	params,
}: {
	store: EnhancedStore;
	request: Request;
	params: Params;
}) => {
	return { store, request, params };
};

export const App = () => {
	const { locale } = useSelector(getGlobal);
	const i8nMessages = locales;

	return (
		<IntlProvider locale="en" messages={i8nMessages?.[locale] || {}}>
			<>
				<Outlet />
				<AppPlugins />
			</>
		</IntlProvider>
	);
};

export default App;
