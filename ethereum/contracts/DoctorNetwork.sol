//SPDX-License-Identifier:UNLICIENSED
pragma solidity 0.8.9;
// pragma experimental ABIEncoderV2;

//Factory Contract
contract NetworkFactory {
  address[] public deployedNetworks;
  event NewNetworkAdded(address indexed _from,string _network);
   
   

  function createNewNetwork(string memory networkName) public {
    Network docNetwork = new Network(networkName,msg.sender);
    deployedNetworks.push(address(docNetwork));
    emit NewNetworkAdded(msg.sender,networkName);
  }

  function getDeployedNetworks() public view returns(address[] memory){
          return deployedNetworks;
    }
   
}

//Network Contract
contract Network {
   
     //Patient report struct
     struct PatientReport{
         string description;
         string fileUrl;
         address requestedDoctor;
         uint approvalCount;
         mapping(address => bool) approvals;
         bool verified;
         
     }

    
     address public network_head;

     //default network limit 
     uint256 public networkLimit = 5;

     string public networkSpecialisation;
     mapping(address=>bool) public network_doctors;

     uint public numPatientReportCount;
     uint public doctorsCount = 0;
     mapping(uint => PatientReport) public patientReports;

     modifier authorisedDoctor(){
         require(network_doctors[msg.sender] == true,"Only doctors in network can do this action.");
         _;
     }

     constructor(string memory specialisation,address creator){
       networkSpecialisation = specialisation;
       network_head = creator;
       network_doctors[creator] = true;
       doctorsCount++;
     }

     

     //Fn for doctors to register to the network
     function registerToNetwork() public  returns(bool success){
       require(doctorsCount < networkLimit,"The network has reached its full limit.");
       require(network_doctors[msg.sender]!= true,"Already registered to network.");
       network_doctors[msg.sender] = true;
       doctorsCount++;
       return true;
     }

     //Fn for the manager to set the network limit 
     function setNetworkLimit(uint256 _limit) public returns(bool success){
       require(network_head == msg.sender,"Only Manager can set network limit.");
       networkLimit = _limit;
       return true;
     }
     
     //Fn to transfer manager position of the network
     function changeManager(address _new_head) public returns(bool success){
       require(network_head == msg.sender,"Only current manager can change manager");
       network_head = _new_head;
       return true;
     }

     //Fn to verify the report posted by the doctor
     function verifyReport(uint index) public authorisedDoctor{
      
       PatientReport storage pr = patientReports[index];

       require(pr.requestedDoctor!= msg.sender,"Can't verify your own report.");

       pr.approvals[msg.sender] = true;
       pr.approvalCount++;

     } 
     
     //Fn for doctors to create new patient report in the network
     function createPatientReport(string memory description,string memory fileLink) public authorisedDoctor {
         PatientReport storage p = patientReports[numPatientReportCount++];
         p.description = description;
         p.fileUrl = fileLink;
         p.verified = false;
         p.approvalCount = 0;
         p.requestedDoctor = msg.sender;

     }

    //Fn for the creator of the report to finalise the report
     function finalizeReport(uint index) public {
       PatientReport storage pr = patientReports[index];

       require(pr.requestedDoctor == msg.sender,"Only the creator of report can finalise it.");
       require(!pr.verified);
       require(pr.approvalCount > (doctorsCount/2));

       pr.verified = true;
     }

     //Fn to get network details
     function getNetworkSummary() public view returns(string memory,uint,uint,address,uint) {
       return (networkSpecialisation,numPatientReportCount,doctorsCount,network_head,networkLimit);

     }

     //Fn to get report count
     function getReportCount() public view returns(uint){
       return numPatientReportCount;
     }




}