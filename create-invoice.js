function createInvoice(){
    let invoiceData = retrieveInvoiceData(); // Function to get data from form inputs
    let readInvoiveData = readingDataFromLocalStorage(invoiceData); // Function to read existing data from local storage
    console.log(readInvoiveData);

    alert('Invoice created successfully!');
}

function retrieveInvoiceData(){
    // Code to retrieve data from form inputs and return as an object
    let clientName = document.getElementById('clientName').value;
    let clientPhone = document.getElementById('clientPhone').value;
    let clientEmail = document.getElementById('clientEmail').value;
    let amount = document.getElementById('amount').value;
    let dueDate = document.getElementById('dueDate').value;

    let invoiceData = {
        clientName,
        clientPhone,
        clientEmail,
        amount,
        dueDate
    };
        
    return invoiceData;
}

//Read data from local storage

function readingDataFromLocalStorage(invoiceData){
    // Storing data in local storage

    let cn = localStorage.setItem('clientName', invoiceData.clientName);
    let cp = localStorage.setItem('clientPhone', invoiceData.clientPhone);
    let ce = localStorage.setItem('clientEmail', invoiceData.clientEmail);
    let am = localStorage.setItem('amount', invoiceData.amount);
    let dd = localStorage.setItem('dueDate', invoiceData.dueDate);

    // getting values from local to table
    let getClientName = localStorage.getItem('clientName');
    let getClientPhone = localStorage.getItem('clientPhone');
    let getClientEmail = localStorage.getItem('clientEmail');
    let getAmount = localStorage.getItem('amount');
    let getDueDate = localStorage.getItem('dueDate');

    let getInvoiceData = {
        getClientName,
        getClientPhone,
        getClientEmail,
        getAmount,
        getDueDate
    };
        
    return getInvoiceData;
}
