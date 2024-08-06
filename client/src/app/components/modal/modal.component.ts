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

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }
  // TODO: Replace this method with the actual implementation
  close() {
    this.modalService.dismissAll();
    setTimeout(() => {
      location.reload();
    }, 500);
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

  // TODO: Implement this method
  private async loadRealTimePrices(): Promise<void> {
    if (!this.rowData) {
      console.error('rowData is not defined');
      return;
    }

    const tickers = this.rowData.map((row) => row.ticker);
    if (!tickers || tickers.length === 0) {
      console.error('No tickers found');
      return;
    }

    try {
      const pricePromises = tickers.map((ticker) =>
        this.loadRealTimePrice(ticker)
      );
      const prices = await Promise.all(pricePromises);

      this.rowData = this.rowData.map((row, index) => ({
        ...row,
        prices: prices[index],
      }));

      console.log('prices now, ', prices);
      console.log('grid now, ', this.gridApi);
      // Refresh the grid to show the real-time prices
      if (this.gridApi) {
        this.gridApi.setRowData(this.rowData);
      } else {
        console.error('gridApi is not defined');
      }
    } catch (error) {
      console.error('Error loading real-time prices:', error);
    }
  }

  private loadRealTimePrice(ticker: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.assetService.getRealTimePrice(ticker).subscribe(
        (data) => {
          resolve(data.price);
          console.log('data price', data.price);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  // ----
}
