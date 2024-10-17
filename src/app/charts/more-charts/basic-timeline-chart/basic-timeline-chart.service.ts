import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BasicTimelineChartService {

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
                            data: [
                                {
                                    x: "Code",
                                    y: [
                                        new Date("2019-03-02").getTime(),
                                        new Date("2019-03-04").getTime()
                                    ]
                                },
                                {
                                    x: "Test",
                                    y: [
                                        new Date("2019-03-04").getTime(),
                                        new Date("2019-03-08").getTime()
                                    ]
                                },
                                {
                                    x: "Validation",
                                    y: [
                                        new Date("2019-03-08").getTime(),
                                        new Date("2019-03-12").getTime()
                                    ]
                                },
                                {
                                    x: "Deployment",
                                    y: [
                                        new Date("2019-03-12").getTime(),
                                        new Date("2019-03-18").getTime()
                                    ]
                                }
                            ]
                        }
                    ],
                    chart: {
                        height: 375,
                        type: "rangeBar",
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
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
                    colors: [
                        "#605DFF"
                    ]
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#basic_timeline_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}