import './tickerChart.css'
import { ITicker } from './../services/watchList'

interface WatchListButtonProps {
    ticker: ITicker,
    onClick: any,
}

export default function WatchListButton(props: WatchListButtonProps) {
    let ticker = props.ticker;
    return (
        <div key={ticker.id} className="row text-center stackpanelbutton" onClick={props.onClick}> 
            <div className="col-md-3 white-text">{ticker.id}</div>
            <div className="col-md-3 blue-text">{ticker.last.toFixed(2)}</div>
            {ticker.change < 0 && <div className="col-md-3 red-text">{ticker.change.toFixed(2)}</div>}
            {ticker.change < 0 && <div className="col-md-3 red-text">{ticker.changePercent.toFixed(2)}</div>}
            {ticker.change >= 0 && <div className="col-md-3 green-text">{ticker.change.toFixed(2)}</div>}
            {ticker.change >= 0 && <div className="col-md-3 green-text">{ticker.changePercent.toFixed(2)}</div>}
        </div>
    )
}