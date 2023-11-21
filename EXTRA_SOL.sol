// function updateCertificationStatus(bool _isCertified) external {
//     Allcompanies[msg.sender].isCertifiedISO = _isCertified;
//     emit CertificationUpdated(msg.sender, _isCertified);
// }

// function updateStatistics(uint256 _companyStatistics) external {
//     Allcompanies[msg.sender].statistics = _companyStatistics;
//     emit StatisticsUpdated(msg.sender, _companyStatistics);
// }

// function updateSponsorship(bool _hasSponsorship) external {
//     Allcompanies[msg.sender].sponsorship = _hasSponsorship;
//     emit PartnershipOrSponsorshipUpdated(msg.sender, _hasSponsorship);
// }

// function setVisibilityLevel(address _partner, VisibilityLevel _level) external {
//     Allcompanies[msg.sender].visibilityLevels[_partner] = _level;
//     emit VisibilityLevelUpdated(msg.sender, _partner, _level);
// }

// function removePartner(address _partner) external {
//     Allcompanies[msg.sender].partners[_partner] = false;
//     emit VisibilityLevelUpdated(msg.sender, _partner, VisibilityLevel.Private);
// }

// function addPartner(
//     address _partner,
//     VisibilityLevel _visibilityLevel
// ) external {
//     companies[msg.sender].visibilityLevels[_partner] = _visibilityLevel;
// }

// function getCompanyInfo(
//     string memory _companyName
// )
//     public
//     view
//     returns (
//         string memory,
//         string memory,
//         string[] memory,
//         uint[] memory,
//         Partners[] memory
//     )
// {
//     Company storage company = companies[companyNameToId[_companyName]];
//     Company storage myCompany = companies[userCompanies[msg.sender]];
//     bool isPartner = false;
//     uint partnerIndex;

//     for (uint i = 0; i < company.partnersNumber; i++) {
//         if (
//             compareStrings(company.partners[i].companyName, myCompany.name)
//         ) {
//             isPartner = true;
//             partnerIndex = i;
//             break;
//         }
//     }

//     if (isPartner) {
//         if (
//             compareStrings(
//                 company.partners[partnerIndex].visibility,
//                 "public"
//             )
//         ) {
//             // Return certificates only
//             string[] memory certificates = new string[](
//                 company.certificatesNumber
//             );
//             for (uint i = 0; i < company.certificatesNumber; i++) {
//                 certificates[i] = company.certificates[i];
//             }
//             return (
//                 company.name,
//                 company.location,
//                 certificates,
//                 new uint[](0),
//                 new Partners[](0)
//             );
//         } else if (
//             compareStrings(
//                 company.partners[partnerIndex].visibility,
//                 "transparent"
//             )
//         ) {
//             // Return certificates and partners
//             string[] memory certificates = new string[](
//                 company.certificatesNumber
//             );
//             for (uint i = 0; i < company.certificatesNumber; i++) {
//                 certificates[i] = company.certificates[i];
//             }
//             Partners[] memory partners = new Partners[](
//                 company.partnersNumber
//             );
//             for (uint i = 0; i < company.partnersNumber; i++) {
//                 partners[i] = company.partners[i];
//             }
//             return (
//                 company.name,
//                 company.location,
//                 certificates,
//                 new uint[](0),
//                 partners
//             );
//         } else if (
//             compareStrings(
//                 company.partners[partnerIndex].visibility,
//                 "private"
//             )
//         ) {
//             // Return certificates, partners, and statistics
//             string[] memory certificates = new string[](
//                 company.certificatesNumber
//             );
//             for (uint i = 0; i < company.certificatesNumber; i++) {
//                 certificates[i] = company.certificates[i];
//             }
//             Partners[] memory partners = new Partners[](
//                 company.partnersNumber
//             );
//             for (uint i = 0; i < company.partnersNumber; i++) {
//                 partners[i] = company.partners[i];
//             }
//             uint[] memory statistics = new uint[](company.statisticsNumber);
//             for (uint i = 0; i < company.statisticsNumber; i++) {
//                 statistics[i] = company.statistics[i];
//             }
//             return (
//                 company.name,
//                 company.location,
//                 certificates,
//                 statistics,
//                 partners
//             );
//         } else {
//             revert("Invalid visibility level");
//         }
//     } else {
//         return (
//             company.name,
//             company.location,
//             new string[](0),
//             new uint[](0),
//             new Partners[](0)
//         );
//     }
// }


// function getAllCompanyNames() public view returns (string[] memory) {
//         string[] memory tempCompanyNames = new string[](companyID);
//         uint count = 0;
//         uint callerCompanyId = userCompanies[msg.sender];

//         for (uint i = 0; i < companyID; i++) {
//             bool isPartner = false;
//             for (
//                 uint j = 0;
//                 j < companies[callerCompanyId].partnersNumber;
//                 j++
//             ) {
//                 if (
//                     keccak256(abi.encodePacked(companies[i].name)) ==
//                     keccak256(
//                         abi.encodePacked(
//                             companies[callerCompanyId].partners[j].companyName
//                         )
//                     )
//                 ) {
//                     isPartner = true;
//                     break;
//                 }
//             }
//             if (!isPartner && i != callerCompanyId) {
//                 tempCompanyNames[count] = companies[i].name;
//                 count++;
//             }
//         }

//         string[] memory companyNames = new string[](count);
//         for (uint i = 0; i < count; i++) {
//             companyNames[i] = tempCompanyNames[i];
//         }

//         return companyNames;
//     }

//     function seeRequests() public view returns (string[] memory) {
    //         string[] memory companyRequests;
    //         uint count = 0;
    //         string memory companyName = companies[userCompanies[msg.sender]].name;

    //         for (uint i = 0; i < companyID; i++) {
    //             if (userCompanies[msg.sender] != i) {
    //                 Company storage company = companies[i];
    //                 for (uint j = 0; j < company.partnersNumber; j++) {
    //                     Partners storage partner = company.partners[j];
    //                     if (
    //                         keccak256(abi.encodePacked(companyName)) ==
    //                         keccak256(abi.encodePacked(partner.companyName))
    //                     ) {
    //                         // Ajouter la demande de partenariat à la liste
    //                         if (count == 0) {
    //                             // Si c'est la première demande, initialiser le tableau avec une taille de 1
    //                             companyRequests = new string[](1);
    //                         } else {
    //                             // Sinon, étendre la taille du tableau de demandes
    //                             string[] memory temp = new string[](count + 1);
    //                             for (uint k = 0; k < count; k++) {
    //                                 temp[k] = companyRequests[k];
    //                             }
    //                             companyRequests = temp;
    //                         }

    //                         // Ajouter la demande à la fin du tableau
    //                         companyRequests[count] = string(
    //                             abi.encodePacked(
    //                                 company.name,
    //                                 " - ",
    //                                 partner.visibility
    //                             )
    //                         );
    //                         count++;
    //                     }
    //                 }
    //             }
    //         }

    //         return companyRequests;
    //     }


    // modifier onlyOwner() {
    //     require(
    //         msg.sender == ownerOfContract,
    //         "Only the contract owner can call this function"
    //     );
    //     _;
    // }

    // modifier onlyAuthorizedCompany() {
    //     require(
    //         authorizedCompanies[msg.sender] == true,
    //         "Only authorized companies can call this function"
    //     );
    //     _;
    // }

    // function addAuthorizedCompany(address company) external {
    //     authorizedCompanies[company] = true;
    // }

    // function removeAuthorizedCompany(address company) external {
    //     authorizedCompanies[company] = false;
    // }