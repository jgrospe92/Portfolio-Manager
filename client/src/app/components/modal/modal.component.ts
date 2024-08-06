import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { BuyComponent } from '../buy/buy.component';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal, private communication: CommunicationService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  @Input() isBuyValid!: boolean;
  private gridApi!: any;

  // TODO: replace this with the actual data coming from the mock csv file
  // we can create a service that reads the csv file and returns the data
  // This is the stock market data that will be displayed in the modal
  rowData: any[] | null = [];

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'Name' },
    { headerName: 'Ticker', field: 'Symbol' },
    { headerName: 'Instrument', field: 'Type' },
    { headerName: 'Price', field: 'Price' },
    {
      headerName: 'Buy',
      field: 'buy',
      cellRenderer: BuyComponent,
    },
  ];

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSearch(event: any) {
    this.communication
      .getMarketAssetsByName(event.target.value)
      .subscribe((assets: any[]) => {
        this.rowData = assets;
      });
  }

  hasRowData(): boolean {
    return this.gridApi && this.gridApi.getDisplayedRowCount() > 0;
  }
}
