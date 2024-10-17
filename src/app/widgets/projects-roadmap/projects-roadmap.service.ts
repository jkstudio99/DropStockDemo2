import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ProjectsRoadmapService {

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
                            name: "Projects",
                            data: [400, 550, 600, 700, 1000, 1100, 1200]
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 334,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#3584FC"
                    ],
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: [
                            "Project Planning",
                            "Research",
                            "Design",
                            "Front-end",
                            "Development",
                            "Review & QA",
                            "Launch"
                        ],
                        axisTicks: {
                            show: true,
                            color: '#ECEEF2'
                        },
                        axisBorder: {
                            show: true,
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
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#widgets_projects_roadmap_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}