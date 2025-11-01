import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const loginSection = document.getElementById('login-section');
const adminPanel = document.getElementById('admin-panel');
const loginBtn = document.getElementById('login-btn');
const userInput = document.getElementById('admin-user');
const passInput = document.getElementById('admin-pass');

const propTitle = document.getElementById('prop-title');
const propPrice = document.getElementById('prop-price');
const propCity = document.getElementById('prop-city');
const propDesc = document.getElementById('prop-desc');
const propImages = document.getElementById('prop-images');
const addBtn = document.getElementById('add-prop');
const adminPropertyList = document.getElementById('admin-property-list');

const adminUsername = "admin";
const adminPassword = "1234";

loginBtn.addEventListener('click', async () => {
  if (userInput.value === adminUsername && passInput.value === adminPassword) {
    alert("Hyrje e suksesshme!");
    loginSection.style.display = 'none';
    adminPanel.style.display = 'block';
    await renderProperties();
  } else {
    alert("Username ose password gabim!");
  }
});

addBtn.addEventListener('click', async () => {
  const imagesArray = propImages.value.split(',').map(s => s.trim());
  const newProp = {
    title: propTitle.value,
    price: propPrice.value,
    city: propCity.value,
    description: propDesc.value,
    images: imagesArray
  };

  try {
    await addDoc(collection(window.db, "properties"), newProp);
    alert("Prona u shtua me sukses!");
    clearForm();
    await renderProperties();
  } catch (e) {
    console.error("Gabim gjatë shtimit:", e);
  }
});

async function renderProperties() {
  adminPropertyList.innerHTML = '';
  const querySnapshot = await getDocs(collection(window.db, "properties"));

  querySnapshot.forEach((doc) => {
    const prop = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${prop.title}</strong> - ${prop.price}<br>
      <em>${prop.description}</em><br>
      <em>Qyteti: ${prop.city}</em><br>
      <p>Foto: ${prop.images.join(', ')}</p>
      <hr>
    `;
    adminPropertyList.appendChild(div);
  });
}

function clearForm() {
  propTitle.value = '';
  propPrice.value = '';
  propCity.value = '';
  propDesc.value = '';
  propImages.value = '';
}
