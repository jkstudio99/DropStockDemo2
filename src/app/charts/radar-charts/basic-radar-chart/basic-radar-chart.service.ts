import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BasicRadarChartService {

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
                            data: [80, 50, 30, 40, 100, 20]
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "radar",
                        toolbar: {
                            show: true
                        }
                    },
                    title: {
                        text: "Basic Radar Chart",
                        align: "left",
                        offsetX: -9,
                        style: {
                            fontWeight: '500',
                            fontSize: '14px',
                            color: '#64748B'
                        }
                    },
                    xaxis: {
                        categories: ["January", "February", "March", "April", "May", "June"]
                    },
                    colors: ["#605DFF"],
                    yaxis: {
                        show: true,
                        tickAmount: 4
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#basic_radar_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}