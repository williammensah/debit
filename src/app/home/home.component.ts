import {  AfterViewInit,ElementRef,ViewChild, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MerchantsService } from '../services/merchants.service';
import { MerchantDataSource } from '../services/merchants.datasource';
import { Merchant } from '../model/merchants';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
// ];

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  page = 2;
  displayedColumns: string[] = [
    'transflow_id',
    'merchant_name',
    'email',
    'phone_number'
  ];
  dataSource: MerchantDataSource;
  length;
  pageSize;
  currentPage;
  pageSizeOptions: number[] = [20, 100];
  pageIndex: Number;
  value = 'Clear me';
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  merchants = new MatTableDataSource<Merchant>([]);
  constructor(
    private service: MerchantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.loadLessonsPage();
  }
  // onPageChange(e) {
  //   console.log(e);

  //    this.loadLessonsPage(e);
  // }
  onPaginateChange(event)
  {
    // console.log("event",event,this.loadLessonsPage);
    const pageSize = event.pageSize;
    const currentPage = event.pageIndex +1;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.loadLessonsPage(currentPage);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(` value ${event.target}`);
    this.merchants.filter = filterValue.trim().toLowerCase();
    console.log(this.loadLessonsPage(this.merchants.filter));
  }
  loadLessonsPage(page?,merchant_name?) {
      this.service.getMerchants(page,merchant_name).subscribe(res => {
      this.merchants.data = res['data'];
      this.length = res['total']
      this.pageSize= res['per_page']
      this.currentPage = res['current_page']
    });
  }
}
