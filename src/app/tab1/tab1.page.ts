import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RandomService } from '../services/random.service';
import { GainService } from '../services/gain.service';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  subscription: Subscription;
  gain: Subscription;
  randomNumber: number;
  numberGain: number;
 
  searchBook = '';
  bookApiUrl = '';
  bookData = {
    name: '',
    imageUrl: ''
  } 
  /**
   * 
   *  
   */
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;

  constructor(public http: HttpClient, private randomService: RandomService, 
    private gainService: GainService, private route: Router, private barcodeScanner: BarcodeScanner) {
    
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
    preferFrontCamera: false,
    showFlipCameraButton: true,
    showTorchButton: true,
    torchOn: false,
    prompt: 'Place a barcode inside the scan area',
    resultDisplayDuration: 500,
    formats: 'EAN_13, EAN_8,QR_CODE, PDF_417',
    orientation: 'protrait',
  };
  this.barcodeScanner.scan(options).then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.scannedData = barcodeData;

  }).catch(err => {
    console.log('Error', err);
  });

  }
  searchBookResult(){
    let searchB = encodeURIComponent(this.searchBook).trim();
    this.bookApiUrl = 'http://localhost:3000/books?q=' + searchB;
    this.readAPI(this.bookApiUrl).subscribe((data) => {
    let navigationExtras: NavigationExtras = {
      state: {
        bookData: data
      }
    }
    this.route.navigate(['tabs/tab3'], navigationExtras);
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

  ngOnInit(){
    this.randomService.subjectdata();
    this.subscription = this.randomService.dataState.subscribe(
      (value: number) => {
        this.randomNumber = value;
      }
    )
    this.gainService.subjectdata();
    this.gain = this.gainService.dataGainState.subscribe(
      (value: number) => {
        this.numberGain = value;
      }
    )

  }
  ngOnDestroy(){
    if (this.subscription || this.gain) {
      this.subscription.unsubscribe();
    }

  }

}
