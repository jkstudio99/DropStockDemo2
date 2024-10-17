import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class RotatedLabelsColumnChartService {

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
                            name: "Servings",
                            data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
                        }
                    ],
                    annotations: {
                        points: [
                            {
                                x: "Bananas",
                                seriesIndex: 0,
                                label: {
                                    borderColor: "#605DFF",
                                    offsetY: 0,
                                    style: {
                                        fontSize: '14px',
                                        color: "#ffffff",
                                        background: "#605DFF"
                                    },
                                    text: "Bananas are good"
                                }
                            }
                        ]
                    },
                    chart: {
                        height: 350,
                        type: "bar",
                        toolbar: {
                            show: true
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: "50%",
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: 2
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    xaxis: {
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        labels: {
                            rotate: -45,
                            show: true,
                            style: {
                                colors: "#64748B",
                                fontSize: "13px"
                            }
                        },
                        categories: [
                            "Apples",
                            "Oranges",
                            "Strawberries",
                            "Pineapples",
                            "Mangoes",
                            "Bananas",
                            "Blackberries",
                            "Pears",
                            "Watermelons",
                            "Cherries",
                            "Pomegranates",
                            "Tangerines",
                            "Papayas"
                        ],
                        tickPlacement: "on"
                    },
                    yaxis: {
                        title: {
                            text: "Servings",
                            style: {
                                color: "#3A4252",
                                fontSize: "14px",
                                fontWeight: 500
                            }
                        },
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
                    fill: {
                        type: "gradient",
                        gradient: {
                            shade: "light",
                            type: "horizontal",
                            shadeIntensity: 0.25,
                            gradientToColors: undefined,
                            inverseColors: true,
                            opacityFrom: 0.85,
                            opacityTo: 0.85,
                            // stops: [50, 0, 100]
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#rotated_labels_column_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}