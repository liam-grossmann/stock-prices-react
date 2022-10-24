import './App.css'
import WatchList from './components/watchList'

export default function App() {
  return (
    <div className="App">
      <div> <h3>Stock Price Simulator (ReactJS, D3.js and some advanced use of react hooks)</h3></div>
      <br/>
      <div>Select a ticker on the left hand list to display the details and chart for the selected ticker</div>
      <br/>
      <WatchList></WatchList>
    </div>
  )
}