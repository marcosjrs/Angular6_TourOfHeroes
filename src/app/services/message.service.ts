import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages:string[]=[];

  constructor() { }
  
  add(msg){
    this.messages.push(msg);
  }
  clear(){
    this.messages = [];
  }

}
