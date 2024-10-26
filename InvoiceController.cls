public with sharing class InvoiceController {
    @AuraEnabled
    public static void createInvoice(Map<String, String> data) {
        Invoice__c newInvoice = new Invoice__c();
        newInvoice.Account__c = data.get('account');
        newInvoice.Invoice_Date__c = Date.valueOf(data.get('invoice_date'));
        newInvoice.Due_Date__c = Date.valueOf(data.get('invoice_due_date'));
        newInvoice.Invoice_Reference__c = data.get('origin_record'); // customize as needed

        insert newInvoice;

        // Create Line Item
        Line_Item__c newLineItem = new Line_Item__c();
        newLineItem.Invoice__c = newInvoice.Id;
        newLineItem.Line_Description__c = data.get('line_item_description');
        newLineItem.Quantity__c = Integer.valueOf(data.get('line_item_quantity'));
        newLineItem.Unit_Price__c = Decimal.valueOf(data.get('line_item_unit_price'));
        newLineItem.Amount__c = newLineItem.Quantity__c * newLineItem.Unit_Price__c;

        insert newLineItem;

    }
}
