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
							<td><button type="button" class="btn btn-danger" id="delete-${
                petArr[i].id
              }">Delete</button>
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

// xoá một thú cưng
function deletePet() {
  for (let i = 0; i < petArr.length; i++) {
    const deletePetid = document.getElementById(`delete-${petArr[i].id}`);
    const petArrid = document.getElementById(`pet-${petArr[i].id}`);
    deletePetid.addEventListener("click", function () {
      if (confirm("Are you sure?")) {
        petArrid.remove();
        // index gọi vị trí của obj cần xoá trong petArr
        const index = petArr.indexOf(i);
        const indexid = petArr[i].id;
        for (let j = 0; j < healthyPet.length; j++) {
          if (healthyPet[j].id === indexid) {
            const indexhealthy = healthyPet.indexOf[j];
            healthyPet.splice(indexhealthy, 1);
          }
        }
        // xoá đúng 1 obj nằm ở vị trí đó trong petArr
        petArr.splice(index, 1);
      }
    });
  }
}

// tính toán chỉ số bmi
function calcBMIPet() {
  for (let i = 0; i < petArr.length; i++) {
    const petBmi = document.getElementById(`bmi-${petArr[i].id}`);
    const dogBmi = (petArr[i].weight * 703) / petArr[i].lengthPet ** 2;
    const catBmi = (petArr[i].weight * 886) / petArr[i].lengthPet ** 2;
    if (petArr[i].type === "Dog") {
      petBmi.textContent = dogBmi.toFixed(2);
    } else if (petArr[i].type === "Cat") {
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
    // clearInput();
    renderTableData(petArr);
    deletePet();
  }
});

function showhidetoogle() {
  healthyBtn.classList.toggle("hidden");
  showAllBtn.classList.toggle("hidden");
}

const healthyPet = [];
function isHealthy() {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      healthyPet.push(petArr[i]);
      // để arr ko tự lặp chính nó
      healthyPet.splice(i);
    }
  }
}

// hiển thị các thú cưng khoẻ mạnh
healthyBtn.addEventListener("click", function () {
  isHealthy();
  showhidetoogle();
  renderTableData(healthyPet);
  deletePet(healthyPet);
});

showAllBtn.addEventListener("click", function () {
  showhidetoogle();
  renderTableData(petArr);
  deletePet();
});

// tính toán chỉ số bmi
calcBMIBtn.addEventListener("click", calcBMIPet);
