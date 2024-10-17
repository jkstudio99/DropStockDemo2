import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LineAreaChartService {

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
                            name: "Team A",
                            type: "area",
                            data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47]
                        },
                        {
                            name: "Team B",
                            type: "line",
                            data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61]
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "line",
                        toolbar: {
                            show: false
                        }
                    },
                    stroke: {
                        curve: "smooth"
                    },
                    colors: [
                        "#AD63F6", "#FF4023"
                    ],
                    fill: {
                        type: "solid",
                        opacity: [0.35, 1]
                    },
                    labels: [
                        "Dec 01",
                        "Dec 02",
                        "Dec 03",
                        "Dec 04",
                        "Dec 05",
                        "Dec 06",
                        "Dec 07",
                        "Dec 08",
                        "Dec 09 ",
                        "Dec 10"
                    ],
                    markers: {
                        size: 0
                    },
                    yaxis: [
                        {
                            title: {
                                text: "Series A",
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
                        {
                            opposite: true,
                            title: {
                                text: "Series B",
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
                        }
                    ],
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
                    tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: function(y:any) {
                                if (typeof y !== "undefined") {
                                    return y.toFixed(0) + " points";
                                }
                                return y;
                            }
                        }
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
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#line_area_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}