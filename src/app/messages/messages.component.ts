import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages:string[];

  constructor(public msgSvc:MessageService) { }

  ngOnInit() {
  }

  clear(){
    this.msgSvc.clear();
  }

}
