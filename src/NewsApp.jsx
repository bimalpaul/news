import React, { useState, memo, useEffect } from 'react';
import { Grommet, Page, Box, Collapsible, Pagination, Footer } from 'grommet';
import moment from 'moment';
import PageHeader from './components/PageHeader';
import UtilitySideBar from './components/UtilitySideBar';
import { NewsContextProvider } from './NewsContext';
import getNews from './getNews';
import ArticleGrid from './components/ArticleGrid';
import {
	availableCategories,
	availableCountries,
	availableLanguages,
	availableNewsTypes,
	availableSortFields,
	availableSearchFields,
} from './defaults';

const theme = {
	global: {
		font: {
			family: 'sans-serif',
			size: '16px',
		},
	},
};

const NewsApp = () => {
	const [isUtilitySidebarOpen, setIsUtilitySidebarOpen] = useState(false);
	const [sectionOpen, setSectionOpen] = useState('favorites');
	const [favorites, setFavorites] = useState(
		JSON.parse(sessionStorage.getItem('newsFavorites')) || [],
	);
	const [articles, setArticles] = useState([]);

	const [searchText, setSearchText] = useState('covid');
	const [filterLanguage, setFilterLanguage] = useState(availableLanguages[0]);
	const [sortBy, setSortBy] = useState(availableSortFields[0]);
	const [searchFields, setSearchFields] = useState([availableSearchFields[0]]);
	const [viewedArticles, steViewedArticles] = useState([]);

	const apiLimitationTotal = 100;
	const [pageNumber, setPageNumber] = useState(1);
	const [totalCount, setTotalCount] = useState(apiLimitationTotal);

	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);

	const dateRange = [moment().subtract(30, 'days'), moment()];

	const pageResultLimit = 10;

	const filters = {
		dateRange,
		pageNumber,
		searchText,
		filterLanguage,
		sortBy,
		searchFields,
	};

	const contextValue = {
		isUtilitySidebarOpen,
		setIsUtilitySidebarOpen,
		setSearchText,
		sectionOpen,
		setSectionOpen,
		favorites,
		setFavorites,
		articles,
		setFilterLanguage,
		setPageNumber,
		setSortBy,
		setSearchFields,
		viewedArticles,
		steViewedArticles,
		...filters,
	};

	useEffect(() => {
		setLoading(true);
		setHasError(false);
		getNews(filters)
			.then((response) => {
				console.log('response', response);
				if (response.ok) {
					return response.json();
				} else {
					setArticles(null);
					setHasError(true);
				}
			})
			.then((data, status) => {
				setLoading(false);
				if (status === 'hasError') {
					setHasError(true);
				}
				setTotalCount(
					data.totalResults > apiLimitationTotal
						? apiLimitationTotal
						: data.totalResults,
				);
				setArticles(data.articles);
			})
			.catch(() => {
				setLoading(false);
				setHasError(true);
			});
	}, [searchText, pageNumber, filterLanguage, sortBy, searchFields]);

	useEffect(() => {
		sessionStorage.setItem('newsFavorites', JSON.stringify(favorites));
	}, [favorites]);

	return (
		<Grommet theme={theme}>
			<NewsContextProvider value={contextValue}>
				<Page height='100%' background='#F3E8D4'>
					<PageHeader />
					<Box flex direction='row'>
						<Box flex pad='small'>
							<ArticleGrid articles={articles} />
						</Box>
						{!hasError && totalCount > 0 && (
							<Collapsible direction='horizontal' open={isUtilitySidebarOpen}>
								<UtilitySideBar />
							</Collapsible>
						)}
					</Box>
					{totalCount === 0 && !loading && !hasError && (
						<Box
							height='50vh'
							width='100vw'
							pad='large'
							background='brand'
							animation={{ type: 'pulse', duration: 4000 }}
							align='center'
						>
							No results! 😭
						</Box>
					)}
					{hasError && !loading && (
						<Box
							height='50vh'
							width='100vw'
							pad='large'
							background='brand'
							animation={{ type: 'pulse', duration: 4000 }}
							align='center'
						>
							Looks like the News API failed! 😭
						</Box>
					)}
					{loading && (
						<Box height='100vh' width='100vw' pad='large'>
							Loading data...
						</Box>
					)}
					{totalCount > pageResultLimit && !loading && (
						<Footer
							background='black'
							justify='center'
							pad='small'
							style={{
								borderBottom: '1px solid white',
								width: '100%',
								position: 'sticky',
								bottom: '0px',
							}}
						>
							<Pagination
								step={pageResultLimit}
								size='medium'
								page={pageNumber}
								numberEdgePages={5}
								numberItems={totalCount}
								onChange={({ startIndex }) =>
									setPageNumber(Math.floor(startIndex / pageResultLimit + 1))
								}
							/>
						</Footer>
					)}
				</Page>
			</NewsContextProvider>
		</Grommet>
	);
};

export default memo(NewsApp);
