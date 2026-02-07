import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js';

@Component({
  selector: 'app-profit-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profit-bar-chart.component.html',
})
export class ProfitBarChartComponent implements AfterViewInit, OnChanges {
  @Input() sold = 0;
  @Input() rental = 0;

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
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
      this.chart.data.datasets![0].data = [this.sold];
      this.chart.data.datasets![1].data = [this.rental];
      this.chart.update();
    }
  }

  private renderChart(): void {
    if (!this.barCanvas) return;

    const ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold' as const,
    };

    const mode = 'index';
    const intersect = true;

    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['تفاصيل الارباح'],
        datasets: [
          {
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            data: [this.sold],
          },
          {
            backgroundColor: '#ced4da',
            borderColor: '#ced4da',
            data: [this.rental],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode,
          intersect,
        },
        hover: {
          mode,
          intersect,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 4,
                color: 'rgba(0, 0, 0, .2)',
                zeroLineColor: 'transparent',
              },
              ticks: {
                beginAtZero: true,
                callback(value: number) {
                  if (value >= 1000) {
                    value /= 1000;
                    return '$' + value + 'k';
                  }
                  return '$' + value;
                },
                ...ticksStyle,
              },
            },
          ],
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
              ticks: ticksStyle,
            },
          ],
        },
      },
    });
  }
}

