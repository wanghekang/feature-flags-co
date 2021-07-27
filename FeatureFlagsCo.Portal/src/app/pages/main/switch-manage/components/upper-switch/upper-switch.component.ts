import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFfParams, IFfpParams } from '../../types/switch-new';

@Component({
  selector: 'upper-switch',
  templateUrl: './upper-switch.component.html',
  styleUrls: ['./upper-switch.component.less']
})
export class UpperSwitchComponent {

  @Input() featureList: IFfParams[];
  @Input("upperFeatures")
  set data(value: IFfpParams[]){
    this.upperFeatures = [...value];
    this.selectedSwitchID = [];
    value.forEach((item: IFfpParams) => {
      this.selectedSwitchID.push(item.prerequisiteFeatureFlagId);
    })
  };
  

  @Output() onUpperSwicthChange = new EventEmitter<IFfpParams[]>();         // 修改设置

  public selectedSwitchID: string[] = [];
  public upperFeatures: IFfpParams[] = [];

  // 添加上游开关
  onAddUpperSwitch() {
    this.upperFeatures.push({
      prerequisiteFeatureFlagId: null,
      variationValue: null
    });
    this.onOutputResult();
  }

  // 删除开关
  onDeleteSwitch(index: number) {
    this.upperFeatures.splice(index, 1);
    this.selectedSwitchID = [...this.sortoutSelectedID()];
    this.onOutputResult();
  }

  onSelectChange() {
    this.selectedSwitchID = [...this.sortoutSelectedID()];
    this.onOutputResult();
  }

  // 数据发生改变
  public onVariationValueChange() {
    this.onOutputResult();
  }

  private onOutputResult() {
    this.onUpperSwicthChange.next(this.upperFeatures);
  }

  // 筛选选中的开关 ID
  private sortoutSelectedID(): string[] {
    return this.upperFeatures.map(item => item.prerequisiteFeatureFlagId);
  }
}
