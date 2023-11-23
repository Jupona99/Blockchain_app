function openTab(evt, tabName) {
  var i, tabContent, tabLinks;

  // Hide all tab contents
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Remove "active" class from all tab links
  tabLinks = document.getElementsByClassName("tab");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the selected tab content and add "active" class to the tab link
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Add event listeners to tab buttons
document.getElementById("tabs").addEventListener("click", function (event) {
  if (event.target.classList.contains("tab")) {
    openTab(event, event.target.getAttribute("data-tab"));
  }
});

// Function to display the Company tab
function displayCompanyTab() {
  document.getElementById("companyTab").style.display = "block";
  document.getElementById("searchTab").style.display = "none";
  document.getElementById("infoTab").style.display = "none";
}

// Function to display the Search tab
function displaySearchTab() {
  document.getElementById("companyTab").style.display = "none";
  document.getElementById("searchTab").style.display = "block";
  document.getElementById("infoTab").style.display = "none";
}

// Function to display the Information tab
function displayInfoTab() {
  document.getElementById("companyTab").style.display = "none";
  document.getElementById("searchTab").style.display = "none";
  document.getElementById("infoTab").style.display = "block";
}

// Set the default tab to "Company" when the page loads
window.onload = function () {
  displayCompanyTab();
};

const AddCertifications = () => {
  const _publicAddress = document.getElementById("_companyID1").value;
  const _ISO = document.getElementById("_iso").value;
  myContract.addCertifications(_publicAddress, _ISO).catch((err) => {
    alert("Error setting Incorrect address" + err.message);
  });
};

const AddPrivatePartner = () => {
  const _myCompanyID1 = document.getElementById("_myCompanyID1").value;
  const _companyID2 = document.getElementById("_companyID2").value;
  myContract.addPrivatePartner(_myCompanyID1, _companyID2).catch((err) => {
    alert("Error setting Incorrect inputs" + err.message);
  });
};

const AddPublicPartner = () => {
  const _myCompanyID2 = document.getElementById("_myCompanyID2").value;
  const _companyID3 = document.getElementById("_companyID3").value;
  myContract.addPublicPartner(_myCompanyID2, _companyID3).catch((err) => {
    alert("Error setting Incorrect inputs" + err.message);
  });
};

const AddStatistics = () => {
  const _companyID4 = document.getElementById("_companyID4").value;
  const _statistics = document.getElementById("_statistics").value;
  myContract.addStatistics(_companyID4, _statistics).catch((err) => {
    alert("Error setting Incorrect inputs" + err.message);
  });
};

const AddTransparentPartner = () => {
  const _myCompanyID3 = document.getElementById("_myCompanyID3").value;
  const _companyID5 = document.getElementById("_companyID5").value;
  myContract.addTransparentPartner(_myCompanyID3, _companyID5).catch((err) => {
    alert("Error setting Incorrect inputs" + err.message);
  });
};

const GetCertifications = async () => {
  const _companyID6 = document.getElementById("_companyID6").value;
  const result = await myContract.getCertifications(_companyID6);
  console.log(result);
};

const GetPartnerInfo = async () => {
  const _companyID9 = document.getElementById("_companyID8").value;
  const result = await myContract.getPartnerInfo(_companyID9);
  console.log(result);
};

const GetPartners = async () => {
  const _companyID9 = document.getElementById("_companyID9").value;
  const result = await myContract.getPartnerInfo(_companyID9);
  console.log(result);
};

const GetStatistics = async () => {
  const _companyID10 = document.getElementById("_companyID10").value;
  const result = await myContract.getStatistics(_companyID10);
  console.log(result);
};

const GetVisibilityLevel = async () => {
  const _companyID11 = document.getElementById("_companyID11").value;
  const result = await myContract.getVisibilityLevel(_companyID11);
  console.log(result);
};

const SeeRequests = async () => {
  const _myCompanyID4 = document.getElementById("_myCompanyID4").value;
  const result = await myContract.seeRequests(_myCompanyID4);
  console.log(result);
};

const UserCompanies = async () => {
  const _address = document.getElementById("_address").value;
  const result = await myContract.userCompanies(_address);
  console.log(result);
};

// const PopulateDropdown = async () => {
//   const companyNames = await myContract.getAllCompanyNames();
//   const dropdown = $("#companyDropdown");

//   // Generate the HTML for the options
//   const optionsHTML = companyNames
//     .map((name) => `<option value="${name}">${name}</option>`)
//     .join("");

//   // Add a default option
//   const defaultOption =
//     '<option value="" disabled selected>Search for company</option>';
//   const finalOptionsHTML = defaultOption + optionsHTML;

//   // Set the HTML content of the dropdown
//   dropdown.html(finalOptionsHTML);
// };

// // Call the function when the page is loaded
// $(document).ready(function () {
//   PopulateDropdown();
//   // Add event listener to the dropdown
//   $("#companyDropdown").on("change", handleCompanySelection);
// });

// // Function to handle the selection of a company from the dropdown
// const handleCompanySelection = () => {
//   // Get the selected company name
//   const selectedCompanyName = $("#companyDropdown").val();

//   // Redirect to the other page passing the selected company name as a query parameter
//   window.location.href = `./AddPartnerPage.html?companyName=${encodeURIComponent(
//     companyName
//   )}`;
// };
