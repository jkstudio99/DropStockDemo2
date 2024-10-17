import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BrushLineChartService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public generateDayWiseTimeSeries(baseval:any, count:any, yrange:any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Define chart options
                const chartOptions1 = {
                    series: [
                        {
                            name: "series1",
                            data: this.generateDayWiseTimeSeries(
                                new Date("11 Feb 2017").getTime(),
                                185,
                                {
                                    min: 0,
                                    max: 20
                                }
                            )
                        }
                    ],
                    chart: {
                        id: "chart2",
                        type: "line",
                        height: 190,
                        toolbar: {
                            autoSelected: "pan",
                            show: false
                        }
                    },
                    colors: [
                        "#605DFF"
                    ],
                    stroke: {
                        width: 3
                    },
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        opacity: 1
                    },
                    markers: {
                        size: 0
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    xaxis: {
                        type: "datetime",
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#8695AA",
                                fontSize: "12px"
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            show: true,
                            style: {
                                colors: "#64748B",
                                fontSize: "12px"
                            }
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        }
                    }
                };
                const chartOptions2 = {
                    series: [
                        {
                            name: "series1",
                            data: this.generateDayWiseTimeSeries(
                                new Date("11 Feb 2017").getTime(),
                                185,
                                {
                                    min: 0,
                                    max: 20
                                }
                            )
                        }
                    ],
                    chart: {
                        id: "chart1",
                        height: 140,
                        type: "area",
                        brush: {
                            target: "chart2",
                            enabled: true
                        },
                        selection: {
                            enabled: true,
                            xaxis: {
                                min: new Date("19 Jun 2017").getTime(),
                                max: new Date("14 Aug 2017").getTime()
                            }
                        }
                    },
                    colors: [
                        "#0f79f3"
                    ],
                    fill: {
                        type: "gradient",
                        gradient: {
                            opacityFrom: 0.91,
                            opacityTo: 0.1
                        }
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0",
                        row: {
                            colors: ["#f4f6fc", "transparent"], // takes an array which will be repeated on columns
                            opacity: 0.5
                        }
                    },
                    xaxis: {
                        type: "datetime",
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#8695AA",
                                fontSize: "12px"
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            show: true,
                            style: {
                                colors: "#64748B",
                                fontSize: "12px"
                            }
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#brush_line_chart'), chartOptions1);
                const chart2 = new ApexCharts(document.querySelector('#brush_line_chart2'), chartOptions2);
                chart.render();
                chart2.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}