import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ImpressionsService {

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
                            name: "Clicks",
                            data: [100, 110, 90, 160, 125, 105, 130, 145, 120, 150, 155, 220, 165, 100, 130, 115, 170, 110, 120, 85, 140, 150]
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 150,
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight",
                        width: 2
                    },
                    colors: [
                        "#EE3E08"
                    ],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            stops: [0, 90, 100],
                            shadeIntensity: 1,
                            opacityFrom: 0.5,
                            opacityTo: 0.9
                        }
                    },
                    xaxis: {
                        categories: [
                            "01 Jan",
                            "02 Jan",
                            "03 Jan",
                            "04 Jan",
                            "05 Jan",
                            "06 Jan",
                            "07 Jan",
                            "08 Jan",
                            "09 Jan",
                            "10 Jan",
                            "11 Jan",
                            "12 Jan",
                            "13 Jan",
                            "14 Jan",
                            "15 Jan",
                            "16 Jan",
                            "17 Jan",
                            "18 Jan",
                            "19 Jan",
                            "20 Jan",
                            "21 Jan",
                            "22 Jan",
                        ],
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: "#8695AA",
                                fontSize: "12px"
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 5,
                        show: false,
                        max: 250,
                        min: 0,
                        labels: {
                            show: true,
                            style: {
                                colors: "#64748B",
                                fontSize: "12px"
                            }
                        },
                        axisBorder: {
                            show: true,
                            color: '#ECEEF2'
                        },
                        axisTicks: {
                            show: true,
                            color: '#ECEEF2'
                        }
                    },
                    grid: {
                        show: false,
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
                const chart = new ApexCharts(document.querySelector('#analytics_impressions_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}