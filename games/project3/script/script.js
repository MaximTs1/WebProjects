function signup() {
  const obj = {
    fullName: document.querySelector("#fullName").value,
    email: document.querySelector("#email").value,
    userName: document.querySelector("#userName").value,
    password: document.querySelector("input[type=password]").value,
  };

  //   loader(true);

  // שליחה לשרת
  fetch("https://api.shipap.co.il/signup", {
    method: "POST",
    credentials: "include", // מאפשר שליחה וקבלה של עוגיות
    headers: {
      "Content-Type": "application/json", // הגדרת סוג התוכן הנשלח לשרת
    },
    body: JSON.stringify(obj), // תוכן הקריאה לשרת
  });
  //   // קבלה מהשרת
  //   // *המרת התוכן לפי הצורך*
  //   .then((res) => res.json())
  //   // התוכן שהתקבל מהשרת (לאחר טיפול של הפונקציה הקודמת)
  //   .then((data) => {
  //     if (data.status == "success") {
  //       setUser(data.user);
  //       snackbar("המשתמש התחבר בהצלחה");
  //       pro
  //     } else {
  //       alert(data.message);
  //       loader(false);
  //     }
  //   });

  setTimeout(function () {
    alert("הרשמה למערכת בוצעה בהצלחה");
    location.reload();
  }, 1500);
}
