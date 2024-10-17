import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { dataSeries } from "./data-series";

@Injectable({
    providedIn: 'root'
})
export class ZoomableLineChartService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Series data
                let ts2 = 1484418600000;
                let dates = [];
                for (let i = 0; i < 120; i++) {
                    ts2 = ts2 + 86400000;
                    dates.push([ts2, dataSeries[1][i].value]);
                }

                // Define chart options
                const options = {
                    series: [
                        {
                            name: "XYZ MOTORS",
                            data: dates
                        }
                    ],
                    chart: {
                        type: "area",
                        stacked: false,
                        height: 350,
                        zoom: {
                            type: "x",
                            enabled: true,
                            autoScaleYaxis: true
                        },
                        toolbar: {
                            show: true,
                            autoSelected: "zoom"
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        hover: {
                            sizeOffset: 5
                        }
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    title: {
                        text: "Stock Price Movement",
                        align: "left",
                        offsetX: -9,
                        style: {
                            fontWeight: '500',
                            fontSize: '14px',
                            color: '#64748B'
                        }
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            inverseColors: false,
                            shadeIntensity: 1,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            // stops: [0, 90, 100]
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
                        tickAmount: 5,
                        labels: {
                            formatter: function(val:any) {
                                return (val / 1000000).toFixed(0);
                            },
                            show: true,
                            style: {
                                colors: "#64748B",
                                fontSize: "12px"
                            }
                        },
                        title: {
                            text: "Price",
                            style: {
                                color: "#3A4252",
                                fontSize: "14px",
                                fontWeight: 500
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
                    tooltip: {
                        shared: false,
                        y: {
                            formatter: function(val:any) {
                                return (val / 1000000).toFixed(0);
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#zoomable_line_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}