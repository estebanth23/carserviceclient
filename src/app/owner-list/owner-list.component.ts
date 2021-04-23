import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';


@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  flag: boolean = false;
  ownerList = new Array();
  constructor(private router: Router,private carService: CarService,private giphyService: GiphyService) { }

  ngOnInit() {
    this.carService.getOwner().subscribe(ownerInformation =>{
      this.owners = ownerInformation._embedded.owners;
     for(const owner of this.owners){
        owner.id = owner._links.self.href.slice(50);
        this.giphyService.get(owner.name).subscribe(url=> owner.giphyUrl = url);
      }
    });
  }
  modificateList(myEvent,myOwner:any){
    if (myEvent.target.checked){
      
      this.ownerList.push(myOwner._links.self.href);
    }
    else{
      var myIndex=this.ownerList.indexOf(myOwner._links.self.href);
      this.ownerList.splice(myIndex,1);
    }
    if ((this.ownerList).length!=0){
      this.flag=true;
    }
    else{
      this.flag=false;
    } 

  }
  actulicePage(){
    this.ngOnInit();
    this.router.navigate(['/owner-list']);
  }
  eliminateList(){
    for(const kira of this.ownerList){
      this.carService.remove(kira).subscribe(delet=>{
        this.actulicePage();
      }, error => console.error(error));
    }
  }
}
