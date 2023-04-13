/** @format */

import { useSelector } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import ProjectConfig from '@/project.config.json';
import globalApi from '@/services/globalService';
const permissionType = ProjectConfig.permissionType.value;

interface PermissionProps {
	/** permission list */
	acl: string[];
	children?: any;
}

const Permission = (props: PermissionProps) => {
	const { acl } = props;
	const { useGetMeQuery } = globalApi;
	const { data: userData, isSuccess } = useGetMeQuery();
	const user = (isSuccess && userData.data) || {};
	const roles: any = user?.roles || {};
	const getUserAcl = () => {
		let userAcl: any = [];
		if (permissionType === 'role') {
			userAcl = roles[user?.current] || [];
		} else if (permissionType === 'acl') {
			Object.keys(roles).forEach((key: any) => {
				userAcl = [...roles[key], ...userAcl];
			});
		}
		return _.uniq(userAcl);
	};

	const permission: any = _.intersection(acl, getUserAcl());
	return (
		<>
			{((!getUserAcl().length && permissionType === 'none') || (isSuccess && permission.length > 0)) && props.children}
		</>
	);
};

export default Permission;
