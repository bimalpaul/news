import React, { memo } from 'react';
import { Grid, Card, Image, CardBody, Button, Box } from 'grommet';
import { Pin, Star } from 'grommet-icons';
import moment from 'moment';
import HtmlParser from 'react-html-parser';
import { NewsContextConsumer } from '../NewsContext';

const ArticleGrid = () => (
	<NewsContextConsumer>
		{({ articles, favorites, setFavorites }) => (
			<Grid columns='medium' gap='medium'>
				{articles?.map((article, index) => {
					const timeNow = moment();
					const publishedTime = moment(article.publishedAt);
					const diff = timeNow.diff(publishedTime, 'minutes');
					const removeFavorite = (e) => {
						e.stopPropagation();
						const copy = [...favorites];
						const index = favorites.findIndex(({ url }) => article.url === url);
						copy.splice(index, 1);
						setFavorites(copy);
					};

					return (
						<Card
							pad='medium'
							key={index}
							background='black'
							style={{
								fontSize: '14px',
								cursor: 'pointer',
							}}
							onClick={() => window.open(article.url)}
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div style={{ marginRight: 10 }}>
									<b>{article.title}</b>
								</div>
								<div style={{ marginLeft: 'auto' }}>
									{favorites.map((fave) => fave.url)?.indexOf(article.url) > -1 ? (
										<Box round='full' overflow='hidden' background='purple'>
											<Button
												hoverIndicator
												icon={<Star size='small' />}
												onClick={removeFavorite}
											/>
										</Box>
									) : (
										<Box round='medium' overflow='hidden' background='white'>
											<Button
												hoverIndicator
												icon={<Pin size='small' color='black' />}
												onClick={(e) => {
													e.stopPropagation();
													setFavorites([...favorites, article]);
												}}
											/>
										</Box>
									)}
								</div>
							</div>
							<CardBody pad='small'>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ margin: 20 }}>
										<Image
											src={article.urlToImage}
											width={200}
											height={100}
											fallback='//v2.grommet.io/assets/IMG_4245.jpg'
										/>
									</div>
									<div>
										<i>{article.source.name}</i>
										<br />
										<i>{diff} minutes ago</i>
										<div>{article.author}</div>
									</div>
								</div>
								{HtmlParser(article.description)}
							</CardBody>
						</Card>
					);
				})}
			</Grid>
		)}
	</NewsContextConsumer>
);

export default memo(ArticleGrid);
