import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdditionalContactService } from 'src/app/services/pages/contact/additional-contact.service';
import { ContactService } from 'src/app/services/pages/contact/contact.service';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.scss']
})
export class ContactAddEditComponent implements OnInit{

  public formContact: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    cell_phone: ['', [Validators.required]],
    additional_contacts: [{}]
  })

  public formAdditionalContact: FormGroup = this.formBuilder.group({    
    additional_id: [''],
    contact_id: [''],
    index: [''],
    additional_email: ['', [Validators.required, Validators.email]],
    additional_telephone: ['', [Validators.required]],
    additional_cell_phone: ['', [Validators.required]],
  })

  public msgError!: string;
  
  data: any = {
    additional_contacts: [],
  } 

  pageData: any = {
    id: '',
    path: '',
    name: 'New',
  } 

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private additionalContactService: AdditionalContactService,
    private activatedRoute : ActivatedRoute,
  ){}
  
  public ngOnInit(): void {
    this.msgError = '';
    this.pageData.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.pageData.path = this.activatedRoute.snapshot.url[0].path;
    
    
    if(this.isPageEdit()){
      this.showData();
      this.pageData.name = 'Edit';
    }

  }

  submitForm(){
    if(this.formContact.valid){
      this.formContact.patchValue({
        additional_contacts: this.data.additional_contacts,
      })
      if(this.isPageEdit()){        
        this.submitEdit()
      }
      else{
        this.submitCreate()
      }      
    }
  }

  showData = async () => {    
    this.contactService.show({
      id: this.pageData.id
    }).subscribe(res => {              
      this.setDataFields(res)      
    })
  }

  submitCreate = async () => {
    this.contactService.create({
      name: this.formContact.value.name,
      email: this.formContact.value.email,
      telephone: this.formContact.value.telephone,
      cell_phone: this.formContact.value.cell_phone,
      additional_contacts: this.formContact.value.additional_contacts,
    }).subscribe({
      next: (res) => res,
      error: (e)=> (this.msgError = e),
    })
  }

  submitEdit = async () => {
    this.contactService.edit({
      id: this.pageData.id,      
      name: this.formContact.value.name,
      email: this.formContact.value.email,
      telephone: this.formContact.value.telephone,
      cell_phone: this.formContact.value.cell_phone,
      additional_contacts: this.formContact.value.additional_contacts,
    }).subscribe({
      next: (res) => res,
      error: (e)=> (this.msgError = e),
    })
  }

  setDataFields(res: any){
    this.formContact.patchValue({
      name: res.name, 
      email: res.email, 
      telephone: res.telephone, 
      cell_phone: res.cell_phone, 
    });
    this.data.additional_contacts = res.additional_contacts;
    for (const key in res.additional_contacts) {
      if (Object.prototype.hasOwnProperty.call(res.additional_contacts, key)) {
        const element = res.additional_contacts[key];
        this.data.additional_contacts[key].index = key;        
      }
    }
  }

  isPageEdit(){
    return this.pageData.id && this.pageData.path == 'edit';
  }

  addAdditionalContacts(){
    if(this.formAdditionalContact.valid){
      this.data.additional_contacts.push({
        'id': this.formAdditionalContact.value.additional_id,
        'contact_id': this.pageData.id,
        'email': this.formAdditionalContact.value.additional_email,
        'telephone': this.formAdditionalContact.value.additional_telephone,
        'cell_phone': this.formAdditionalContact.value.additional_cell_phone,
      })

      this.clearAdditionalContact();
    }
  }
  
  submitDelete = async (name: string, id: any, event: any) => {
    
    event.preventDefault();
    event.stopPropagation();

    if(confirm("Confirma exclusão de: "+name)) {
      if(id){
        this.additionalContactService.delete({id: id,}).subscribe( res => {
          this.deleteRow(id)          
        })
      }
      this.deleteRow(id)
    }
  }

  deleteRow = async (id: any) => {

    for(let i = 0; i < this.data.additional_contacts.length; ++i){
      if (this.data.additional_contacts[i]['id'] === id) {
        this.data.additional_contacts.splice(i,1);
      }
    }
  }
  
  clearAdditionalContact(){
    this.formAdditionalContact.setValue({
      'additional_id': '',
      'contact_id': '',
      'index': '',
      'additional_email': '',
      'additional_telephone': '',
      'additional_cell_phone': '',
    });
  }

}
