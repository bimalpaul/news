import React, { memo } from 'react';
import { Text, Header, Box, Button, Nav, Card } from 'grommet';
import { Favorite, Next, Filter, Trash } from 'grommet-icons';
import Filters from './Filters';
import { NewsContextConsumer } from '../NewsContext';

const UtilitySideBar = () => {
	return (
		<NewsContextConsumer>
			{({
				isUtilitySidebarOpen,
				setIsUtilitySidebarOpen,
				sectionOpen,
				setSectionOpen,
				favorites,
				setFavorites,
			}) => {
				const removeFavorite = (article) => {
					const copy = [...favorites];
					const index = copy.indexOf((fave) => fave.url === article.url);
					copy.splice(index, 1);
					setFavorites(copy);
				};
				return (
					<Box
						background='#272b2d'
						width='30vw'
						style={{
							border: '1px solid #F3E8D4',
							position: 'sticky',
							top: '70px',
							height: '100vh',
							color: '#F3E8D4',
						}}
					>
						<Header
							pad='small'
							align='center'
							style={{ borderBottom: '1px solid #F3E8D4' }}
						>
							<Box round='full' overflow='hidden' size='xsmall'>
								<Button
									icon={<Next />}
									onClick={() => setIsUtilitySidebarOpen(!isUtilitySidebarOpen)}
								/>
							</Box>
							<Text>{sectionOpen === 'favorites' ? 'Favorites' : 'Filters'}</Text>
							<Nav direction='row'>
								<Box
									round='full'
									overflow='hidden'
									background={sectionOpen === 'favorites' ? 'green' : 'black'}
								>
									<Button
										icon={<Favorite />}
										hoverIndicator
										onClick={() => setSectionOpen('favorites')}
									/>
								</Box>
								<Box
									round='full'
									overflow='hidden'
									background={sectionOpen === 'filters' ? 'green' : 'black'}
								>
									<Button
										icon={<Filter />}
										hoverIndicator
										onClick={() => setSectionOpen('filters')}
									/>
								</Box>
							</Nav>
						</Header>
						{sectionOpen === 'filters' && <Filters />}
						{sectionOpen === 'favorites' && (
							<Box pad='medium'>
								{favorites.map((fav, index) => (
									<Card
										pad='small'
										key={index}
										background='#F3E8D4'
										style={{ margin: '5px 2px', cursor: 'pointer' }}
										onClick={() => window.open(fav.url)}
									>
										<div style={{ display: 'flex' }}>
											<div>{fav.title}</div>
											<div style={{ marginLeft: 'auto' }}>
												<Box round='full' overflow='hidden' background='#E3735E'>
													<Button
														hoverIndicator
														icon={<Trash size='small' color='#F3E8D4' />}
														onClick={(e) => {
															e.stopPropagation();
															removeFavorite(fav);
														}}
													/>
												</Box>
											</div>
										</div>
										<i>{fav.source.name}</i>
										<br />
										<div>{fav.author}</div>
									</Card>
								))}
								{favorites.length === 0 && <span>No favorites</span>}
							</Box>
						)}
					</Box>
				);
			}}
		</NewsContextConsumer>
	);
};

export default memo(UtilitySideBar);
