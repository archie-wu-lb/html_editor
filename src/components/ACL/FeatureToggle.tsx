/** @format */

import React from 'react';
import _ from 'lodash';
import ProjectConfig from '@/project.config.json';
import { globalApi } from '@/services/globalService';

const featureToggle = (id: string, configAclSet: any, apiAclSet: any): boolean => {
	if (
		Object.keys(configAclSet).length > 0 &&
		!_.isEmpty(configAclSet) &&
		!_.isEmpty(id) &&
		!!_.intersection([id], Object.keys(configAclSet)).length
	) {
		const idAcl: any = configAclSet[id] || [];
		const apiAcl = Object.keys(apiAclSet).filter((apiAclKey: any) => apiAclSet[apiAclKey] === 'enabled');
		const isMatched = !!_.intersection(idAcl, apiAcl).length;
		return isMatched;
	} else {
		return true;
	}
};

interface featureToggleProps {
	/** feature key, This needs to be a unique value
	 *  and this needs mapping to featureAcl value
	 *  featureAcl is in project.config.json
	 **/
	id: string;
	children?: any;
}

const FeatureToggle = (props: featureToggleProps) => {
	const { id } = props;
	const { useGetMetaQuery } = globalApi;
	const { data: metaData, isSuccess } = useGetMetaQuery();
	const configAclSet = ProjectConfig.featureAcl.value;
	const apiAclSet = (isSuccess && metaData?.data?.features) || [];

	return <>{featureToggle(id, configAclSet, apiAclSet) ? props.children : React.Fragment}</>;
};

export default FeatureToggle;
export { featureToggle };
