// This runs as soon as the main page loads
document.addEventListener('DOMContentLoaded', function() {
  loadInvoices();
});

function loadInvoices() {
  // 1. Read the data you saved from localStorage
  const clientName  = localStorage.getItem('clientName');
  const clientPhone = localStorage.getItem('clientPhone');
  const clientEmail = localStorage.getItem('clientEmail');
  const amount      = localStorage.getItem('amount');
  const dueDate     = localStorage.getItem('dueDate');

  // 2. If there's no data yet, stop here
  if (!clientName) return;

  // 3. Find your table body in the HTML
  const tableBody = document.querySelector('table tbody');

  // 4. Build a new row as an HTML string
  const newRow = `
    <tr>
      <td>${clientName}</td>
      <td>₦ ${parseInt(amount).toLocaleString()}</td>
      <td>${dueDate}</td>
      <td><span class="status-pending">Pending</span></td>
      <td><button class="action-btn">Sending Reminder</button></td>
    </tr>
  `;

  // 5. Add the row to the table
  tableBody.insertAdjacentHTML('beforeend', newRow);
}