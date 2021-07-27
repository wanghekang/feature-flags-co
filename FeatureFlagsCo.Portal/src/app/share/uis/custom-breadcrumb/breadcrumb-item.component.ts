/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

import { XuBreadCrumbComponent } from './breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'xu-breadcrumb-item',
  exportAs: 'nzBreadcrumbItem',
  styleUrls: ['./style/entry.less'],
  preserveWhitespaces: false,
  template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="xu-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <i *ngIf="!!nzOverlay" nz-icon nzType="down"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="xu-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="xu-breadcrumb-separator" *ngIf="xuBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="xuBreadCrumbComponent.nzSeparator">
        {{ xuBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </span>
  `
})
export class XuBreadCrumbItemComponent {
  /**
   * Dropdown content of a breadcrumb item.
   */
  @Input() nzOverlay?: NzDropdownMenuComponent;

  constructor(public xuBreadCrumbComponent: XuBreadCrumbComponent) {}
}
