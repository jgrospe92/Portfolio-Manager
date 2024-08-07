import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { BuyComponent } from '../buy/buy.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { AssetService } from 'src/app/services/asset.service';

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

  rowData: any[] | null = [];

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Ticker', field: 'ticker' },
    { headerName: 'Instrument', field: 'type' },
    { headerName: 'Price', field: 'price' },
    {
      headerName: 'Buy',
      field: 'buy',
      cellRenderer: BuyComponent,
    },
  ];

  defaultColDef: ColDef = {};
  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  // TODO: Replace this method with the actual implementation
  close() {
    this.modalService.dismissAll();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  fetchStock(name: any) {
    this.communication
      .getMarketAssetsByName(name)
      .subscribe((assets: any[]) => {
        this.rowData = assets;
      });
  }

  hasRowData(): boolean {
    return this.gridApi && this.gridApi.getDisplayedRowCount() > 0;
  }
}
