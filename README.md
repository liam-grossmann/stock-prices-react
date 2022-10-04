# stock-prices-react

NASDAQ stock prices and charts. Built using TypeScript, ReactJS, D3.js, RxJs. Project build tool ViteJS.

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
| RxJs          | Reactive extensions (update prices)        | [RxJs Home Page](https://rxjs.dev/)                     |
| ViteJs        | Build and bundling tool                    | [ViteJs Home Page](https://vitejs.dev/)                 |

