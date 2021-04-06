pragma solidity ^0.4.25;
contract Migrations {
    struct InfoProduct {
        string time;
        string name;
        string time_estimate;
        string time_thuhoach;
        string dia_diem;
        string san_luong;
        string dien_tich;
    }
    struct History { 
        string  time;
        string  action;
        uint256  key;
        string description;
    }
    struct Dat { 
        string  time;
        string  loai_dat;
        string  ph;
        string  vi_tri;
        string description;
    }
     struct Nuoc { 
        string  time;
        string  nguon_nuoc;
        string  ph;
        string  vi_tri;
        string description;
    }
     struct Giong { 
        string  time;
        string  ten_giong;
        string  nguon_goc;
        string description;
    }
    struct QrCode {
        string time;
        string action_name;
        string description;
    }
    uint256 count = 0;
    uint256 status = 1;
    bool end_smartcontract = false;
    
    bool verify_smartcontract = false;
    Dat dat;
    History history;
    Nuoc nuoc;
    Giong giong;
    QrCode qrCode;
    uint256[] keyQrcode;
    
    mapping(uint256 => Dat) public dats; 
    mapping(uint256 => History) public historys;
    mapping(uint256 => Nuoc) public nuocs;
    mapping(uint256 => Giong) public giongs;
    mapping(uint256 => QrCode) public qrCodes; 
    
    address owner;
    address addressLienChiNhom;
    constructor(address _addressLienChiNhom) public {
        owner = msg.sender;
        addressLienChiNhom = _addressLienChiNhom;
    }
    
    function getCount() public view returns(uint256){ 
        return count;
    }
    function setDat(string memory time,string memory loai_dat,string memory ph,string memory vi_tri,string memory description)public returns (bool) {
        if (end_smartcontract == false && verify_smartcontract == false && msg.sender == owner){
            dat = Dat(time,loai_dat,ph,vi_tri,description);
            dats[1] = dat;
            return true;
        }
        return false;
    }
    function setNuoc(string memory time,string memory nguon_nuoc,string memory ph,string memory vi_tri,string memory description)public returns(bool) {
        if (end_smartcontract == false && verify_smartcontract == false && msg.sender == owner){
            nuoc = Nuoc(time,nguon_nuoc,ph,vi_tri,description);
            nuocs[1] = nuoc;
            return true;
        }
        return false;
    }
     function setGiong(string memory time,string memory ten_giong,string memory nguon_goc,string memory description)public returns(bool) {
        if (end_smartcontract == false && verify_smartcontract == false && msg.sender == owner){
            giong = Giong(time,ten_giong,nguon_goc,description);
            giongs[1] = giong;
            return true;
        }
        return false;
    }
    function setHistory(string memory time,uint256 _keyQrcode,string memory description)public returns(bool) {
        if (end_smartcontract == false && verify_smartcontract == true && msg.sender == owner){
            string memory _action_name = qrCodes[_keyQrcode].action_name;
            history = History(time,_action_name,_keyQrcode,description);
            historys[count] = history;
            count++;
            return true;
        }
        return false;
    }
    uint256 sum_qrcode = 0;
    function setQrCode(string memory time,string memory action_name,string memory description,uint256 _keyQrcode)public returns (bool) {
        if (end_smartcontract == false  && msg.sender == owner){
            sum_qrcode++;
            qrCode = QrCode(time,action_name,description);
            qrCodes[_keyQrcode] = qrCode;
            keyQrcode.push(_keyQrcode);
            return true;
        }
        return false;
    }
    function setEndSmartContract()public returns(bool) {
        if (end_smartcontract == false && msg.sender == addressLienChiNhom){
           end_smartcontract == true;
           return end_smartcontract;
        }
        return end_smartcontract;
    }
    function getEndSmartContract() public view returns(bool){ 
        return end_smartcontract;
    }
    function getSumQrcode() public view returns(uint256){ 
        return sum_qrcode;
    }
    function getKeyQrCode() public view returns(uint256 [] ){
        return keyQrcode;
    }
    function setVerifySmartcontract()public returns(bool) {
        if(msg.sender == addressLienChiNhom && verify_smartcontract == false){
            verify_smartcontract == true;
            return verify_smartcontract;
        }
        return false;
    }
    
    function getQrCode(uint256 _keyQrcode) public view  returns ( string memory  , string memory , string memory ){
        string memory _time = qrCodes[_keyQrcode].time;
        string memory _action_name = qrCodes[_keyQrcode].action_name;
        string memory _description = qrCodes[_keyQrcode].description;
      
        return (_time,_action_name,_description);

    }
    function getDat() public view  returns ( string memory  , string memory , string memory, string memory, string memory ){
        string memory _time = dats[1].time;
        string memory _loai_dat = dats[1].loai_dat;
        string memory _ph = dats[1].ph;
        string memory _vi_tri = dats[1].vi_tri;
        string memory _description = dats[1].description;
        return (_time,_loai_dat,_ph,_vi_tri,_description);

    }
    function getNuoc() public view  returns ( string memory  , string memory , string memory, string memory, string memory ){
        string memory _time = nuocs[1].time;
        string memory _nguon_nuoc = nuocs[1].nguon_nuoc;
        string memory _ph = nuocs[1].ph;
        string memory _vi_tri = nuocs[1].vi_tri;
        string memory _description = nuocs[1].description;
        return (_time,_nguon_nuoc,_ph,_vi_tri,_description);

    }
    function getGiong() public view  returns ( string memory , string memory, string memory, string memory ){
        string memory _time = giongs[1].time;
        string memory _ten_giong = giongs[1].ten_giong;
        string memory _nguon_goc = giongs[1].nguon_goc;
        string memory _description = giongs[1].description;
        return (_time,_ten_giong,_nguon_goc,_description);

    }
    function getHistory(uint256 id) public view  returns ( string memory , string memory, uint256, string memory ){
        string memory _time = historys[id].time;
        string memory _action = historys[id].action;
        uint256 _key = historys[id].key;
        string memory _description = historys[id].description;
        return (_time,_action,_key,_description);

    }
    
    


}