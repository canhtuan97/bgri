pragma solidity ^0.5.0;

contract BkagriPlantShort {
    
    string public ID ;
    string TimeStart;
    string TimeEstimateEnd;
    string TimeHarvest;
    string Location ;
    string Longitude;
    string Latitude;
    string Unit;
    string Certificate;
    
    function setID(string memory input)  public  {
        ID=input;
    }
    
    function getID() public view returns(string memory) {
        return ID;
    }
    
    function setTimeStart(string memory input)  public  {
        TimeStart=input;
    }
     function getTimeStart() public view returns(string memory) {
        return ID;
    }
    
    function setTimeEstimateEnd(string memory input)  public  {
        TimeStart=input;
    }
    
      function getTimeEstimateEnd() public view returns(string memory) {
        return TimeEstimateEnd;
    }
    
    function setTimeHarvest(string memory input)  public  {
        TimeHarvest=input;
    }
    
    function getTimeHarvest() public view returns(string memory) {
        return TimeHarvest;
    }
    function setLocation(string memory input)  public  {
        Location=input;
    }
    
    function getLocation() public view returns(string memory) {
        return Location;
    }
    function setLongitude(string memory input)  public  {
        Longitude=input;
    }
    
    function getLongitude() public view returns(string memory) {
        return Longitude;
    }
    function setLatitude(string memory input)  public  {
        Latitude=input;
    }
    
    function getLatitude() public view returns(string memory) {
        return Latitude;
    }
    function setUnit(string memory input)  public  {
        Unit=input;
    }
    
    function getUnit() public view returns(string memory) {
        return Unit;
    }
    function setCertificate(string memory input)  public  {
        Certificate=input;
    }
    
    function getCertificate() public view returns(string memory) {
        return Certificate;
    }
    
    
    struct History {
        string Time;
        string PhunThuoc;
        string BonPhan;
        string HamLuongThuoc;
        string HamLuongPhann;
    }
    
    
    function setHistory(string memory time,string memory tenThuocPhun, string memory tenPhanBon,string memory hamLuongThuoc, string memory hamLuongPhan) public {
      History(time,tenThuocPhun,tenPhanBon,hamLuongThuoc,hamLuongPhan);
    }
    
    function getHistory() public view returns ( string memory ){
        return History.Time;
    }
    
    

}
