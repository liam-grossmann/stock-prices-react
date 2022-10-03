import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react'
import './watchList.css'
import './../services/watchList.service'
import { WatchListService } from './../services/watchList.service'
import { ITicker } from './../services/watchList'
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import WatchListButton from './watchListButton'
import TickerDetails from './tickerDetails'
import TickerChart from './tickerChart'

let watchListService = new WatchListService();

export default function WatchList() {

  
   let tickerTapeTimer = timer(3000, 5000);
   let subscription = tickerTapeTimer.subscribe(t => {
        onTickerTape();
    });
    
   
    //subscription.unsubscribe()
    const [watchList, setWatchList] = useState(watchListService.getWatchList());
    const [selectedTicker, setSelectedTicker] = useState(watchList[0])

    const WatchListsidePanel = watchList.map((ticker) =>
        <WatchListButton
            key={ticker.id}
            ticker={ticker}
            onClick={() => handleWatchListButtonOnClick(ticker)}></WatchListButton>
    );

    function handleWatchListButtonOnClick(ticker : ITicker) {
        setSelectedTicker(ticker);
    }

    function onTickerTape(): void {
        for (let ticker of watchList) {
            ticker.isSubscribing = true;
            if (ticker.isSubscribing) {
                let nextPrice = ticker.getNextPrice();
                ticker.updatePrices(nextPrice);
                //this.selectedTicker = this.selectedTicker;
                ticker.isSubscribing = false;
            }
        }
        let newWatchList = [...watchList];
        setWatchList(newWatchList);
        subscription.unsubscribe();
       // subscription = tickerTapeTimer.subscribe(t => {
       ///     onTickerTape();
      //  });
        
    }



    return (
        <div className="row reactivetrader">

            <div className="col-md-4 stackpanel">

                <div className="row stackpanelheader grey-text">&nbsp;NASDAQ Market</div>

                <div className="row grey-text text-center stackpanellabels">
                    <div className="col-md-3">SYMBOL</div>
                    <div className="col-md-3">LATEST</div>
                    <div className="col-md-3">CHANGE</div>
                    <div className="col-md-3">CHG%</div>
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
                    <TickerChart></TickerChart>
                </div>
            </div>
        </div>
        


    )
}
