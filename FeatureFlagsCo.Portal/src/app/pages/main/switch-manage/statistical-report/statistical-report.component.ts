import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SwitchService } from 'src/app/services/switch.service';
import * as echarts from 'echarts';
import { map } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'report',
  templateUrl: './statistical-report.component.html',
  styleUrls: ['./statistical-report.component.less']
})
export class StatisticalReportComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('reportEcharts', { static: false }) echartsRef: ElementRef;

  private destory$: Subject<void> = new Subject();
  private myChart: any;
  public switchId: string = '';
  public height: number = 0;
  public width: number = 0;
  public timeSpan: string = 'P7D';

  public totalUsers: number = 0;
  public hitUsers: number = 0;

  private xname: string = '';
  private yname: string = '';

  public isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private switchServe: SwitchService,
    private datePipe: DatePipe
  ) {
    this.switchId = this.route.snapshot.params['id'];
    this.switchServe.listenerEnvID(this.destory$);

  }

  @HostListener('window:resize', ['$event'])
  onResize(evt) {
    this.width = evt.target.innerWidth;
    this.height = this.echartsRef.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.height = this.echartsRef.nativeElement.offsetHeight;
      this.width = this.echartsRef.nativeElement.offsetWidth;
    });
    this.myChart = echarts.init(this.echartsRef.nativeElement);
    this.getFeatureFlagUsage();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  public getFeatureFlagUsage() {
    window.setTimeout(() => {
      this.isLoading = true;
    });
    this.switchServe.getReport(this.switchId, this.timeSpan)
      .pipe(
        map(res => {
          this.totalUsers = res.totalUsers || 0;
          this.hitUsers = res.hitUsers || 0;
          return res['chartData'] || {};
        })
      )
      .subscribe(
        res => {
          const series = this.formatSeries(res);
          this.xname = this.formatXname(res);
          this.yname = this.formatYname(res);
          const option = {
            title: {
              text: '下图为用户触发开关标记判断的次数分布图'
            },
            tooltip: {
              trigger: 'axis',
              formatter: (params: any) => {
                if (!params || !params[0] || !params[0].value) return '';
                return `
                <span>
                  ${this.xname}: <span style="font-weight: bold">${this.datePipe.transform(params[0].value[0], 'short')}</span>
                  <br/>
                  ${this.yname}: <span style="font-weight: bold">${params[0].value[1]}</span>
                </span>`
              },
            },
            xAxis: {
              name: this.xname,
              type: 'time',
            },
            yAxis: {
              name: this.yname,
              type: 'value',
              boundaryGap: [0, '100%'],
            },
            series
          };
          this.myChart.setOption(option);
          this.isLoading = false;
        },
        _ => {
          this.isLoading = false;
        }
      );
  }

  public onTimeSpanClcik(timeSpan: string) {
    this.timeSpan = timeSpan;
    this.getFeatureFlagUsage();
  }

  private formatXname(option: any) {
    const tables = option.tables || [];
    return tables[0]?.columns?.[0]?.name || '';
  }

  private formatYname(option: any) {
    const tables = option.tables || [];
    return tables[0]?.columns?.[1]?.name || '';
  }

  private formatSeries(option: any) {
    const tables = option.tables || [];
    return tables.map(item => {
      return {
        name: item.name,
        type: 'line',
        data: item.rows.sort((a: string[], b: string[]) => new Date(a[0] || '').getTime() - new Date(b[0] || '').getTime())
      }
    });
  }
}
