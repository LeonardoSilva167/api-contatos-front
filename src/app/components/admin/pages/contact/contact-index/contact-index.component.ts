import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/pages/contact/contact.service';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.scss']
})
export class ContactIndexComponent implements OnInit {

  constructor(
    private contactService: ContactService,
  ){}

  public ngOnInit(): void {
    this.getItems();
  }

  public msgError!: string;
  public contacts!: [];

  public getItems(){
      this.contactService.index().subscribe(res => {        
        this.contacts = res;
      })

  }

  submitDelete(name: string, id: any){
    if(confirm("Confirma exclusão de: "+name)) {
      this.contactService.delete({
        id: id,
      }).subscribe( res => {
        this.deleteRow(id)
      })
    }
  }

  deleteRow(id: any){
    for(let i = 0; i < this.contacts.length; ++i){
      if (this.contacts[i]['id'] === id) {
        this.contacts.splice(i,1);
      }
    }
  }
}
