import React, { memo } from 'react';
import { Box, DateInput, Grommet, Select, Text } from 'grommet';
import { Sort } from 'grommet-icons';
import moment from 'moment';
import { getLangNameFromCode } from 'language-name-map';
import { NewsContextConsumer } from '../NewsContext';
import {
	availableLanguages,
	availableNewsTypes,
	availableSearchFields,
	availableSortFields,
} from '../defaults';

const theme = {
	global: {
		font: {
			family: 'monospace',
			size: '16px',
		},
	},
};

const renderOption = (option) => (
	<Box pad='small' style={{ marginLeft: '10px' }}>
		{getLangNameFromCode(option)?.name}
	</Box>
);

const Filters = () => (
	<Grommet theme={theme}>
		<NewsContextConsumer>
			{({
				filterLanguage,
				setFilterLanguage,
				sortBy,
				setSortBy,
				searchFields,
				setSearchFields,
			}) => (
				<Box pad='medium'>
					<Box margin='10px 0 2px 10px'>
						<b>Article language: </b>
					</Box>
					<Box width='medium' margin={'10px'}>
						<Select
							title={getLangNameFromCode(filterLanguage)?.name}
							options={availableLanguages}
							value={filterLanguage}
							onChange={({ option }) => setFilterLanguage(option)}
						>
							{renderOption}
						</Select>
					</Box>
					<Box margin='40px 0 2px 10px'>
						<b>Article sort: </b>
					</Box>
					<Box width='medium' margin={'10px'}>
						<Select
							options={availableSortFields}
							value={sortBy}
							onChange={({ option }) => setSortBy(option)}
						/>
					</Box>
					<Box margin='40px 0 2px 10px'>
						<b>Search for keywords in articles section: </b>
					</Box>
					<Box width='medium' margin={'10px'}>
						<Select
							placeholder='Select'
							multiple
							closeOnChange={false}
							value={searchFields}
							options={availableSearchFields}
							onChange={({ value: nextValue }) => setSearchFields(nextValue)}
						/>
					</Box>
				</Box>
			)}
		</NewsContextConsumer>
	</Grommet>
);

export default memo(Filters);
