import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DistributedColumnChartService {

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
                            name: "distibuted",
                            data: [21, 22, 10, 28, 16, 21, 13, 30]
                        }
                    ],
                    chart: {
                        height: 370,
                        type: "bar",
                        events: {
                            click: function(chart:any, w:any, e:any) {
                                // console.log(chart, w, e)
                            }
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#605DFF",
                        "#796df6",
                        "#00cae3",
                        "#ffb264",
                        "#2ed47e",
                        "#e74c3c",
                        "#26a69a",
                        "#d10ce8"
                    ],
                    plotOptions: {
                        bar: {
                            columnWidth: "45%",
                            distributed: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false,
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
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    xaxis: {
                        categories: [
                            ["John", "Doe"],
                            ["Joe", "Smith"],
                            ["Jake", "Williams"],
                            "Amber",
                            ["Peter", "Brown"],
                            ["Mary", "Evans"],
                            ["David", "Wilson"],
                            ["Lily", "Roberts"]
                        ],
                        labels: {
                            show: true,
                            style: {
                                colors: [
                                    "#605DFF",
                                    "#796df6",
                                    "#00cae3",
                                    "#ffb264",
                                    "#2ed47e",
                                    "#e74c3c",
                                    "#26a69a",
                                    "#d10ce8"
                                ],
                                fontSize: "12px"
                            }
                        },
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
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
                const chart = new ApexCharts(document.querySelector('#distributed_column_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}