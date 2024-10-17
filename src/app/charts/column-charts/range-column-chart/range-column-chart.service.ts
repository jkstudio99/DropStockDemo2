import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class RangeColumnChartService {

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
                            name: "Blue",
                            data: [
                                {
                                    x: "Team A",
                                    y: [1, 5]
                                },
                                {
                                    x: "Team B",
                                    y: [4, 6]
                                },
                                {
                                    x: "Team C",
                                    y: [5, 8]
                                },
                                {
                                    x: "Team D",
                                    y: [3, 11]
                                }
                            ]
                        },
                        {
                            name: "Green",
                            data: [
                                {
                                    x: "Team A",
                                    y: [2, 6]
                                },
                                {
                                    x: "Team B",
                                    y: [1, 3]
                                },
                                {
                                    x: "Team C",
                                    y: [7, 8]
                                },
                                {
                                    x: "Team D",
                                    y: [5, 9]
                                }
                            ]
                        }
                    ],
                    chart: {
                        type: "rangeBar",
                        height: 370,
                        toolbar: {
                            show: true
                        }
                    },
                    colors: [
                        "#605DFF", "#FD5812"
                    ],
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    legend: {
                        show: true,
                        position: 'top',
                        fontSize: '12px',
                        horizontalAlign: 'left',
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
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    xaxis: {
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
                        tickAmount: 5,
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
                const chart = new ApexCharts(document.querySelector('#range_column_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}