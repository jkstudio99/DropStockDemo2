import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PieMonochromeChartService {

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
                    series: [25, 15, 44, 55, 41, 17],
                    chart: {
                        type: "pie"
                    },
                    labels: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    theme: {
                        monochrome: {
                            enabled: true
                        }
                    },
                    legend: {
                        show: true,
                        offsetY: 0,
                        fontSize: '12px',
                        labels: {
                            colors: '#64748B'
                        },
                        itemMargin: {
                            horizontal: 0,
                            vertical: 5
                        },
                        markers: {
                            size: 7,
                            offsetX: -2,
                            offsetY: -.5,
                            shape: 'diamond'
                        }
                    },
                    dataLabels: {
                        enabled: false
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#pie_monochrome_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}