import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BasicBoxplotChartService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Define chart options
                const options = {
                    series: [
                        {
                            name: 'Box',
                            type: 'boxPlot',
                            data: [
                                {
                                    x: new Date('2017-01-01').getTime(),
                                    y: [54, 66, 69, 75, 88]
                                },
                                {
                                    x: new Date('2018-01-01').getTime(),
                                    y: [43, 65, 69, 76, 81]
                                },
                                {
                                    x: new Date('2019-01-01').getTime(),
                                    y: [31, 39, 45, 51, 59]
                                },
                                {
                                    x: new Date('2020-01-01').getTime(),
                                    y: [39, 46, 55, 65, 71]
                                },
                                {
                                    x: new Date('2021-01-01').getTime(),
                                    y: [29, 31, 35, 39, 44]
                                }
                            ]
                        },
                        {
                            name: 'Outliers',
                            type: 'scatter',
                            data: [
                                {
                                    x: new Date('2017-01-01').getTime(),
                                    y: 32
                                },
                                {
                                    x: new Date('2018-01-01').getTime(),
                                    y: 25
                                },
                                {
                                    x: new Date('2019-01-01').getTime(),
                                    y: 64
                                },
                                {
                                    x: new Date('2020-01-01').getTime(),
                                    y: 27
                                },
                                {
                                    x: new Date('2020-01-01').getTime(),
                                    y: 78
                                },
                                {
                                    x: new Date('2021-01-01').getTime(),
                                    y: 15
                                }
                            ]
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "boxPlot",
                        toolbar: {
                            show: true
                        }
                    },
                    colors: [
                        '#605DFF', '#3584FC'
                    ],
                    title: {
                        text: 'BoxPlot - Scatter Chart',
                        align: 'left',
                        offsetX: -9,
                        style: {
                            fontWeight: '500',
                            fontSize: '14px',
                            color: '#64748B'
                        }
                    },
                    xaxis: {
                        type: 'datetime',
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
                    tooltip: {
                        shared: false,
                        intersect: true
                    },
                    yaxis: {
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
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    legend: {
                        show: true,
                        position: 'top',
                        fontSize: '12px',
                        horizontalAlign: 'center',
                        itemMargin: {
                            horizontal: 8,
                            vertical: 0
                        },
                        labels: {
                            colors: '#64748B'
                        },
                        markers: {
                            size: 7,
                            offsetX: -2,
                            offsetY: -.5,
                            shape: 'diamond'
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#basic_boxplot_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}