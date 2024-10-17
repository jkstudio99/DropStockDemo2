import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BasicHeatmapChartService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public generateData(count:any, yrange:any) {
        var i = 0;
        var series = [];
        while (i < count) {
        var x = "w" + (i + 1).toString();
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push({
                x: x,
                y: y
            });
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
                const options = {
                    series: [
                        {
                            name: "Metric 1",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 2",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 3",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 4",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 5",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 6",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 7",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 8",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "Metric 9",
                            data: this.generateData(18, {
                                min: 0,
                                max: 90
                            })
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "heatmap",
                        toolbar: {
                            show: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        "#0f79f3"
                    ],
                    title: {
                        text: "HeatMap Chart (Single color)",
                        align: "left",
                        offsetX: -9,
                        style: {
                            fontWeight: '500',
                            fontSize: '14px',
                            color: '#64748B'
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
                const chart = new ApexCharts(document.querySelector('#basic_heatmap_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}