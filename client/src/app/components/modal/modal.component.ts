import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ValueFormatterFunc, RowModelType } from 'ag-grid-community'; // Column Definition Type Interface
import { BuyComponent } from '../buy/buy.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { AssetService } from 'src/app/services/asset.service';

const numberFormatter: ValueFormatterFunc = (params) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
  });
  return params.value == null ? 'NA' : formatter.format(params.value);
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent implements OnInit {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private assetService: AssetService,
    private communication: CommunicationService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @Input() isBuyValid!: boolean;
  private gridApi!: any;
  isSearching: boolean = false;

  rowData: any[] | null = [];

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Ticker', field: 'ticker' },
    { headerName: 'Instrument', field: 'type' },
    { headerName: 'Price', field: 'price', valueFormatter: numberFormatter },
    {
      headerName: 'Buy',
      field: 'buy',
      cellRenderer: BuyComponent,
    },
  ];

  defaultColDef: ColDef = {
    minWidth: 100,
  };

  public cacheBlockSize = 20;
  public maxBlocksInCache = 10;

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  close() {
    this.modalService.dismissAll();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  fetchStock(name: any) {
    this.isSearching = true;
    this.gridApi.showLoadingOverlay();
    this.communication
      .getMarketAssetsByName(name)
      .subscribe((assets: any[]) => {
        this.rowData = assets;
        this.isSearching = false;
      });
  }

  hasRowData(): boolean {
    return this.gridApi && this.gridApi.getDisplayedRowCount() > 0;
  }
}
