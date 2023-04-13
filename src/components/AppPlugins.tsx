/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '@/store/global.slice';
import { useLangNavigate } from '@roswell/hooks';
import { Dialog, Snackbar } from '@roswell/ui-components';
import { getGlobal } from '@/store/states';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const AppPlugins: React.FC = () => {
	const global = useSelector(getGlobal);
	const dispatch = useDispatch();
	const navigate = useLangNavigate();
	// extend plugin
	dayjs.extend(utc);
	dayjs.extend(timezone);
	// set default timezone
	const Timezone = 'Asia/Taipei';
	dayjs.tz.setDefault(Timezone);

	return (
		<>
			<Dialog
				{...global.dialog}
				dialogBorder={true}
				actionFullWidth={true}
				actionColumn={true}
				actionColumnReverse={false}
				buttonSize={'large'}
				onClose={() => {
					if (typeof global.dialog.closeHandle === 'function') {
						global.dialog.closeHandle(dispatch, navigate);
					} else {
						dispatch(globalActions.toogleDialog({ visible: false }));
					}
				}}
				onConfirm={() => {
					if (typeof global.dialog.confirmHandle === 'function') {
						global.dialog.confirmHandle(dispatch, navigate);
					} else {
						dispatch(globalActions.toogleDialog({ visible: false }));
					}
				}}
				onCancel={() => {
					if (typeof global.dialog.cancelHandle === 'function') {
						global.dialog.cancelHandle(dispatch, navigate);
					} else {
						dispatch(globalActions.toogleDialog({ visible: false }));
					}
				}}
			/>
			<Snackbar
				{...global.snackbar}
				onlyUseDefaultBackground={false}
				defaultAnchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				defaultAutoHideDuration={3000}
				contentColor="#fff"
				onClose={() => {
					/* if(typeof global.snackbar.closeHandle === 'function') {
            global.snackbar.closeHandle(dispatch, navigate)
          } else {
            dispatch(globalActions.snackbarRequest({visible: false}))
          } */
				}}
			/>
		</>
	);
};

export default AppPlugins;
