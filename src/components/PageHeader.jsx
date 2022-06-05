import React, { memo, useContext, useState } from 'react';
import { Avatar, Header, Box, Button, TextInput, Clock } from 'grommet';
import { Search, Menu } from 'grommet-icons';
import NewsContext, { NewsContextConsumer } from '../NewsContext';

const PageHeader = () => {
	const {
		isUtilitySidebarOpen,
		setIsUtilitySidebarOpen,
		searchText,
		setSearchText,
	} = useContext(NewsContext);
	const [typedText, setTypedText] = useState(searchText);
	return (
		<Header
			background='#272b2d'
			pad='small'
			style={{
				borderBottom: '1px solid #F3E8D4',
				width: '100%',
				position: 'sticky',
				top: '0px',
				color: '#F3E8D4',
			}}
		>
			<Avatar src='news.png' size='medium' round='xsmall' />
			<Box width='large'>
				<TextInput
					icon={<Search />}
					value={typedText}
					placeholder='Search...'
					onChange={(event) => {
						setTypedText(event.target.value);
						setTimeout(() => {
							setSearchText(event.target.value);
						}, 1000);
					}}
				/>
			</Box>
			<Clock type='digital' hourLimit={12} />
			<Box
				overflow='hidden'
				background={isUtilitySidebarOpen ? '#F3E8D4' : 'black'}
				round='full'
			>
				<Button
					icon={<Menu />}
					hoverIndicator
					onClick={() => setIsUtilitySidebarOpen(!isUtilitySidebarOpen)}
				/>
			</Box>
		</Header>
	);
};

export default memo(PageHeader);
