// invoiceCreation.js
import { LightningElement, track } from 'lwc';
import { getQueryStringParameters } from 'lightning/navigation';
import createInvoice from '@salesforce/apex/InvoiceController.createInvoice';

export default class InvoiceCreation extends LightningElement {
    @track invoiceData = {};
    
    connectedCallback() {
        const params = getQueryStringParameters();
        this.invoiceData = {
            originRecord: params.origin_record,
            account: params.account,
            invoiceDate: params.invoice_date,
            invoiceDueDate: params.invoice_due_date,
            childRelationshipName: params.child_relationship_name,
            lineItemDescription: params.line_item_description,
            lineItemQuantity: params.line_item_quantity,
            lineItemUnitPrice: params.line_item_unit_price
        };
    }
    handleCreateInvoice() {
        // Call Apex method to create invoice record
        createInvoice({ data: this.invoiceData })
            .then(result => {
                // Navigate to the created invoice record
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: result.Id,
                        objectApiName: 'Invoice__c',  // Replace with actual object API name
                        actionName: 'view'
                    }
                });
            })
            .catch(error => {
                console.error('Error creating invoice:', error);
                // Handle error (e.g., show a toast message)
            });
    }

    handleNavigateToCreateInvoice() {
        // Construct URL to navigate to the component with parameters
        const url = '/006/c/YourComponentName?origin_record={!Opportunity.Id}&account={!Opportunity.AccountId}&invoice_date={!Opportunity.CloseDate}&invoice_due_date={!Opportunity.Some_Custom_Field__c}&child_relationship_name=Child_Records&line_item_description=Description&line_item_quantity=Quantity__c&line_item_unit_price=UnitPrice';

        // Use NavigationMixin to navigate to the custom URL
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: url
            }
        });
    }
}