# Design Choices 🎨

* [CRA](https://github.com/facebook/create-react-app) to bootstrap the app
* React - This is currently the UI framework I'm most comfortable with
* React Context - For easily passing state around the child/grand-child components
* Session Storage - To keep track of favorites, and viewed articles even on page refresh (React's state-context is rewritten on page reload)
* [React Memo](https://reactjs.org/docs/react-api.html#reactmemo) to memoize the components so they're not re-rendered due to side-effects
* [Grommet](https://v2.grommet.io/components), and [Grommet Icons](https://icons.grommet.io/) - For a light-weight design system so I don't have to do too much in terms of styling. I also wanted to try something that wasn't Material UI 

# State Variables and their purpose



| VARIABLE NAME        | PURPOSE                                                            |
|----------------------|--------------------------------------------------------------------|
| isUtilitySidebarOpen | To track if side panel is open                                     |
| sectionOpen          | To check if favorites, or filters section is open                  |
| favorites            | To track the list of favorites                                     |
| articles             | To track the list of articles                                      |
| searchText           | To track the search text entered                                   |
| filterLanguage       | To track the language by which results are filtered                |
| sortBy               | To track the sort field                                            |
| searchFields         | To track the search fieldds                                        |
| viewedArticles       | To track the list of viewed articles                               |
| apiLimitationTotal   | Total number of results that the developer acocunt gets you        |
| pageNumber           | Track the page user is on (for pagination)                         |
| totalCount           | TOtal number of results, for pagination                            |
| hasError             | Tracks if the API threw an error                                   |
| loading              | Tracks is API is loading                                           |
| dateRange            | Date range for articles - dev account only allows for past 30 dats |
| pageResultLimit      | Number of results to be shown per page - 10                        |
| filters              | List of filters for API call                                       |
| contextValue         | Aggregate of variable to be passed around via React Context        |
|                      |                                                                    |
