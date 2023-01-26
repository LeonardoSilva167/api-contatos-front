import { Component, OnInit } from '@angular/core';

//Services
import { ContactService } from 'src/app/services/pages/contact/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private contactService: ContactService,
  ){}

  numberContacts: any = 0;

  ngOnInit(): void {
    this.getCountContacts();
  }
  
  getCountContacts = async () => {    
    this.contactService.getCountContacts().subscribe(res => {        
      // this.contacts = res;
      if(res){
        this.numberContacts = res;
      }
    })

}
}
