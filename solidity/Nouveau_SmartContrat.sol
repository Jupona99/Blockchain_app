// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyFactory {
    address public ownerOfContract;
    // mapping(address => bool) public authorizedCompanies;

    struct Partners {
        string companyName;
        string visibility;
    }

    struct Company {
        string name;
        string location;
        address owner;
        uint id;
        string uRL;
        // Number of iso certificates
        uint certificatesNumber;
        mapping(uint => string) certificates;
        uint partnersNumber;
        mapping(uint => Partners) partners;
        uint statisticsNumber;
        mapping(uint => uint) statistics;
    }

    uint companyID = 0;
    mapping(uint => Company) companies;

    mapping(string => uint) companyNameToId;

    mapping(string => address) companyNameToAddress;

    mapping(address => string) public addressToCompanyName;

    mapping(address => uint) public userCompanies;

    mapping(address => bool) public userHasCompany;

    mapping(address => mapping(address => bool)) public partnerRequests;

    mapping(address => mapping(address => bool)) public partnerships;

    address[] public addressList;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function sendPartnerRequest(string memory _name) public {
        require(
            companyNameToAddress[_name] != msg.sender,
            "Cannot send a partner request to yourself"
        );
        require(
            !partnerships[msg.sender][companyNameToAddress[_name]],
            "You are already partners"
        );
        require(
            !partnerRequests[msg.sender][companyNameToAddress[_name]],
            "You already have a pending partner request"
        );

        require(
            !partnerRequests[companyNameToAddress[_name]][msg.sender],
            "The receiving partner has already sent a request"
        );

        partnerRequests[msg.sender][companyNameToAddress[_name]] = true;
    }

    function getReceivedRequests() public view returns (string[] memory) {
        address yourAddress = msg.sender;
        string[] memory matchingNames = new string[](addressList.length);
        uint256 count = 0;

        for (uint256 i = 0; i < addressList.length; i++) {
            address companyAddress = addressList[i];
            if (partnerRequests[companyAddress][yourAddress]) {
                matchingNames[count] = addressToCompanyName[companyAddress];
                count++;
            }
        }

        string[] memory result = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = matchingNames[i];
        }

        return result;
    }

    function getPendingRequests() public view returns (string[] memory) {
        address yourAddress = msg.sender;
        string[] memory matchingNames = new string[](addressList.length);
        uint256 count = 0;

        for (uint256 i = 0; i < addressList.length; i++) {
            address companyAddress = addressList[i];
            if (partnerRequests[yourAddress][companyAddress]) {
                matchingNames[count] = addressToCompanyName[companyAddress];
                count++;
            }
        }

        string[] memory result = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = matchingNames[i];
        }

        return result;
    }

    function respondToPartnerRequest(string memory _name, bool _accept) public {
        address sender = companyNameToAddress[_name];
        require(
            partnerRequests[sender][msg.sender],
            "No friend request from this sender"
        );

        if (_accept) {
            // Perform additional logic for accepting a friend request
            // For example, update mappings to reflect the friendship
            partnerships[sender][msg.sender] = true;
            partnerships[msg.sender][sender] = true;
        }

        partnerRequests[sender][msg.sender] = false;
    }

    function getPartners() public view returns (string[] memory) {
        address yourAddress = msg.sender;
        string[] memory partnerNames = new string[](addressList.length);
        uint256 count = 0;

        for (uint256 i = 0; i < addressList.length; i++) {
            address partnerAddress = addressList[i];
            if (partnerships[yourAddress][partnerAddress]) {
                partnerNames[count] = addressToCompanyName[partnerAddress];
                count++;
            }
        }

        string[] memory result = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = partnerNames[i];
        }

        return result;
    }

    function getPartnershipStatus(
        string memory _name
    ) public view returns (bool) {
        return partnerships[msg.sender][companyNameToAddress[_name]];
    }

    // Create a new company
    function createCompany(
        string memory _name,
        string memory _location,
        string memory _uRL
    ) public {
        Company storage newCompany = companies[companyID];
        newCompany.name = _name;
        newCompany.location = _location;
        newCompany.owner = msg.sender;
        newCompany.id = companyID;
        newCompany.uRL = _uRL;

        userCompanies[msg.sender] = companyID; // Stocker l'ID de la compagnie pour cet utilisateur
        companyNameToId[_name] = companyID; // Store the company ID by name
        companyNameToAddress[_name] = msg.sender; // Store the company address by name
        addressToCompanyName[msg.sender] = _name; // Store the company name by address
        addressList.push(msg.sender);
        companyID++;
        userHasCompany[msg.sender] = true;
    }

    function hasCompany() public view returns (bool) {
        return userHasCompany[msg.sender];
    }

    function getCompany()
        public
        view
        returns (
            string memory name,
            string memory location,
            uint certificatesNumber,
            address,
            string memory uRL
        )
    {
        uint _companyID = userCompanies[msg.sender]; // Utiliser l'adresse du message pour trouver l'ID de la compagnie associée

        Company storage company = companies[_companyID];
        return (
            company.name,
            company.location,
            company.certificatesNumber,
            company.owner,
            company.uRL
        );
    }

    function getAllCompanyNames() public view returns (string[] memory) {
        string[] memory tempCompanyNames = new string[](companyID);
        uint count = 0;
        uint callerCompanyId = userCompanies[msg.sender];

        for (uint i = 0; i < companyID; i++) {
            bool isPartner = partnerships[msg.sender][companies[i].owner];
            if (!isPartner && i != callerCompanyId) {
                tempCompanyNames[count] = companies[i].name;
                count++;
            }
        }

        string[] memory companyNames = new string[](count);
        for (uint i = 0; i < count; i++) {
            companyNames[i] = tempCompanyNames[i];
        }

        return companyNames;
    }

    function getSelectedCompany(
        string memory _companyName
    )
        public
        view
        returns (string memory name, string memory location, string memory uRL)
    {
        uint _companyID = companyNameToId[_companyName]; // Utiliser le nom pour trouver l'ID de la compagnie associée

        Company storage company = companies[_companyID];
        return (company.name, company.location, company.uRL);
    }

    function visibilityPartners() public view returns (Partners[] memory) {
        uint companyId = userCompanies[msg.sender];
        Company storage company = companies[companyId];

        Partners[] memory allPartners = new Partners[](company.partnersNumber);
        for (uint i = 0; i < company.partnersNumber; i++) {
            allPartners[i] = company.partners[i];
        }

        return allPartners;
    }

    function addCertifications(string memory _iso) public {
        uint _companyID = userCompanies[msg.sender]; // Utiliser l'adresse du message pour trouver l'ID de la compagnie associée

        Company storage company = companies[_companyID];
        company.certificates[company.certificatesNumber++] = _iso;
    }

    function getCertifications() public view returns (string[] memory) {
        uint _companyID = userCompanies[msg.sender];
        Company storage company = companies[_companyID];
        string[] memory certificates = new string[](company.certificatesNumber);
        for (uint i = 0; i < company.certificatesNumber; i++) {
            certificates[i] = company.certificates[i];
        }
        return certificates;
    }

    function addStatistics(uint _statistics) public {
        uint _companyID = userCompanies[msg.sender];

        Company storage company = companies[_companyID];
        company.statistics[company.statisticsNumber++] = _statistics;
    }

    function getStatistics() public view returns (uint[] memory) {
        uint _companyID = userCompanies[msg.sender];
        Company storage company = companies[_companyID];
        uint[] memory statistics = new uint[](company.statisticsNumber);
        for (uint i = 0; i < company.statisticsNumber; i++) {
            statistics[i] = company.statistics[i];
        }
        return statistics;
    }

    function setPublicPartner(string memory _companyName) public {
        Company storage c = companies[userCompanies[msg.sender]];
        c.partners[c.partnersNumber++] = Partners({
            companyName: _companyName,
            visibility: "public"
        });
    }

    function setTransparentPartner(string memory _companyName) public {
        Company storage c = companies[userCompanies[msg.sender]];
        c.partners[c.partnersNumber++] = Partners({
            companyName: _companyName,
            visibility: "transparent"
        });
    }

    function setPrivatePartner(string memory _companyName) public {
        Company storage c = companies[userCompanies[msg.sender]];
        c.partners[c.partnersNumber++] = Partners({
            companyName: _companyName,
            visibility: "private"
        });
    }

    function getCompanyInfo(
        string memory _companyName
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string[] memory,
            uint[] memory,
            Partners[] memory
        )
    {
        Company storage company = companies[companyNameToId[_companyName]];
        Company storage myCompany = companies[userCompanies[msg.sender]];
        uint partnerIndex;
        bool isPartner = false;

        for (uint i = 0; i <= company.partnersNumber; i++) {
            if (
                compareStrings(company.partners[i].companyName, myCompany.name)
            ) {
                partnerIndex = i;
                isPartner = true;
                break;
            }
        }

        if (isPartner) {
            if (
                compareStrings(
                    company.partners[partnerIndex].visibility,
                    "public"
                )
            ) {
                // Return certificates only
                string[] memory certificates = new string[](
                    company.certificatesNumber
                );
                for (uint i = 0; i < company.certificatesNumber; i++) {
                    certificates[i] = company.certificates[i];
                }
                return (
                    company.name,
                    company.location,
                    company.uRL,
                    certificates,
                    new uint[](0),
                    new Partners[](0)
                );
            } else if (
                compareStrings(
                    company.partners[partnerIndex].visibility,
                    "transparent"
                )
            ) {
                // Return certificates and partners
                string[] memory certificates = new string[](
                    company.certificatesNumber
                );
                for (uint i = 0; i < company.certificatesNumber; i++) {
                    certificates[i] = company.certificates[i];
                }
                Partners[] memory partners = new Partners[](
                    company.partnersNumber
                );
                for (uint i = 0; i < company.partnersNumber; i++) {
                    partners[i] = company.partners[i];
                }
                return (
                    company.name,
                    company.location,
                    company.uRL,
                    certificates,
                    new uint[](0),
                    partners
                );
            } else if (
                compareStrings(
                    company.partners[partnerIndex].visibility,
                    "private"
                )
            ) {
                // Return certificates, partners, and statistics for the company itself
                string[] memory certificates = new string[](
                    company.certificatesNumber
                );
                for (uint i = 0; i < company.certificatesNumber; i++) {
                    certificates[i] = company.certificates[i];
                }
                Partners[] memory partners = new Partners[](
                    company.partnersNumber
                );
                for (uint i = 0; i < company.partnersNumber; i++) {
                    partners[i] = company.partners[i];
                }

                uint[] memory statistics = new uint[](company.statisticsNumber);
                for (uint i = 0; i < company.statisticsNumber; i++) {
                    statistics[i] = company.statistics[i];
                }
                return (
                    company.name,
                    company.location,
                    company.uRL,
                    certificates,
                    statistics,
                    partners
                );
            }
        }

        return (
            company.name,
            company.location,
            company.uRL,
            new string[](0),
            new uint[](0),
            new Partners[](0)
        );
    }

    function compareStrings(
        string memory a,
        string memory b
    ) private pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }
}
