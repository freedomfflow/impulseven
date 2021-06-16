if (!window.ethereum) {
  web3 = window.ethereum.enable();
}

web3 = new Web3(ethereum);

var myAccountAddress;
let balanceVen, balanceI7;
var myAccount = [];

var maxBalance = "115792089237316195423570985008687907853269984665640564039457584007913129639935"

const tokenABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
      },
      {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
      },
      {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
      }
  ],
  "name": "Approval",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
      },
      {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
      },
      {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
      }
  ],
  "name": "Transfer",
  "type": "event"
},
{
  "inputs": [{
          "internalType": "address",
          "name": "owner",
          "type": "address"
      },
      {
          "internalType": "address",
          "name": "spender",
          "type": "address"
      }
  ],
  "name": "allowance",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
          "internalType": "address",
          "name": "spender",
          "type": "address"
      },
      {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
      }
  ],
  "name": "approve",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "decimals",
  "outputs": [{
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
          "internalType": "address",
          "name": "spender",
          "type": "address"
      },
      {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
      }
  ],
  "name": "decreaseAllowance",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
          "internalType": "address",
          "name": "spender",
          "type": "address"
      },
      {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
      }
  ],
  "name": "increaseAllowance",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "name",
  "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "symbol",
  "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
          "internalType": "address",
          "name": "recipient",
          "type": "address"
      },
      {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
      }
  ],
  "name": "transfer",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
          "internalType": "address",
          "name": "sender",
          "type": "address"
      },
      {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
      },
      {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
      }
  ],
  "name": "transferFrom",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}
]

const swapTokenAddress = "0x8E62550E35e1c4684557F174C84681501822a93E";
const oldTokenAddress = "0x4a341779610760513dB6319D83580cd73C201791";
const I7Addrss = "0x40b785F06946D6A847A6b0e74513D8f01Df758fF";

const oldTokenContract = new web3.eth.Contract(tokenABI, oldTokenAddress);

const i7contract = new web3.eth.Contract(tokenABI, I7Addrss);

const checkBalanceVen = async(myAccountAddress) => {
  oldTokenContract.methods.balanceOf(myAccountAddress).call()
   .then(data => {
       balanceVen = web3.utils.fromWei(data);
       console.log(balanceVen)
       i7contract.methods.balanceOf(myAccountAddress).call()
          .then(data => {
              balanceI7 = web3.utils.fromWei(data);
              console.log(balanceI7)
              $('#swap').removeAttr('disabled')
              $('#tokenBalance').addClass('balance-div')
              $('#tokenBalance').text('My Tokens: ' +balanceI7 +' I7 / ' + balanceVen + ' VEN')
              /* $('#swap').text('Swap Balance: ' + balanceI7 + ' I7 / ' + balanceVen + ' VEN'); */
              /* $('#balance').addClass('dream-btn') <span style='margin: 0px 15px 0px 0px'>Swap</span>*/
          })
   })
}

const connectMetamask = async() => {
  if (window.ethereum) {
      try {
          if (ethereum.chainId != '0x4') {
              alert("Please switch to Main Network");
          }
          else{
            myAccount = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(myAccount[0]);
            myAccountAddress = myAccount[0];
            return myAccountAddress
          }
      } catch (error) {
          console.log(error);
      }
  }
}

var myContract = new web3.eth.Contract([{
      "inputs": [],
      "name": "burnOldToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "claimToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [{
              "internalType": "contract IERC20",
              "name": "_oldToken",
              "type": "address"
          },
          {
              "internalType": "contract IERC20",
              "name": "_newToken",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [{
          "internalType": "address",
          "name": "",
          "type": "address"
      }],
      "name": "approval",
      "outputs": [{
          "internalType": "bool",
          "name": "",
          "type": "bool"
      }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "newToken",
      "outputs": [{
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "newTokenBalance",
      "outputs": [{
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "oldToken",
      "outputs": [{
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "oldTokenBalance",
      "outputs": [{
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "oldTokenContractBalance",
      "outputs": [{
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [{
          "internalType": "address",
          "name": "",
          "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
  }
], swapTokenAddress)



const checkAllownace = () => {
  console.log('myAccountAddress: ', myAccountAddress);

  return new Promise(
      (resolve, reject) => {
          oldTokenContract.methods.allowance(myAccountAddress, swapTokenAddress).call()
              .then(data => {
                  console.log(web3.utils.fromWei(data));
                  resolve(data);
              })
      }
  )
  
}





const approveOldToken = () => {
  oldTokenContract.methods.totalSupply()
      .call()
      .then(data => {
          console.log(web3.utils.fromWei(data));
          // return data;
          oldTokenContract.methods.approve(swapTokenAddress, maxBalance)
              .send({ from: myAccountAddress })
              .then(data => {
                  console.log(data);
                  /* $('#swap').removeAttr('disabled') */
                  // return data;

                  claimToken();
              }).catch(e => {
                  $('#swap').removeAttr('disabled')
              })
      })
}

const claimToken = () => {
  myContract.methods.claimToken()
      .send({ from: myAccountAddress })
      .then(receipt => {
          console.log('receipt: ', receipt);
          /* if(rec) */
          $('#swap').removeAttr('disabled')
          checkBalanceVen(myAccountAddress);
          return receipt;
      }).catch(e => {
          $('#swap').removeAttr('disabled')
      })
}

function hideConnectButton() {
  var x = document.getElementById("connect");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function showSwapButton() {
  var x = document.getElementById("swap");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } 
}


$(document).on('click', '#swap', function(e) {
  console.log("In");
  console.log();
  $('#swap').attr('disabled',true)
  e.preventDefault();
  checkAllownace().then((data) => {
      if (data > 0) {
          claimToken();
      } else {
          approveOldToken();
          /* $('#swap').removeAttr('disabled') */
      }

  })
  /* connectMetamask()
      .then(data => {
      }) */
})

$(document).on('click', '#connect', function(e) {
  var $this = $(this);
  e.preventDefault();
  connectMetamask()
      .then(data => {
        if(data){
          hideConnectButton();
          showSwapButton();
          checkBalanceVen(myAccountAddress);
        }
          /* checkBalanceI7(myAccountAddress); */
          
          
         /*  if (checkAllownace() > 0) {
              claimToken();
          } else {
              approveOldToken();
          } */
      })
})



ethereum.on('accountsChanged', (accounts) => {
  console.log('accounts: ', accounts);
  // Handle the new accounts, or lack thereof.
  // "accounts" will always be an array, but it can be empty.
  /* window.location.reload(); */
});

ethereum.on('chainChanged', (chainId) => {
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have good reason not to.
  window.location.reload();
});

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
  /* document.getElementById('token-balance').innerHTML = '<button type="button" class="btn btn-brand-primary" onClick="getTokenBalance()">Get Token Balance</button>'; */

  // Set up navigation
  navigation();
});