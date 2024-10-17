import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class GrossEarningsService {

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
                            name: "Earnings",
                            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7]
                        }
                    ],
                    chart: {
                        height: 243,
                        type: "line",
                        toolbar: {
                            show: false
                        }
                    },
                    stroke: {
                        width: 4,
                        curve: "smooth"
                    },
                    xaxis: {
                        categories: [
                            "1W",
                            "2W",
                            "3W",
                            "4W",
                            "5W",
                            "6W",
                            "7W",
                            "8W",
                            "9W",
                            "10W"
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
                            show: true,
                            style: {
                                colors: "#8695AA",
                                fontSize: "12px"
                            }
                        }
                    },
                    grid: {
                        show: false,
                        borderColor: "#ECEEF2"
                    },
                    colors: [
                        '#9135E8'
                    ],
                    yaxis: {
                        show: false,
                        labels: {
                            formatter: (val:any) => {
                                return '$' + val + 'K'
                            },
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
                const chart = new ApexCharts(document.querySelector('#gross_earnings_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}