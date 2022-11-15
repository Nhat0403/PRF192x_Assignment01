"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const showAllBtn = document.getElementById("showall-btn");
const calcBMIBtn = document.getElementById("calcBMI-btn");

const d = new Date();
const formatDate =
  ("0" + d.getDate()).slice(-2) +
  "/" +
  ("0" + (d.getMonth() + 1)).slice(-2) +
  "/" +
  d.getFullYear();

// validate dữ liệu hợp lệ
let validate = true;
function validateData(data) {
  if (idInput.value === "") {
    alert("ID must unique");
    validate = false;
  } else if (nameInput.value === "") {
    alert("Pet Name cannot empty");
    validate = false;
  } else if (
    ageInput.vaue === "" ||
    ageInput.value < 1 ||
    ageInput.value > 15
  ) {
    alert("Age must be between 1 and 15!");
    validate = false;
  } else if (
    weightInput.value === "" ||
    weightInput.value < 1 ||
    weightInput.value > 15
  ) {
    alert("Weight must be between 1 and 15!");
    validate = false;
  } else if (
    lengthInput.value === "" ||
    lengthInput.value < 1 ||
    lengthInput.value > 100
  ) {
    alert("Lenght must be between 1 and 100!");
    validate = false;
  } else if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    validate = false;
  } else if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
    validate = false;
  } else uniqueId();
}

function uniqueId() {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === idInput.value) {
      alert("ID must unique");
      validate = false;
    } else validate = true;
  }
}

// hiển thị danh sách thú cưng
const petArr = [];

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const html = `
            <tr id="pet-${petArr[i].id}">
							<th scope="row">${petArr[i].id}</th>
							<td>${petArr[i].name}</td>
							<td>${petArr[i].age}</td>
							<td>${petArr[i].type}</td>
							<td>${petArr[i].weight} kg</td>
							<td>${petArr[i].lengthPet} cm</td>
							<td>${petArr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
							</td>
							<td><i class="${
                petArr[i].vaccinated
                  ? "bi bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
							<td><i class="${
                petArr[i].dewormed
                  ? "bi bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
							<td><i class="${
                petArr[i].sterilized
                  ? "bi bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
              <td id='bmi-${petArr[i].id}'>?</td>
							<td>${petArr[i].date}</td>
							<td><button type="button" class="btn btn-danger" id="${petArr[i].id}"
              onclick="deletePet(this.id)"
              >Delete</button>
							</td>
				    </tr>
  `;
    tableBodyEl.insertAdjacentHTML("afterbegin", html);
  }
}

// xoá các dữ liệu trên form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// xoá 1 thú cưng
function deletePet(e) {
  if (confirm("Are you sure?")) {
    document.getElementById(`pet-${e}`).remove();
    // healthyPet.splice(e, 1);
    spliceIndex(petArr, e);
    spliceIndex(healthyPet, e);
  }
}

// loại thú cưng ra khỏi mảng
function spliceIndex(arr, e) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === e) {
      arr.splice(i, 1);
    }
  }
}

// kiểm tra các thú cưng khoẻ mạnh
let healthy = true;
const healthyPet = [];
function isHealthy(data) {
  if (
    vaccinatedInput.checked &&
    dewormedInput.checked &&
    sterilizedInput.checked
  ) {
    healthy = true;
  } else healthy = false;
}

// tính toán chỉ số bmi
function calcBMIPet(arr) {
  for (let i = 0; i < arr.length; i++) {
    const petBmi = document.getElementById(`bmi-${arr[i].id}`);
    const dogBmi = (arr[i].weight * 703) / arr[i].lengthPet ** 2;
    const catBmi = (arr[i].weight * 886) / arr[i].lengthPet ** 2;
    if (arr[i].type === "Dog") {
      petBmi.textContent = dogBmi.toFixed(2);
    } else if (arr[i].type === "Cat") {
      petBmi.textContent = catBmi.toFixed(2);
    }
  }
}

// thêm thú cưng vào danh sách
submitBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  validateData();
  // lấy dữ liệu từ input form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthPet: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: formatDate,
  };

  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
    isHealthy(data);
    if (healthy) {
      healthyPet.push(data);
    }
    clearInput();
  }
});

// hiển thị các thú cưng khoẻ mạnh
function showhidetoogle() {
  healthyBtn.classList.toggle("hidden");
  showAllBtn.classList.toggle("hidden");
}

healthyBtn.addEventListener("click", function () {
  showhidetoogle();
  renderTableData(healthyPet);
});

showAllBtn.addEventListener("click", function () {
  showhidetoogle();
  renderTableData(petArr);
});

// tính toán chỉ số bmi
calcBMIBtn.addEventListener("click", function () {
  calcBMIPet(healthyPet);
  calcBMIPet(petArr);
});
