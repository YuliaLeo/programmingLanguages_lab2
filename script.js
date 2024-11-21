const passwordList = document.querySelector(".password-list");
const form = document.querySelector(".add-password-form");
const generatePasswordButton = document.querySelector(".generate-password");

const lengthInput = document.getElementById('password-length');
const includeLowercase = document.getElementById('include-lowercase');
const includeUppercase = document.getElementById('include-uppercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');

const STORAGE_KEY = "passwords";

const getPasswords = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const savePasswords = (passwords) => localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));

const renderPasswords = () => {
  const passwords = getPasswords();
  passwordList.innerHTML = passwords
    .map(
      (p, index) => `
        <div class="password-item">
          <strong>${p.url}</strong>
          <p>${p.username}</p>
          <p>${p.password}</p>
          <button onclick="deletePassword(${index})">Delete</button>
        </div>
      `
    )
    .join("");
};

const addPassword = (url, username, password) => {
  const passwords = getPasswords();
  passwords.push({ url, username, password });
  savePasswords(passwords);
  renderPasswords();
};

const deletePassword = (index) => {
  const passwords = getPasswords();
  passwords.splice(index, 1);
  savePasswords(passwords);
  renderPasswords();
};

const generatePassword = () => {
  const length = parseInt(lengthInput.value);
  let charset = "";

  if (includeLowercase.checked) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeUppercase.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeNumbers.checked) charset += "0123456789";
  if (includeSymbols.checked) charset += "@#$%^&*()_+-=[]{}|;:'\",.<>?/";

  if (charset === "") {
    alert("Выберите хотя бы один тип символов для пароля.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById("password").value = password;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = document.getElementById("site-url").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  addPassword(url, username, password);
  form.reset();
});

generatePasswordButton.addEventListener("click", generatePassword);

renderPasswords();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker registered'))
      .catch((error) => console.error('Service Worker registration failed:', error));
  }
  