
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import { MerchantsService } from './merchants.service';
import { Merchant } from '../model/merchants';



export class MerchantDataSource implements DataSource<Merchant> {

    private lessonsSubject = new BehaviorSubject<Merchant[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private merchantService: MerchantsService) {

    }

    loadMerchants() {

        this.loadingSubject.next(true);

        this.merchantService.getMerchants().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(merchants => this.lessonsSubject.next(merchants)

          );


    }

    connect(collectionViewer: CollectionViewer): Observable<Merchant[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }
  }
