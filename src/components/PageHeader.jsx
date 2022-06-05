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
			background='black'
			pad='small'
			style={{
				borderBottom: '1px solid white',
				width: '100%',
				position: 'sticky',
				top: '0px',
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
				background={isUtilitySidebarOpen ? 'white' : 'black'}
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
