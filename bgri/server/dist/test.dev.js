"use strict";

var title = "pragma solidity ^0.5.0;";
var class_start = "contract Bkagri {";
var class_end = "}";
var struct_history_start = "struct History {";
var struct_history_end = "}";
var value = ["name", "time"];
var const_value = "struct Product { string TimeStart; string TimeEstimateEnd; string TimeHarvest; string Location ; }";
var start_function = "function setProduct(";

function Test() {
  var value_string_memory = [];

  for (var i = 0; i <= value.length; i++) {
    value_string_memory.push("string memory " + value[i]);
  } //console.log(value_string_memory[1])


  var start_function = "function setProduct(";
  var between_function = ") public {";
  var ennd_function = "}";
  var create_function = start_function;

  for (var _i = 0; _i <= value_string_memory.length; _i++) {
    create_function = create_function + value_string_memory[_i] + ",";

    if (_i == value_string_memory.length) {
      create_function = create_function + between_function;
    }
  }
}

Test();