import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Service
import { ContactService } from 'src/app/services/pages/contact/contact.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  public msgError!: string;
  pageID: any;
  pagePath: any;

  constructor(
    private contactService: ContactService,
    private activatedRoute : ActivatedRoute,
  ){}
  
  /**
   * Array para receber os dados tela
   */
  data: any = {
    id: '',
    name: '',
    email: '',
    telephone: '',
    cell_phone: '',
    additional_contacts: [],
  } 

  /**
   * Recebe informações da pagina atual
   */
  pageData: any = {
    id: '',
    path: '',
    name: 'New',
  } 
    
  public ngOnInit(): void {
    this.msgError = '';
    this.pageData.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.showData();
  }  

  /**
   * Carrega os dados da tabela
   */
  showData = async () => {  
    this.contactService.show({
      id: this.pageData.id
    }).subscribe(res => {        
      this.data.id = res.id;
      this.data.name = res.name;
      this.data.email = res.email;
      this.data.telephone = res.telephone;
      this.data.cell_phone = res.cell_phone;
      this.data.additional_contacts = res.additional_contacts;
    })
  }
}
