import { memo } from "react";
import { ChartingService } from './../services/charting.service'
import { ITicker } from './../services/watchList'
import './tickerChart.css'

interface ITickeChartProps {
    ticker: ITicker,
    containerWidth: number,
}

let chartingService: ChartingService = new ChartingService();

function TickerChart(props: ITickeChartProps) {
    let ticker = props.ticker;
    let containerWidth = props.containerWidth;
    chartingService.displayChart(ticker, containerWidth);

    return (
        <div className="reactivetraderchartpanel">
            <div id="chart"></div>
        </div>
    )
}

export default memo(TickerChart);



