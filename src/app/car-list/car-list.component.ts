import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit() {

    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      for (const car of this.cars) {
        car.id = car._links.self.href.slice(48);
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }

      this.carService.getOwner().subscribe(dataOwner =>{
        this.owners = dataOwner._embedded.owners;
        for (const car of this.cars) {
          car.nameOwner = "No Name";
          for(const owner of this.owners){
            if(car.ownerDni === owner.dni){
              car.nameOwner = owner.name;
              car.ownerDni = owner._links.self.href.slice(50);
              break;
            }
          }
        }
      })
    });
  }




}
