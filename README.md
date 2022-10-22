# stock-prices-react

NASDAQ stock prices and charts. Built using TypeScript, ReactJS, D3.js. Project build tool ViteJS.

**Click [here](https://zealous-sky-017eda110.2.azurestaticapps.net) for live demo.**

[<img src="src/assets/stockpricesreact.jpg" style="width: 50%; height: 50%" />](https://zealous-sky-017eda110.2.azurestaticapps.net)





## Installation 

    git clone https://github.com/liam-grossmann/stock-prices-react.git

    npm install




## Build and Run

| Command       | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| npm run dev   | Supports HMR (hot module reloading). Serves from in-memory vite server. |
| npm run build | Production build to the dist folder.                                    |
| npm run serve | Serves from the dist folder.                                            | 

When code is checked into github a [workflow job](.github/workflows) is automatically run to build and deploy the application to Azure.


## Hosted

| Environment | Description                         | Url                                                 |
| ------------| ----------------------------------- | --------------------------------------------------- |
| Development | Hosted by ViteJs                    | http://localhost:3000/                              | 
| Production  | Hosted by Azure as a static web app | https://zealous-sky-017eda110.2.azurestaticapps.net |



## Dependencies

| Component     | Use                                        | Documentation                                           |
| ------------- | ------------------------------------------ | ------------------------------------------------------- |
| TypeScript    | Development Language                       | [TypeScript Home Page](https://www.typescriptlang.org/) | 
| React         | Responsive component based web application | [React Home Page](https://reactjs.org/)                 |
| D3.js         | Charting                                   | [Data Driven Documents](https://d3js.org/)              |
| ViteJs        | Build and bundling tool                    | [ViteJs Home Page](https://vitejs.dev/)                 |


## Technical Description

The application consists of three main react functional components
* WatchList which lists the tickers (the watch list itself consists of a list of 'watch list button' functional components)
* TickerDetails which displays ticker details (name, logo, exchange, high, low, volume and so on)
* TickerChart which displays the intraday chart (implemented using D3.js)

Clicking a watch list button causes the 'selectedTicker' to change and the ticker panel and chart panel to refresh.

A simple timer (setInterval) is used update the tickers and the prices. Price changes are simulated using algorithms which create random numbers and random price fluctuations. The WatchList function uses React hooks to ensure the timer is setup once and its
resources are destroyed correctly
* The [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) hook sets up the timer
* The [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) hook cleans up the timer

Once the prices are updated, the watch list functional component and ticker details functional component are refreshed by React. However, the chart functional component is NOT refreshed. This is acheived by wrapping the chart functional component up in a [React.memo function](https://reactjs.org/docs/react-api.html#reactmemo). The react memo function ensures that the chart is only re-rendered when the selected ticker changes. Price updates will NOT cause the chart to update. If we did not export the chart functional component as a memo function, the chart would refresh every time prices change ... and this would cause the chart to refresh every two seconds and eventually bring the application to a halt.

Integrating D3.js with the React application was relatively straightforward. It just required the inclusion of the "@types/d3" library to allow compilation with type script. However, in order to make the site responsive, resizing of the chart component required some special code. I grab a reference to the containing div and whenever this containing div is resized,
the chart is repainted with a new width. This is achieved using the useLayoutEffect hook and some window resize event listeners.

Layout and the responsiveness of the size is controlled by Bootstrap CSS (apart from resizing the chart itself). Would be nice to eventually upgrade from Bootstrap to more modern layout frameworks such as FlexGrid or Grid.css (or both! ).