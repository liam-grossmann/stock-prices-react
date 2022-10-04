import { ChartingService } from './../services/charting.service'
import { ITicker } from './../services/watchList'
import './tickerChart.css'

interface ITickeChartProps {
    ticker: ITicker
}

let chartingService: ChartingService = new ChartingService();

export default function TickerChart(props: ITickeChartProps) {
    let ticker = props.ticker;
    chartingService.displayChart(ticker);

    return (
        <div className="reactivetraderchartpanel">
            <div id="chart"></div>
        </div>
    )
}



