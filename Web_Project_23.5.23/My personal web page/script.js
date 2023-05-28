function EX_1() {
  var number = GetNumberEx_1.value;

  if (number < 100) {
    alert("Small");
  } else if (number > 1000) {
    alert("Large");
  } else {
    alert("Medium");
  }
}

function EX_2() {
  var name = GetNumberEx_2.value;
  alert("Hello " + name + ", welcome back to the system.");
}

function EX_3() {
  var password = GetNumberEx_3.value;

  if (password == "hackeru123456") {
    alert("Identification was successful!");
  } else {
    alert("The password is incorrect, identification is required");
  }
}

function EX_4() {
  var age = GetNumberEx_4.value;

  if (age < 16) {
    alert("You are not allowed to enter");
  } else if (age > 18) {
    alert("You are welcome to join");
  } else {
    alert("You may enter with parental permission");
  }
}

function EX_5() {
  var a = parseInt(GetNumberEx_5_1.value);
  var b = parseInt(GetNumberEx_5_2.value);
  var c = parseInt(GetNumberEx_5_3.value);

  if (GetNumberEx_5_sign.value == "+") {
    var number = Number(a) + Number(b) + Number(c);
    alert(number);
  } else if (GetNumberEx_5_sign.value == "-") {
    var number = -Number(a) - Number(b) - Number(c);
    alert(number);
  } else {
    alert("Wrong input! Try again!");
  }
}
