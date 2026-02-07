import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js';

@Component({
  selector: 'app-status-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-pie-chart.component.html',
})
export class StatusPieChartComponent implements AfterViewInit, OnChanges {
  @Input() available = 0;
  @Input() sold = 0;
  @Input() rentaled = 0;

  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isBrowser && this.chart) {
      this.chart.data.datasets![0].data = [this.available, this.sold, this.rentaled];
      this.chart.update();
    }
  }

  private renderChart(): void {
    if (!this.pieCanvas) return;
    this.chart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [this.available, this.sold, this.rentaled],
            backgroundColor: ['#27c100', '#f3545d', '#fdaf4b'],
            borderWidth: 10,
          },
        ],
        labels: ['Available', 'Sold', 'Rented'],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#000',
            fontSize: 15,
            usePointStyle: true,
            padding: 30,
          },
        },
      },
    });
  }
}

