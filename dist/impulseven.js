
function changeText(id) {
  let text = {
    'segment1': { 'pct': "23.5%", 'label': 'farming' },
    'segment2': { 'pct': "17%", 'label': 'Private Round' },
    'segment3': { 'pct': "14%", 'label': 'Strategic Round' },
    'segment4': { 'pct': "12%", 'label': 'Team/Advisor' },
    'segment5': { 'pct': "9%", 'label': 'Development Fund' },
    'segment6': { 'pct': "8.5%", 'label': 'Dex liquidity' },
    'segment7': { 'pct': "8%", 'label': 'Marketing' },
    'segment8': { 'pct': "5%", 'label': 'Reserve' },
    'segment9': { 'pct': "3%", 'label': 'Public Sale' },
  }

  let element = document.getElementById('chart-text');
  element.innerHTML = "<text x='50%' y='50%' class='chart-number' id='chart-text'>" + text[id].pct + "</text>" +
    "<text x='50%' y='50%' class='chart-label' id='chart-text'>" + text[id].label + "</text>";
}

function restoreText() {
  let element = document.getElementById('chart-text');
  element.innerHTML = "<text x='50%' y='52%' class='chart-number' id='chart-text'>I7</text";
}

function goTo(id) {
  let urls = {
    'stake': 'https://stake.impulseven.com/',
    'white': 'https://impulseven.com/docs/ImpulseVen-WP.pdf',
    'disclaimer': 'https://impulseven.com/docs/disclaimer.doc',
    'terms': 'https://impulseven.com/docs/termsOfUse.docx',
  };

  window.open(urls[id], "_blank");
}

// Adding event listener to each nav link so I can close the modal after we scroll without user click
function navigation() {
  let navElements = document.querySelectorAll('.nav-link');
  let sideNavModal = new bootstrap.Modal(document.querySelector("#sidenav"));

  navElements.forEach(el => el.addEventListener('click', event => {
    setTimeout(() => {
      window.scrollBy(0, -100);
      sideNavModal.hide();
    }, 700)
  }));

  // Lets do similar for footer links (no modal, but still need to adjust the scroll
  let footerNavElements = document.querySelectorAll('.footer-nav');
  footerNavElements.forEach(el => el.addEventListener('click', event => {
    setTimeout(() => {
      window.scrollBy(0, -100);
    }, 700)
  }));
}

// Toggle template to show/hide on click
function toggleTemplate(templateId) {
  let el = document.getElementById(templateId);
  if (el.style.display === 'none') {
    el.style.display = 'block';
    document.getElementById('intro-details-text').innerHTML = 'Less Information &#9650;';
  } else {
    el.style.display = 'none';
    document.getElementById('intro-details-text').innerHTML = 'More Information &#9660;';
  }
}

//TODO Method to invoke web3 api to get token balance
function getTokenBalance() {
  //TODO need to add async/await to wait on result and display, substituting data
  let i7bal = '0';
  let venbal = '0';
  document.getElementById('token-balance').innerHTML = '' +
      '<button type="button" class="btn btn-brand-secondary">' +
      'My Tokens:  i7 --> ' + i7bal + ' / ven --> ' + venbal +
      '</button>';
}

// Do Stuff when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Apply more-less text
  document.getElementById('intro-details-text').innerHTML = 'More Information &#9660;';

  // Insert button in header for getting token balance
  document.getElementById('token-balance').innerHTML = '<button type="button" class="btn btn-brand-primary" onClick="getTokenBalance()">Get Token Balance</button>';

  // Set up navigation
  navigation();
});