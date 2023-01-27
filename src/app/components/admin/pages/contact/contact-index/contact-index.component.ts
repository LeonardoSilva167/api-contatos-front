import { Component, OnInit } from '@angular/core';

// Service
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
    this.showData();
  }

  /**
   * array resposanvel por armazenar as informações da lista de contatos
   */
  public contacts!: [];

  /**
   * Carrega os dados da tabela
   */
  showData = async () => {    
      this.contactService.index().subscribe(res => {        
        this.contacts = res;
      })

  }

  /**
   * Faz a requisição de delete com o back
   * 
   * @param name 
   * @param id 
   */
  submitDelete = async (name: string, id: any) => {    
    if(confirm("Confirma exclusão de: "+name)) {
      this.contactService.delete({
        id: id,
      }).subscribe( res => {
        this.deleteRow(id)
      })
    }
  }

  /**
   * Deleta o item da tabela
   * 
   * @param id 
   */
  deleteRow(id: any){
    for(let i = 0; i < this.contacts.length; ++i){
      if (this.contacts[i]['id'] === id) {
        this.contacts.splice(i,1);
      }
    }
  }
}
