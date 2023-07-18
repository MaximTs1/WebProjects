/**
 * פונקיצה להוספת משימה
 * @param content טקסט ברירת מחדל שיופיע במשימה (אופציונלי)
 * @param parentDiv אלמנט שרוצים להוסיף אחריו את המשימה (אופציונלי)
 * @param target לאיזו רשימה להוסיף את המשימה (אופציונלי)
 */

function addTask(
  content = document.querySelector("#inputText").value,
  parentDiv = null,
  target = "open"
) {
  const div = document.createElement("div");
  div.className = "task";

  // if (localStorage.open.length > 5) {
  //   let count = open.length * 10 + 100;
  //   // document.querySelector("body").style.height = "${open.length*10+100}vh";
  //   document.body.style.height = `${localStorage.open.length * 100 + 1080}px`; // Increase body height by 10vh
  // }

  // מוסיף פסקה לתוך המשימה
  const p = document.createElement("p");
  // מאפשר לערוך את הפסקה
  p.contentEditable = true;
  p.innerHTML = content;
  div.appendChild(p);
  save();

  // לצורך ביטול השורה כשלוחצים על אנטר
  p.addEventListener("keydown", (ev) => {
    if (ev.key == "Enter" && !ev.shiftKey) {
      ev.preventDefault();
    }
  });

  // לצורך מעבר עם הסמן בין משימות
  p.addEventListener("keyup", (ev) => {
    // האלמנט של המשימה
    const task = ev.target.parentElement;

    // אם לוחצים על החץ למטה ויש אלמנט מתחת - הוא עובר אליו
    if (ev.key == "ArrowDown" && task.nextSibling) {
      task.nextSibling.querySelector("p").focus();
      // אם לוחצים על החץ למעלה ויש אלמנט מעל - הוא עובר אליו
    } else if (ev.key == "ArrowUp" && task.previousSibling) {
      task.previousSibling.querySelector("p").focus();
      // אם לוחצים על אנטר *ללא* שיפט, אך הוא מוסיף משימה חדשה
    } else if (ev.key == "Enter" && !ev.shiftKey) {
      addTask("", task);
    }
  });

  // כפתור בוצע
  const btnFrame2 = document.createElement("div");
  const btnComplete = document.createElement("button");
  btnComplete.className = "complete";
  btnComplete.innerHTML = "✔️";
  btnComplete.addEventListener("click", () => {
    save();
  });
  btnFrame2.appendChild(btnComplete);
  div.appendChild(btnFrame2);

  // כפתור מחיקה
  const btnFrame = document.createElement("div");
  const btnRemove = document.createElement("button");
  btnRemove.className = "remove";
  btnRemove.innerHTML = "❌";
  btnRemove.addEventListener("click", () => div.remove());
  btnFrame.appendChild(btnRemove);
  div.appendChild(btnFrame);
  btnRemove.addEventListener("click", () => save());

  // אם קיבלנו אלמנט כפרמטר, משמע שאנחנו רוצים להוסיף אחריו משימה
  if (parentDiv) {
    document
      .querySelector(".open .taskList")
      .insertBefore(div, parentDiv.nextSibling);
    // אחרת אנחנו מוסיפים משימה בסוף
  } else {
    document.querySelector(`.${target} .taskList`).appendChild(div);
  }

  // שם את הסמן בתוך התיבה
  p.focus();

  save();
}

if (localStorage.open) {
  const open = JSON.parse(localStorage.open);

  open.forEach((str) => {
    addTask(str);
  });
}

if (localStorage.complete) {
  const complete = JSON.parse(localStorage.complete);

  complete.forEach((str) => {
    addTask(str, null, "complete");
  });
}

function save() {
  const open = [...document.querySelectorAll(".open .task p")]
    .map((el) => el.innerText)
    .filter((x) => x);
  localStorage.open = JSON.stringify(open);
}
