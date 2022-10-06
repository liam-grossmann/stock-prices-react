import './App.css'
import WatchList from './components/watchList'

export default function App() {
  return (
    <div className="App">
      <div> <h3>Stock Price Simulator (ReactJS, D3.js and Simple Timer)</h3></div>
      <div>Select a ticker on the left hand list to display the details and chart for the selected ticker</div>
      <WatchList></WatchList>
    </div>
  )
}