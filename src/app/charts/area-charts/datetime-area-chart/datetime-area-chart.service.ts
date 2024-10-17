import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { data } from "./series-data";

@Injectable({
    providedIn: 'root'
})
export class DatetimeAreaChartService {

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
                            name: "Trezo",
                            data: data
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 350
                    },
                    annotations: {
                        yaxis: [
                            {
                                y: 30,
                                borderColor: "#999",
                                label: {
                                    text: "Support",
                                    style: {
                                        color: "#ffffff",
                                        background: "#00E396"
                                    }
                                }
                            }
                        ],
                        xaxis: [
                            {
                                x: new Date("14 Nov 2012").getTime(),
                                borderColor: "#999",
                                label: {
                                    text: "Rally",
                                    style: {
                                        color: "#ffffff",
                                        background: "#775DD0"
                                    }
                                }
                            }
                        ]
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        size: 0
                    },
                    xaxis: {
                        type: "datetime",
                        min: new Date("01 Mar 2012").getTime(),
                        tickAmount: 6,
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
                    colors: [
                        "#605DFF"
                    ],
                    tooltip: {
                        x: {
                            format: "dd MMM yyyy"
                        }
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            // stops: [0, 100]
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
                const chart = new ApexCharts(document.querySelector('#datetime_area_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}