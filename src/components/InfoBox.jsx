import React, { memo } from 'react';
import { Box } from 'grommet';

const InfoBox = ({ children }) => (
	<Box
		height='300px'
		width='300px'
		pad='large'
		round='full'
		style={{
			position: 'fixed',
			top: '40%',
			left: '30%',
			fontSize: '18px',
			lineHeight: '200px',
		}}
		background='brand'
		animation={{ type: 'pulse', duration: 4000 }}
		align='center'
	>
		{children}
	</Box>
);

export default memo(InfoBox);
