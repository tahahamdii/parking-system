import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent implements OnInit {

  masterService = inject(MasterService);
  parkingLotList: any [] = [];
  parkingList: any [] = [];
  selectedParkingLot: any = {};

  poarkingSpotList: number[]=[];
  selectedParkingSpotNo:number = 0;
  bookingObj: any ={
    "parkingId": 0,
    "parkingLotId": 0,
    "vehicleNo": "",
    "mobileNo": "",
    "inTime": "",
    "outTime": "",
    "parkingDate": new Date(),
    "spotNo": 0
  };
  selectParkingObj: any={};

  ngOnInit(): void {
    this.getParkingLots();
  }

  getParkingLots() {
    this.masterService.getAllParkingLots().subscribe((res:any)=>{
      this.parkingLotList = res.data;
      this.selectedParkingLot =  this.parkingLotList[0];
      debugger;
      this.getActiveParking();
      this.createList( this.selectedParkingLot.totalParkingSpot);

    })
  }

  getActiveParking() {
    this.masterService.getActiveParkingByParkingLotId(this.selectedParkingLot.parkingLotId).subscribe((res:any)=>{
      this.parkingList = res.data;
    })
  }

  checkIfParkingSpotBooked(spotNo: number) {
    return this.parkingList.find(m=>m.spotNo == spotNo);
  }

  createList(totalSpot: number) {
    this.poarkingSpotList = [];
    for (let index = 1; index <= totalSpot; index++) {
      this.poarkingSpotList.push(index)
      
    }
  }
  setSelectedParkingLot(data: any) {
    this.selectedParkingLot = data;
    this.createList(this.selectedParkingLot.totalParkingSpot);
    this.getActiveParking();
  }

  openModel(parkingSpotNo: number) {
    this.selectedParkingSpotNo = parkingSpotNo;
    const model = document.getElementById("bookModal");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  openReleaseModel(parkingPbj:any) {
    this.selectParkingObj = parkingPbj;
    const model = document.getElementById("releaseBookModal");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {
    const model = document.getElementById("bookModal");
    if(model != null) {
      model.style.display = 'none'
    }
  }
  closeReleaseModel() {
    const model = document.getElementById("releaseBookModal");
    if(model != null) {
      model.style.display = 'none'
    }
  }
  onBook() {
    debugger;
    this.bookingObj.parkingLotId = this.selectedParkingLot.parkingLotId;
    this.bookingObj.spotNo = this.selectedParkingSpotNo;
    this.masterService.bookSpot(this.bookingObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Booking Done')
        this.closeModel();
        this.getActiveParking();
      } else {
        alert(res.message)
      }
    })
  }
  releaseSpot() {
    this.masterService.releaseSpot(this.selectParkingObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Spot Released')
        this.closeReleaseModel();
        this.getActiveParking();
      } else {
        alert(res.message)
      }
    })
  }
}
