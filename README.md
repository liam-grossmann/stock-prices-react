# stock-prices-react

STAR WARS scrolling text from the 1977 movie.

D3 and CSS3 are used to animate images and text. Project built using webpack 5.0.

**Click [here](https://nice-bush-0e3f23110.2.azurestaticapps.net/) for live demo.**

[<img src="src/assets/starwars.jpg" style="width: 50%; height: 50%" />](https://nice-bush-0e3f23110.2.azurestaticapps.net/)





## Installation 


    git clone https://github.com/liam-grossmann/star-wars-d3.git

    npm install




## Build and Run 

    npm run dev

    npm run build

    npm run serve 


When code is checked into github a [workflow job](https://github.com/liam-grossmann/star-wars-d3/blob/main/.github/workflows/azure-static-web-apps-nice-bush-0e3f23110.yml) is automatically run to build and deploy the application to Azure.


## Hosted

| Environment | Description                          | Url                                                |
| ------------| ------------------------------------ | -------------------------------------------------- |
| Dev          | Hosted by ViteJs                    | http://localhost:3000/                             | 
| Production   | Hosted by Azure as a static web app | https://nice-bush-0e3f23110.2.azurestaticapps.net/ |



## Dependencies

| Component     | Use                              | Documentation |
| ------------- | -------------------------------- | ------------------------------------------------ |
| ViteJs        | Building and bundling the assets | [Webpack Guides](https://webpack.js.org/guides/) | 
| D3            | Data visualisations library      | [Data Driven Documents](https://d3js.org/)       |



## Webpack

Webpack configured 
* Bundle html, js, css, images into the distribution folder
* Automatically cleans the distribution folder betweeen builds
* Includes a watcher to aid development by auto building when files change
* Includes a rudimentary development server

Not covered
* Code splitting (on demand loads etc)
* Source maps removed because package bundle was too big.


