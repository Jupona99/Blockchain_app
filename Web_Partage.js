// 1. Declare global variable to store the web3 instance
let myContract;
let signer;
let provider;

// 2. Set contract address and ABI
const my_Contract_Address = "0xd58bD79640C514A4A9aC0EA8b4858A59a87EB86e";
const my_Contract_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_iso",
        type: "string",
      },
    ],
    name: "addCertifications",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_statistics",
        type: "uint256",
      },
    ],
    name: "addStatistics",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "addressList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToCompanyName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "string",
        name: "_uRL",
        type: "string",
      },
    ],
    name: "createCompany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllCompanyNames",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCertifications",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCompany",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "certificatesNumber",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "uRL",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
    ],
    name: "getCompanyInfo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "companyName",
            type: "string",
          },
          {
            internalType: "string",
            name: "visibility",
            type: "string",
          },
        ],
        internalType: "struct CompanyFactory.Partners[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPartners",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getPartnershipStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingRequests",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReceivedRequests",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
    ],
    name: "getSelectedCompany",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "uRL",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStatistics",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasCompany",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownerOfContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "partnerRequests",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "partnerships",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_accept",
        type: "bool",
      },
    ],
    name: "respondToPartnerRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "sendPartnerRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
    ],
    name: "setPrivatePartner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
    ],
    name: "setPublicPartner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
    ],
    name: "setTransparentPartner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userCompanies",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userHasCompany",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "visibilityPartners",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "companyName",
            type: "string",
          },
          {
            internalType: "string",
            name: "visibility",
            type: "string",
          },
        ],
        internalType: "struct CompanyFactory.Partners[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Gérer l'événement "accountsChanged" pour détecter les changements de compte ou les déconnexions
ethereum.on("accountsChanged", (accounts) => {
  if (accounts.length === 0) {
    // L'utilisateur s'est déconnecté de MetaMask
    window.location = "./ConnectPage.html";
  }
});

// Créer une instance du fournisseur ethers.js avec MetaMask
provider = new ethers.providers.Web3Provider(window.ethereum);
signer = provider.getSigner();

// Créer une instance du contrat en utilisant l'adresse et l'ABI
myContract = new ethers.Contract(my_Contract_Address, my_Contract_ABI, signer);

Connect = () => {
  // Demander à l'utilisateur la permission de se connecter
  ethereum.request({ method: "eth_requestAccounts" }).then(async (accounts) => {
    // Récupérer l'adresse du compte connecté
    const address = accounts[0];

    // Afficher l'adresse dans la console
    console.log("Adresse du compte connecté :", address);

    // Rediriger vers la page d'accueil après la connexion réussie

    const VerifyAccount = async () => {
      const hasCompany = await myContract.hasCompany();
      if (hasCompany) {
        window.location = "./HomePage.html?getCompany=true";
      } else {
        window.location = "./CreateCompany.html";
      }
    };
    VerifyAccount();
  });
};

$(document).ready(function () {
  $(".create-company-button").on("click", CreateCompany);
});

const CreateCompany = async (event) => {
  event.preventDefault();
  const _name = document.getElementById("_name").value;
  const _location = document.getElementById("_location").value;
  const _uRL = document.getElementById("_uRL").value;
  showLoadingIndicator();
  const transaction = await myContract.createCompany(_name, _location, _uRL);
  await transaction.wait();
  hideLoadingIndicator();
  window.location = "./HomePage.html?getCompany=true";
};

function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "none";
}

$(document).ready(function () {
  $("#addPartnerButton").on("click", addPartner);
});

const GetPendingRequests = async () => {
  const pendingList = await myContract.getPendingRequests();

  let table = "<table><tr><th>Names</th><th>Requests</th></tr>";

  for (let i = 0; i < pendingList.length; i++) {
    table += `<tr><td>${pendingList[i]}</td><td>pending</td></tr>`;
  }

  table += "</table>";
  document.getElementById("resultPending").innerHTML = table;
};

const GetReceivedRequests = async () => {
  const receivedList = await myContract.getReceivedRequests();

  let table = "<table><tr><th>Names</th><th>Requests</th></tr>";

  for (let i = 0; i < receivedList.length; i++) {
    const companyName = receivedList[i];
    const acceptButtonId = `acceptButton${i}`;

    table += `
      <tr>
        <td>${companyName}</td>
        <td><button id="${acceptButtonId}">Accept</button></td>
      </tr>
    `;

    $(document).ready(function () {
      $(`#${acceptButtonId}`).on("click", () => {
        RespondToPartnerRequest(companyName);
      });
    });
  }

  table += "</table>";
  document.getElementById("resultReceived").innerHTML = table;
};

const RespondToPartnerRequest = async (selectedCompanyName) => {
  const transaction = await myContract.respondToPartnerRequest(
    selectedCompanyName,
    true
  );
  await transaction.wait();
  showMessage("Partner was successfully added");
  window.location = "./HomePage.html?getCompany=true";
};

const addPartner = async (event) => {
  event.preventDefault();
  const selectedCompanyName = $("#companyName").text();
  showLoadingIndicator();
  const transaction = await myContract.sendPartnerRequest(selectedCompanyName);
  await transaction.wait();
  hideLoadingIndicator();
  showMessage("Request was successfully sent");
  window.location = "./HomePage.html?getCompany=true";
};

$("#setPartnerDropdown").change(function () {
  const selectedOption = $(this).val();
  console.log("Selected option:", selectedOption);
});

$(document).ready(function () {
  $("#setPartnerButton").on("click", SetPartner);
});

const SetPartner = async (event) => {
  event.preventDefault();
  const selectedCompanyName = $("#companyName").text();
  const selectedPartnerType = $("#setPartnerDropdown").val();
  showLoadingIndicator();
  switch (selectedPartnerType) {
    case "private":
      const privatePartner = await myContract.setPrivatePartner(
        selectedCompanyName
      );
      await privatePartner.wait();
      showMessage("Private partner was successfully added");
      break;
    case "public":
      const publicPartner = await myContract.setPublicPartner(
        selectedCompanyName
      );
      await publicPartner.wait();
      showMessage("Public partner was successfully added");
      break;
    case "transparent":
      const transparentPartner = await myContract.setTransparentPartner(
        selectedCompanyName
      );
      await transparentPartner.wait();
      showMessage("Transparent partner was successfully added");
      break;
    default:
      break;
  }
  hideLoadingIndicator();
  window.location = "./HomePage.html?getCompany=true";
};

const showMessage = (message) => {
  // Affiche le message de confirmation dans une boîte de dialogue ou un élément HTML approprié
  alert(message);
};

const filterCompanyNames = () => {
  const filter = $("#searchInput").val().toLowerCase();
  const companies = $(".company");

  companies.each(function () {
    const name = $(this).text().toLowerCase();
    if (name.includes(filter)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
};

const filterPartnerNames = () => {
  const filter = $("#searchPartnerInput").val().toLowerCase();
  const partners = $(".company");

  partners.each(function () {
    const name = $(this).text().toLowerCase();
    if (name.includes(filter)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
};

$(document).ready(function () {
  $("#addCertificates").on("click", AddCertifications);
});

const AddCertifications = async (event) => {
  event.preventDefault();
  const _certificates = document.getElementById("_certificates").value;
  showLoadingIndicator();
  const transaction = await myContract.addCertifications(_certificates);
  await transaction.wait();
  hideLoadingIndicator();
  alert("Certification added successfully");
};

$(document).ready(function () {
  $("#addStatistics").on("click", AddStatistics);
});

const AddStatistics = async (event) => {
  event.preventDefault();
  const _statistics = document.getElementById("_statistics").value;
  showLoadingIndicator();
  const transaction = await myContract.addStatistics(_statistics);
  await transaction.wait();
  hideLoadingIndicator();
  alert("Monthly turnover added successfully");
};
