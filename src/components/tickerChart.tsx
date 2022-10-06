import { memo } from "react";
import { ChartingService } from './../services/charting.service'
import { ITicker } from './../services/watchList'
import './tickerChart.css'

interface ITickeChartProps {
    ticker: ITicker
}

let chartingService: ChartingService = new ChartingService();

function TickerChart(props: ITickeChartProps) {
    let ticker = props.ticker;
    chartingService.displayChart(ticker);

    console.debug('Chart getting re-rendered. Stop it !!');

    return (
        <div className="reactivetraderchartpanel">
            <div id="chart"></div>
        </div>
    )
}

export default memo(TickerChart);



