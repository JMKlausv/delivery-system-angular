import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommandModel, EditSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-ejs-grid',
  templateUrl: './ejs-grid.component.html',
  styleUrls: ['./ejs-grid.component.css']
})
export class EjsGridComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  columnData!:  { field: string, headerText: string }[];
  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  edit:EventEmitter<any> = new EventEmitter<any>();
  public editSettings!: EditSettingsModel;
  public pageSettings!: PageSettingsModel;
  public commands!: CommandModel[];
  @ViewChild('grid') public grid!: GridComponent;
  constructor() { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };

    this.editSettings = { allowEditing: true, allowDeleting: true };
    this.commands = [{ type:"Edit",buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    {type:"Delete", buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }
    ];
  }
  commandClick(args: any) {
    if (args.target.title == 'Delete') {
      this.delete.emit(args.rowData);
    } else if (args.target.title == 'Edit') {
      this.edit.emit(args.rowData);
    }
  }

}
