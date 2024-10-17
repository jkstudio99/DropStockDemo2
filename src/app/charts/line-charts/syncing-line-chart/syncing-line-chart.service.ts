import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SyncingLineChartService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public generateDayWiseTimeSeries(baseval:any, count:any, yrange:any): any[] {
        let i = 0;
        let series = [];
        while (i < count) {
            var x = baseval;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push([x, y]);
            baseval += 86400000;
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
                            name: "chart1",
                            data: this.generateDayWiseTimeSeries(
                                new Date("11 Feb 2017").getTime(),
                                20,
                                {
                                    min: 10,
                                    max: 60
                                }
                            )
                        }
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight"
                    },
                    toolbar: {
                        tools: {
                            selection: false
                        }
                    },
                    markers: {
                        size: 6,
                        hover: {
                            size: 10
                        }
                    },
                    tooltip: {
                        followCursor: false,
                        x: {
                            show: false
                        },
                        marker: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function() {
                                    return "";
                                }
                            }
                        }
                    },
                    grid: {
                        show: true,
                        clipMarkers: false,
                        borderColor: "#ECEEF2"
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
                    chart: {
                        id: "fb",
                        group: "social",
                        type: "line",
                        height: 160
                    },
                    colors: [
                        "#605DFF"
                    ],
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            show: true,
                            minWidth: 40,
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
                    series: [
                        {
                            name: "chart2",
                            data: this.generateDayWiseTimeSeries(
                                new Date("11 Feb 2017").getTime(),
                                20,
                                {
                                    min: 10,
                                    max: 30
                                }
                            )
                        }
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight"
                    },
                    toolbar: {
                        tools: {
                            selection: false
                        }
                    },
                    markers: {
                        size: 6,
                        hover: {
                            size: 10
                        }
                    },
                    tooltip: {
                        followCursor: false,
                        x: {
                            show: false
                        },
                        marker: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function() {
                                    return "";
                                }
                            }
                        }
                    },
                    grid: {
                        show: true,
                        clipMarkers: false,
                        borderColor: "#ECEEF2"
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
                    chart: {
                        id: "tw",
                        group: "social",
                        type: "line",
                        height: 160
                    },
                    colors: [
                        "#605DFF"
                    ],
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            show: true,
                            minWidth: 40,
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
                const options3 = {
                    series: [
                        {
                            name: "chart3",
                            data: this.generateDayWiseTimeSeries(
                                new Date("11 Feb 2017").getTime(),
                                20,
                                {
                                    min: 10,
                                    max: 60
                                }
                            )
                        }
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight"
                    },
                    toolbar: {
                        tools: {
                            selection: false
                        }
                    },
                    markers: {
                        size: 6,
                        hover: {
                            size: 10
                        }
                    },
                    tooltip: {
                        followCursor: false,
                        x: {
                            show: false
                        },
                        marker: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function() {
                                    return "";
                                }
                            }
                        }
                    },
                    grid: {
                        show: true,
                        clipMarkers: false,
                        borderColor: "#ECEEF2"
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
                    chart: {
                        id: "yt",
                        group: "social",
                        type: "area",
                        height: 160
                    },
                    colors: [
                        "#605DFF"
                    ],
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            show: true,
                            minWidth: 40,
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
                const chart = new ApexCharts(document.querySelector('#syncing_line_chart'), options);
                const chart2 = new ApexCharts(document.querySelector('#syncing_line_chart2'), options2);
                const chart3 = new ApexCharts(document.querySelector('#syncing_line_chart3'), options3);
                chart.render();
                chart2.render();
                chart3.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}