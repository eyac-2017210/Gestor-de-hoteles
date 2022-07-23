import { Component, OnInit } from '@angular/core';
import { invoiceModel } from 'src/app/models/invoice.models';
import { InvoiceRestService } from 'src/app/services/invoiceRest/invoice-rest.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoice: invoiceModel;
  invoices: any;
  facturas: any;

  constructor(
    public invoiceRest: InvoiceRestService
    
  ) { 
    this.invoice = new invoiceModel('','','', new Date(), 0, 0, '');
  }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(){
    this.invoiceRest.getInvoices().subscribe({
      next:(res:any)=>{
        this.invoices= res.invoices;
        console.log(this.invoices);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

}
