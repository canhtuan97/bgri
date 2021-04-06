pragma solidity ^0.5.0;
contract BkagriPlantShort {
    struct History {
        string Time;
        string PhunThuoc;
        string BonPhan;
        string HamLuongThuoc;
        string HamLuongPhann;
    }
    struct Product {
        string TimeStart;
        string TimeEstimateEnd;
        string TimeHarvest;
        string Location ;
       
    }
    
    Product product;
    History history;
    // id = > Product
    mapping(uint256 => Product) public products;
    // id => product => time => hisroty (time(unix time))
    mapping(uint256 => History) public historys;
    
    function setProduct(uint256 id, string memory TimeStart,string memory TimeEstimateEnd, string memory TimeHarvest,string memory Location ) public {
      product = Product(TimeStart,TimeEstimateEnd,TimeHarvest,Location);
      products[id] = product;
    }
    
    function getProductTimeStart(uint256 id) public view 
    returns (string memory,string memory, string memory, string memory) 
    {
    //   string memory _time = history[id][TimeStart].Time;
      string memory _timeStart = products[id].TimeStart;
      string memory _timeEstimateEnd = products[id].TimeEstimateEnd;
      string memory _timeHarcerst = products[id].TimeHarvest;
      string memory _location = products[id].Location;
     
      return (_timeStart, _timeEstimateEnd, _timeHarcerst, _location);
   }
   
   
    // history
    function setHistory(uint256 id,string memory Time, string memory PhunThuoc,string memory BonPhan, string memory HamLuongThuoc,string memory HamLuongPhann ) public {
        history = History(Time,PhunThuoc,BonPhan,HamLuongThuoc,HamLuongPhann);
        historys[id] = history;
    }   
    
    function getHistory(uint256 id) public view 
    returns (string memory,string memory, string memory, string memory,string memory) 
    {
    //   string memory _time = history[id][TimeStart].Time;
      string memory _time = historys[id].Time;
      string memory _phunThuoc = historys[id].PhunThuoc;
      string memory _bonPhan = historys[id].BonPhan;
      string memory _hamLuongThuoc = historys[id].HamLuongThuoc;
      string memory _hamLuongPhann = historys[id].HamLuongPhann;
     
      return (_time, _phunThuoc, _bonPhan, _hamLuongThuoc,_hamLuongPhann);
   }
   
   
}