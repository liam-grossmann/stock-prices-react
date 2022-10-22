import * as d3 from 'd3';
import { ITicker, IIntradayPrice } from './watchList';

export class ChartingService {

    displayChart(ticker: ITicker, containerWidth: number): void {

        // Initialise dataset
        let dataset = ticker.intradayPrices;
        this.parseTimes(dataset);

        //  Initialise chart dimensions
        let margin = { top: 20, right: 50, bottom: 20, left: 40 };
        let width = containerWidth - margin.left - margin.right;
        let height = 200 - margin.top - margin.bottom;

        this.clearExistingChart();

        // Set the scale ranges
        
        let xScale = this.getXScaleRange(dataset, width);
        let yScale = this.getYScaleRange(dataset, height);

        // Define the axes
        let xAxis = d3.axisBottom(xScale).ticks(7);
        let yAxis = d3.axisRight(yScale).ticks(10); //.tickFormat;  //TODO: (d3.format('.2f')) //(this.format2f);

        // Initiate the line function
        let lineFunction = d3.line<any>()
            .curve(d3.curveMonotoneX)
            .x(function (d) { return xScale(d.time); })
            .y(function (d) { return yScale(d.stockPrice); });

        // Initiate the area line function
        let areaFunction = d3.area<any>()
            .curve(d3.curveMonotoneX)
            .x(function (d) { return xScale(d.time); })
            .y0(height)
            .y1(function (d) { return yScale(d.stockPrice); });

        // Add the svg canvas for the line chart
        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Gradient below the line chart
        let areaGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'areaGradient')
            .attr('x1', '0%').attr('y1', '0%')
            .attr('x2', '0%').attr('y2', '100%');

        // Append the first stop - the color at the top
        areaGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#05AFEC')
            .attr('stop-opacity', 0.6);

        // Append the second stop - white transparant almost at the end
        areaGradient.append('stop')
            .attr('offset', '95%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 0);

        // add the X gridlines
        // svg.append('g')
        //     .attr('class', 'grid')
        //     .call(this.d3.axisLeft(yScale)
        //         .ticks(5)
        //         .tickSize(-width)
        //         .tickFormat(null));

        // Add the X Axis
        let xNode = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);
        xNode.select('path').style('stroke', '#C4C4C4').style('fill', 'none');
        xNode.selectAll('text').style('fill', '#C4C4C4');

        // Add the Y Axis
        let yNode = svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + width + ' ,0)')
            .call(yAxis);
        yNode.select('path').style('stroke', '#C4C4C4').style('fill', 'none');
        yNode.selectAll('text').style('fill', '#C4C4C4');

        // Add chart title
        svg.append('text').text(ticker.id + ' INTRADAY').attr('fill', '#05AFEC');

        // Draw the underlying area chart filled with the gradient
        svg.append('path')
            .attr('class', 'area')
            .style('fill', 'url(#areaGradient)')
            .attr('d', areaFunction(dataset));

        svg.append('path')
            .attr('class', 'line')
            .attr('d', lineFunction(dataset));

       /* TODO
        svg.selectAll('.lineDots')
            .data(dataset, function (d) { return d.time; })
            .enter().append('circle')
            .attr('class', 'lineDots')
            .attr('r', 3)
            .attr('cx', function (d) { return xScale(d.time); })
            .attr('cy', function (d) { return yScale(d.stockPrice); });
         */

        // Add a gradient for the curtain rectangle.
        let gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%')
            .attr('spreadMethod', 'pad');

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#0D1114')
            .attr('stop-opacity', 1);

        gradient.append('stop')
            .attr('offset', '80%')
            .attr('stop-color', '#142131')
            .attr('stop-opacity', 1);


        // Add 'curtain' rectangle to hide entire graph 
        let curtain = svg.append('rect')
            .attr('x', -1 * width)
            .attr('y', -1 * height)
            .attr('height', height)
            .attr('width', width)
            .attr('class', 'curtain')
            .attr('transform', 'rotate(180)')
            .style('fill', 'url(#gradient)');;

        // Create a shared transition for anything we're animating 
        var t = svg.transition()
            .delay(250)
            .duration(2500)
            .ease(d3.easeLinear)
            .on('end', function () {
                // d3.select('line.guide')
                //   .transition()
                //   .style('opacity', 0)
                //   .remove()
            });

        t.select('rect.curtain').attr('width', 0);
        // t.select('line.guide').attr('transform', 'translate(' + width + ', 0)');
    }

    // Parse the time for each item in the dataset
    parseTimes(dataset: any[]): void {
        let parseTime = d3.timeParse('%H:%M');
        dataset.forEach(function (d) {
            d.time = parseTime(d.timeString);
        });
    }

    clearExistingChart(): void {
        d3.select('#chart').selectAll('*').remove();
    }

    getXScaleRange(dataset: IIntradayPrice[], width: number): d3.ScaleTime<number, number> {
        let times = dataset.map(intradayPrice => intradayPrice.time);
        let min = times.reduce(function (a, b) { return a < b ? a : b; }); 
        let max = times.reduce(function (a, b) { return a > b ? a : b; });

        return d3.scaleTime()
            .domain([min, max])
            .range([0, width]);
    }

    getYScaleRange(dataset: IIntradayPrice[], height: number): d3.ScaleLinear<number, number> {
        let prices: number[] = dataset.map(intradayPrice => intradayPrice.stockPrice);
        let min = Math.min.apply(Math, prices);
        let max = Math.max.apply(Math, prices);

        return d3.scaleLinear()
            .domain([min, max])
            .range([height, 0])
            .nice();
    }
}