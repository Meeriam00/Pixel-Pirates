const btn = document.getElementById("addBtn");
const input = document.querySelector("input");
const list = document.getElementById("list");
const form = document.querySelector("form");

const additem = (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("Please fill input");
  } else {
    const li = document.createElement("li");
    li.textContent = input.value; 
    const button = document.createElement("button");
    button.innerHTML = '<i class="fa-solid fa-x"></i>';
    button.onclick = () => li.remove();
    li.appendChild(button);
    list.appendChild(li);
  }
  input.value = "";
};

form.onsubmit = additem;