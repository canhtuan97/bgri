pragma solidity ^0.4.25;
contract Migrations {
struct History { 
string  tenthuoc;
string  tenphan;
string  luongthuoc;
string  luongphan;
}
struct Product { 
string  name;
string  time_start;
string  time_estimate;
string  time_thuhoach;
string  dia_diem;
string  so_tuoi_cay;
}
Product product;
History history;
uint256 count = 0;
mapping(uint256 => Product) public products; 
mapping(uint256 => History) public historys;
  function getCount() public view returns(uint256){ 
return count;
}
function setProduct(uint256 id ,string memory name,string memory time_start,string memory time_estimate,string memory time_thuhoach,string memory dia_diem,string memory so_tuoi_cay)public {
 product = Product(name,time_start,time_estimate,time_thuhoach,dia_diem,so_tuoi_cay);
products[id] = product;
}
function setHistory(uint256 id ,string memory tenthuoc,string memory tenphan,string memory luongthuoc,string memory luongphan)public {
count++;

 history = History(tenthuoc,tenphan,luongthuoc,luongphan);
historys[id] = history;
}
function getProduct(uint256 id) public view 
returns ( string memory , string memory , string memory , string memory , string memory , string memory )
{string memory _name = products[id].name;
string memory _time_start = products[id].time_start;
string memory _time_estimate = products[id].time_estimate;
string memory _time_thuhoach = products[id].time_thuhoach;
string memory _dia_diem = products[id].dia_diem;
string memory _so_tuoi_cay = products[id].so_tuoi_cay;
return (_name,_time_start,_time_estimate,_time_thuhoach,_dia_diem,_so_tuoi_cay);

}
function getHistory(uint256 id) public view 
returns ( string memory , string memory , string memory , string memory )
{string memory _tenthuoc = historys[id].tenthuoc;
string memory _tenphan = historys[id].tenphan;
string memory _luongthuoc = historys[id].luongthuoc;
string memory _luongphan = historys[id].luongphan;
return (_tenthuoc,_tenphan,_luongthuoc,_luongphan);

}
}