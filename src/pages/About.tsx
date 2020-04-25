import React from 'react';
import { Breadcrumb } from 'antd';
import MainContent from '../components/MainContent';

const About: React.SFC = () => {
	const aryBc = [ '关于' ];

	const breadcrumbs = aryBc.map((bc, index) => {
		return <Breadcrumb.Item key={index}>{bc}</Breadcrumb.Item>;
	});

	return (
		<MainContent breadcrumbs={breadcrumbs}>
			<span>关于页面</span>
		</MainContent>
	);
};

export default About;
