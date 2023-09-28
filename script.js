//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");


let checkBoxRowNumber = document.querySelectorAll("input[type=checkbox]");
let tableData = document.querySelectorAll("#myTable tr");
let data_1 = tableData[1].cloneNode(true);
let data_2 = tableData[2].cloneNode(true);

function checkboxSelect(checkbox) {
  var rowNumber = checkbox.parentElement.parentElement;
  var _deleteData = rowNumber.querySelector(":nth-child(9)");
  removeDeleteButton(_deleteData);
  var editEle = rowNumber.querySelector(":nth-child(10)");
  removeEditButton(editEle);
  if (checkbox.checked) {
    rowNumber.bgColor = "orange";
    _deleteData.appendChild(deleteBtn(rowNumber));
    editEle.appendChild(editButton(rowNumber));
  } else {
    rowNumber.bgColor = "";
  }
  submitButtonChange();
}

function removeDeleteButton(deleteExtraButton) {
  while (deleteExtraButton.firstChild) {
    deleteExtraButton.firstChild.remove();
  }
}

function removeEditButton(editEle) {
  while (editEle.firstChild) {
    editEle.firstChild.remove();
  }
}

function deleteBtn(rowdata) {
  let deleteDataButton = document.createElement("input");
  deleteDataButton.type = "button";
  deleteDataButton.value = "Delete";
  deleteDataButton.addEventListener("click", () => {
    const studentName = rowdata.querySelector("td:nth-child(2)").textContent;
    rowdata.nextElementSibling.remove();
    rowdata.remove();
    alert(studentName+" record deleted successfully.");

    let checkBoxRowNumber = document.querySelectorAll("input[type=checkbox]");
    let check = false;
    checkBoxRowNumber.forEach((values) => {
      if (values.checked) check = true;
    });
    if (check) {
      document.getElementById("button").style.backgroundColor = "orange";
      document.getElementById("button").disabled = false;
    } else {
      document.getElementById("button").style.backgroundColor = "";
      document.getElementById("button").disabled = true;
    }
  });

  return deleteDataButton;
}

function editButton(rowdata) {
  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";
  editButton.addEventListener("click", () => {
   const studentName = rowdata.querySelector("td:nth-child(2)").textContent;
    prompt("Edit details of "+studentName);
  });
  return editButton;
}

function submitButtonChange() {
  let checkBoxRowNumber = document.querySelectorAll("input[type=checkbox]");
  let check = false;
  checkBoxRowNumber.forEach((values) => {
    if (values.checked) check = true;
  });
  if (check) {
    document.getElementById("button").style.backgroundColor = "orange";
    document.getElementById("button").disabled = false;
  } else {
    document.getElementById("button").style.backgroundColor = "";
    document.getElementById("button").disabled = true;
  }
  let hiddenData = document.querySelectorAll(
    "table td:nth-child(9), table th:nth-child(9),table td:nth-child(10), table th:nth-child(10)"
  );
  hiddenData.forEach((column) => {
    column.classList.remove("cellRenderer");
    if (check) {
      column.classList.add("cellRenderer");
    }
  });
}

function addcheckBoxRowNumber_(checkbox) {
  checkbox.addEventListener("change", () => {
    checkboxSelect(checkbox);
  });
  let dropdown =
    checkbox.nextElementSibling.nextElementSibling.nextElementSibling;
  dropdown.addEventListener("click", () => {
    toggleButton(dropdown);
  });
}

checkBoxRowNumber.forEach((checkbox) => {
  addcheckBoxRowNumber_(checkbox);
});

function toggleButton(dropdown) {
  if (
    dropdown.parentElement.parentElement.nextElementSibling.style.visibility ===
    "visible"
  ) {
    dropdown.parentElement.parentElement.nextElementSibling.style.visibility =
      "collapse";
  } else {
    dropdown.parentElement.parentElement.nextElementSibling.style.visibility =
      "visible";
  }
}

let addButton = document.getElementById("add");
addButton.addEventListener("click", () => {
  addStudentButton();
});

function addStudentButton() {
  let data = document.querySelector("#myTable tbody");
  let record1 = data_1.cloneNode(true);
  let record2 = data_2.cloneNode(true);

  var rows = document.getElementById("myTable").rows;
  var studentIndex;
  if (rows.length > 1) {
    studentIndex =
      parseInt(
        rows[
          rows.length - 2
        ].firstElementChild.nextElementSibling.innerHTML.split(" ")[1]
      ) + 1;
  } else {
    studentIndex = 1;
  }
  let newStudentRow = record1.querySelectorAll("td");
  newStudentRow[1].innerHTML = `Student ${studentIndex}`;
  newStudentRow[2].innerHTML = `Teacher ${studentIndex}`;
  newStudentRow[6].innerHTML = `${Math.floor(Math.random() * 100000 + 1)}`;
  let checkBoxData = record1.querySelector("input[type=checkbox]");
  addcheckBoxRowNumber_(checkBoxData);
  data.appendChild(record1);
  data.appendChild(record2);
  alert('Student ' +studentIndex+' record added successfully.');
}
