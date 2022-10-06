import './tickerDetails.css'
import { ITicker } from './../services/watchList'

interface ITickerDetailsProps {
    ticker: ITicker,
}

export default function TickerDetails(props: ITickerDetailsProps) {
    let ticker = props.ticker;

    return (
        <div className="reactivetraderrightpanel">

            <div className="row">

                {ticker.imageUrl != '' && <div className="col-md-3"><img className='imageStyle' src={ticker.imageUrl}></img></div>}
                {ticker.imageUrl == '' && <div className="col-md-3 text-center large-text">{ticker.id}</div>}

                <div className="col-md-3">
                    <div className="row text-center large-label">LATEST</div>
                    <div className="row blue-text large-text text-center">{ticker.last.toFixed(2)}</div>
                </div>
                
                <div className="col-md-3">
                    <div className="row text-center large-label">CHANGE</div>
                    {ticker.change < 0 && <div className="row red-text large-text text-center">{ticker.change.toFixed(2)}</div>}
                    {ticker.change >= 0 && <div className="row green-text large-text text-center">{ticker.change.toFixed(2)}</div>}
                </div>
            
                <div className="col-md-3">
                    <div className="row text-center large-label">CHANGE %</div>
                    {ticker.change < 0 && <div className="row red-text large-text text-center">{ticker.changePercent.toFixed(2)}</div>}
                    {ticker.change >= 0 && <div className="row green-text large-text text-center">{ticker.changePercent.toFixed(2)}</div>}
                </div>
            </div>

            <div className="row row-bordered" ></div>

            <div className="row grey-text marginTop10">
                <div className="col-md-3 header text-left">EXCHANGE</div>
                <div className="col-md-9 header text-left">SYMBOL / COMPANY NAME</div>
            </div>
            <div className="row">
                <div className="col-md-3 detail text-left">{ticker.exchange}</div>
                <div className="col-md-9 detail text-left">{ticker.id} / {ticker.name}</div>
            </div>

            <div className="row grey-text text-right marginTop10" >
                <div className="col-md-2 header">TODAY'S HIGH</div>
                <div className="col-md-3 header">TODAY'S LOW</div>
                <div className="col-md-3 header">PREVIOUS CLOSE</div>
                <div className="col-md-4 header">MARKET CAP</div>
            </div>
            <div className="row text-right">
                <div className="col-md-2 detail">{ticker.high.toFixed(2)}</div>
                <div className="col-md-3 detail">{ticker.low.toFixed(2)}</div>
                <div className="col-md-3 detail">{ticker.close.toFixed(2)}</div>
                <div className="col-md-4 detail">{ticker.marketCap}</div>
            </div>

            <div className="row grey-text text-right marginTop10">
                <div className="col-md-2 header">52 WEEK HIGH</div>
                <div className="col-md-3 header">52 WEEK LOW</div>
                <div className="col-md-3 header">TOTAL VOLUME</div>
                <div className="col-md-4 header">SECTOR</div>
            </div>
            <div className="row text-right">
                <div className="col-md-2 detail">{ticker.yearHigh.toFixed(2)}</div>
                <div className="col-md-3 detail">{ticker.yearLow.toFixed(2)}</div>
                <div className="col-md-3 detail">{ticker.volume.toFixed(0)}</div>
                <div className="col-md-4 detail">{ticker.sector}</div>
            </div>

        </div>
    )
}
