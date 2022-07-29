import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHotelByName'
})
export class SearchHotelByNamePipe implements PipeTransform {

  transform(hotel:any, search:any){
    if(search == undefined){
      return hotel;
    }else{
      return hotel.filter( (hotel:any) => {
        return hotel.name.toLowerCase().includes(search.toLowerCase())

      })
    } 
  };

}
