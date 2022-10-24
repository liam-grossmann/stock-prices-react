import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './watchList.css';
import './../services/watchList.service';
import { WatchListService } from './../services/watchList.service';
import { ITicker } from './../services/watchList';
import WatchListButton from './watchListButton';
import TickerDetails from './tickerDetails';
import TickerChart from './tickerChart';

export default function WatchList() {

    let watchListService = new WatchListService();

    const refToDivContainingChart = useRef<HTMLInputElement>(null);
    
    // Use arrrow functions to initialise state only once
    const [watchList, setWatchList] = useState(() => watchListService.getWatchList());
    const [selectedTicker, setSelectedTicker] = useState(() => watchList[0])
    const [seconds, setSeconds] = useState(0);
    const [chartWidth, setChartWidth] = useState(500);
    
    let setIntervalId: number;

    // Get the width of the containing div for the chart. We'll use that width to set the width of the chart
    const handleResize = () => {
        const paddingWidth = 40;
        const containingDivWidth = refToDivContainingChart?.current?.offsetWidth;
        const newChartWidth = (containingDivWidth ? containingDivWidth - paddingWidth : 500);
        setChartWidth(newChartWidth);
    }
    
    // Since we pass '[]' as the dependancies, useEffect will only run when the functional component mounts
    // We return a cleanup function which clears the interval 
    useEffect(() => {
        setSelectedTicker(watchList[0]);
        setIntervalId = setInterval(() => tick(), 2000);
        return (() => clearInterval(setIntervalId));
    }, []);
    
    // Run anytime the reference to div chanages. useLayoutEffect runs synchronously (as opposed to useEffect which runs
    // asynchronously. So useLayoutEffect is ideal when we want to write code that runs in response to layout changes.
    // We return a cleanup function which clears the event listener.
    useLayoutEffect(() => {
        if (refToDivContainingChart.current) {
            handleResize();
        }
        window.addEventListener("resize", handleResize)
        return (() => {
            window.removeEventListener("resize", handleResize)
        });
        
    }, [refToDivContainingChart]);

    // Runs when interval passes - prices are updated. We reset the 'seconds' state variable to force a re-render.
    function tick() {
        for (let ticker of watchList) {
            if (ticker.isSubscribing) {
                let nextPrice = ticker.getNextPrice();
                ticker.updatePrices(nextPrice);
            }
        }
        setSeconds((prevValue => { return prevValue + 1 }))
    };
        
    // Returns a list of 'watchlist' buttons.
    const WatchListsidePanel = watchList.map((ticker) => 
        <WatchListButton
            key={ticker.id}
            ticker={ticker}
            onClick={() => handleWatchListButtonOnClick(ticker)}></WatchListButton>
    );

    function handleWatchListButtonOnClick(ticker: ITicker) {
        setSelectedTicker(ticker);
        ticker.isSubscribing = true;
    };

    return (
        <div className="row reactivetrader">

            <div className="col-md-4 stackpanel">

                <div className="row stackpanelheader grey-text">NASDAQ Market</div>

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

            <div ref={refToDivContainingChart} className="col-md-8">
                <div className="row">
                    <TickerDetails ticker={selectedTicker}></TickerDetails>
                </div>
                <div className="row left-margin-10">
                    <TickerChart ticker={selectedTicker} containerWidth={chartWidth}></TickerChart>
                </div>
            </div>
        </div>
    )
}
