// This runs as soon as the main page loads
// to get the create invice form to show up in a modal and also to load the invoice data from local storage into the table
let createInvoiceBtn = document.getElementById('createInvoiceBtn');

// the modal overlay that contains the create invoice form
let modal = document.getElementById('modalOverlay');

// this closes the modal when the user clicks on the close button or cancel button
let closeModalBtn = document.getElementById('closeBtn');

// this also closes the modal when the user clicks on the cancel button
let cancelBtn = document.getElementById('cancelBtn');

window.addEventListener('click', outsideClick); // Load invoices when the page loads

createInvoiceBtn.addEventListener('click', openModal)
function openModal() {
  modal.classList.add('show');
}


closeModalBtn.addEventListener('click', closeModal)
cancelBtn.addEventListener('click', closeModal)
function closeModal() {
  modal.classList.remove('show');
}

function outsideClick(e) {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
}

const form = document.getElementById('invoiceForm');
const errorBar = document.getElementById('errorBar');
const successBar = document.getElementById('successBar');
form.addEventListener('submit', (e) => {
  e.preventDefault();


  if (clientName.value === '' || clientPhone.value === '' || clientEmail.value === '' || amount.value === '' || dueDate.value === '') {
    //alert('Please fill in all fields');
    errorBar.classList.add('show');
    return;
  }

  errorBar.classList.remove('show');

  successBar.classList.add('show');

  setTimeout(() => {
    successBar.classList.remove('show');
    modal.classList.remove('show');
  }, 3000);
  readInvoice()

  //loadInvoices()
})

// get the submit button and add an event listener to it

/*
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  readInvoice();
});*/

function readInvoice() {
  // Get the values from the form inputs
  let clientName = document.getElementById('clientName').value;
  let clientPhone = document.getElementById('clientPhone').value;
  let clientEmail = document.getElementById('clientEmail').value;
  let amount = document.getElementById('amount').value;
  let dueDate = document.getElementById('dueDate').value;

  // Get the existing invoices from local storage or initialize an empty array if none exist
  const invoices = JSON.parse(localStorage.getItem('invoices')) || [];

  // push new invoice data into the invoices array
  invoices.push({
    id: 'INV-' + Date.now(),
    clientName,
    clientPhone,
    clientEmail,
    amount: parseInt(amount),
    dueDate,
    status: 'pending'
  })
  // save them back to local storage
  localStorage.setItem('invoices', JSON.stringify(invoices));

  window.location.href = '/main-project/main-page.html'
}
  
function loadInvoices() {
  const invoices = JSON.parse(localStorage.getItem('invoices')) || [];

  const tableBody = document.getElementById('invoiceTableBody');

  tableBody.innerHTML = ''; // Clear existing table rows

  invoices.forEach((invoice) => {
    const initials = invoice.clientName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    


    tableBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>
          <div class="client-cell">
            <div class="client-avatar">${initials}</div>
            <div>
              <div class="client-name">${invoice.clientName}</div>
              <div class="client-email">${invoice.clientPhone}</div>
            </div>
          </div>
        </td>
        <td>₦${invoice.amount.toLocaleString()}</td>
        <td>${invoice.dueDate}</td>
        <td><span class="badge pending">Pending</span></td>
        <td>
          <div class="action-cell">
            <button class="btn-remind">Reminder</button>
            <button class="btn-icon">⋯</button>
          </div>
        </td>
      </tr>
    `)
  });

    updateStats(invoices)

}
document.addEventListener('DOMContentLoaded', loadInvoices)

function updateStats(invoices) {
  const today = new Date()

  // filter by status
  const pending = invoices.filter(inv => inv.status === 'pending')
  const paid    = invoices.filter(inv => inv.status === 'paid')
  const overdue = invoices.filter(inv => 
    inv.status === 'pending' && new Date(inv.dueDate) < today
  )

  // calculate amounts
  const pendingAmount = pending.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount    = paid.reduce((sum, inv) => sum + inv.amount, 0)

  // update the DOM
  document.getElementById('totalCount').textContent    = invoices.length
  document.getElementById('pendingAmount').textContent = '₦' + pendingAmount.toLocaleString()
  document.getElementById('paidAmount').textContent    = '₦' + paidAmount.toLocaleString()
  document.getElementById('overdueCount').textContent  = overdue.length
}

