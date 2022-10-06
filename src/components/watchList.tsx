import { useState, useEffect, useLayoutEffect } from 'react';
import './watchList.css';
import './../services/watchList.service';
import { WatchListService } from './../services/watchList.service';
import { ITicker } from './../services/watchList';
import WatchListButton from './watchListButton';
import TickerDetails from './tickerDetails';
import TickerChart from './tickerChart';

export default function WatchList() {

    let watchListService = new WatchListService();
    
    const [watchList, setWatchList] = useState(watchListService.getWatchList());
    const [selectedTicker, setSelectedTicker] = useState(watchList[1])
    const [seconds, setSeconds] = useState(0);
    let setIntervalId: number;

    // Similar to componentDidMount 
    useEffect(() => {
        setSelectedTicker(watchList[0]);
        setIntervalId = setInterval(() => tick(), 2000);
    }, []);
    
    // Similiar to ComponentWillUnmount
    useLayoutEffect(() => {
        clearInterval(setIntervalId);
    }, []);

    function tick() {
        console.debug('Tick running. Seconds is: ' + seconds)
        setSeconds((prevValue => { return prevValue + 1 }))
        for (let ticker of watchList) {
            if (ticker.isSubscribing) {
                let nextPrice = ticker.getNextPrice();
                ticker.updatePrices(nextPrice);
            }
        }
    };
        
    const WatchListsidePanel = watchList.map((ticker) =>
        <WatchListButton
            key={ticker.id}
            ticker={ticker}
            onClick={() => handleWatchListButtonOnClick(ticker)}></WatchListButton>
    );

    function handleWatchListButtonOnClick(ticker: ITicker) {
        setSelectedTicker(ticker);
    };

    return (
        <div className="row reactivetrader">

            <div className="col-md-4 stackpanel">

                <div className="row stackpanelheader grey-text">&nbsp;NASDAQ Market</div>

                <div className="row grey-text text-center stackpanellabels">
                    <div className="col-md-3">SYMBOL</div>
                    <div className="col-md-3">LATEST</div>
                    <div className="col-md-3">CHANGE</div>
                    <div className="col-md-3">CHG %</div>
                </div>

                <div className="stackpanelbuttons">
                    {WatchListsidePanel}
                </div>
            </div>

            <div className="col-md-8">
                <div className="row">
                    <TickerDetails ticker={selectedTicker}></TickerDetails>
                </div>
                <div className="row">
                    <TickerChart ticker={selectedTicker}></TickerChart>
                </div>
            </div>
        </div>
    )
}
