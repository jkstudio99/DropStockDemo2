import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { githubData } from "./github-data";

@Injectable({
    providedIn: 'root'
})
export class GithubStyleAreaChartService {

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
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        opacity: 1,
                        type: "solid"
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
                    stroke: {
                        width: 0,
                        curve: "smooth"
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    series: [
                        {
                            name: "commits",
                            data: githubData.series
                        }
                    ],
                    chart: {
                        id: "chartyear",
                        type: "area",
                        height: 160,
                        toolbar: {
                            show: false,
                            autoSelected: "pan"
                        }
                    },
                    colors: [
                        "#605DFF"
                    ],
                    yaxis: {
                        show: false,
                        tickAmount: 3,
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
                const options2 = {
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        opacity: 1,
                        type: "solid"
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
                    stroke: {
                        width: 0,
                        curve: "smooth"
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    series: [
                        {
                            name: "commits",
                            data: githubData.series
                        }
                    ],
                    chart: {
                        height: 200,
                        type: "area",
                        toolbar: {
                            autoSelected: "selection"
                        },
                        brush: {
                            enabled: true,
                            target: "chartyear"
                        },
                        selection: {
                            enabled: true,
                            xaxis: {
                                min: new Date("26 Jan 2014").getTime(),
                                max: new Date("29 Mar 2015").getTime()
                            }
                        }
                    },
                    colors: [
                        "#7bd39a"
                    ],
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
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#github_style_area_chart'), options);
                const chart2 = new ApexCharts(document.querySelector('#github_style_area_chart2'), options2);
                chart.render();
                chart2.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}