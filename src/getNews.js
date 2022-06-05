import moment from 'moment';

const apiKey = '14c2005b50fe4c63bba2af13e8151e5c';

const getNews = ({
  searchText,
  dateRange,
  pageNumber,
  filterLanguage,
  searchFields,
  sortBy,
}) => {
  let newsApiBase = 'https://newsapi.org/v2/everything';

  newsApiBase += `/?apiKey=${apiKey}`;
  newsApiBase += `&pageSize=10`;
  newsApiBase += `&page=${pageNumber}`;
  newsApiBase += `&sortBy=${sortBy}`;
  newsApiBase += `&searchIn=${searchFields.join(',')}`;
  newsApiBase += `&language=${filterLanguage}`;
  newsApiBase += `&from=${moment(dateRange[0]).format('YYYY-MM-DD')}`;
  newsApiBase += `&to=${moment(dateRange[1]).format('YYYY-MM-DD')}`;

  if (searchText.length > 0) {
    newsApiBase += `&q="${searchText}"`;
  }

  return fetch(newsApiBase);
}

export default getNews;