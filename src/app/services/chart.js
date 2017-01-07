/**
 * Created by dx.yang on 2016/12/6.
 */

import highcharts from 'highcharts/highstock';

const defaultOptions = {
    chart: {
        type: 'line',
        backgroundColor: '#fcfcfc',
        borderColor: '#d8d8d8',
        borderWidth: 1,
    },
    xAxis: {
        labels: {
            align: 'left'
        },
    },
    yAxis: {},
    tooltip: {
        borderColor: '#bfbfbf',
        shadow: false,
        valueSuffix: '',
        valueDecimals: 6
    },
    labels: {
        formatter: function () {
            return this.value.toFixed(8);//这里是两位小数，你要几位小数就改成几
        },
        style: {
            color: 'red'
        }
    },
    credits: {
        text: '',
        href: ''
    },

    plotOptions: {
        areaspline: {
            lineWidth: 1,
            fillOpacity: 0.2
        },
        series: {
            turboThreshold: 0,
            dataGrouping: {
                approximation: 'high',

                dateTimeLabelFormats: {
                    millisecond: ['%A, %b %e日, %H:%M:%S.%L', '%A, %b %e日, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                    second: ['%A, %b %e日, %H:%M:%S', '%A, %b %e日, %H:%M:%S', '-%H:%M:%S'],
                    minute: ['%A, %b %e日, %H:%M', '%A, %b %e日, %H:%M', '-%H:%M'],
                    hour: ['%A, %b %e日, %H:%M', '%A, %b %e日, %H:%M', '-%H:%M'],
                    day: ['%A, %b %e日, %Y', '%A, %b %e日', '-%A, %b %e日, %Y'],
                    week: ['Settimana del %d/%m/%Y', '%A, %b %e日', '-%A, %b %e日, %Y'],
                    month: ['%B %Y', '%B', '-%B %Y'],
                    year: ['%Y', '%Y', '-%Y']
                }
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e日, %H:%M:%S.%L",
                    second: "%A, %b %e日, %H:%M:%S",
                    minute: "%A, %b %e日, %H:%M",
                    hour: "%A, %b %e日, %H:%M",
                    day: "%A, %b %e日, %Y",
                    week: "Week from %A, %b %e日, %Y",
                    month: "%B %Y",
                    year: "%Y"
                }
            }
        }
    },
    exporting: {
        enabled: false
    },
    colors: ['#56aff0', '#ff8a00', '#50a157', /* 后面都是默认颜色 */ '#7cb5ec', '#434348', '#90ed7d', '#f7a35c',
        '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    legend: {
        enabled: true,
    },
    navigator: {
        margin: 10
    },
    rangeSelector: {
        enabled: false
    },
    title: {
        align: 'left',
        text: ''
    },
    // series: []
};


export default {
    render(container, options) {
        let op = _.assign({}, defaultOptions, options);
        highcharts.stockChart(container, op);
    }
};