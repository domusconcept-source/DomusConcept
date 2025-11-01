// admin.js
export function startAdminPanel(db, { collection, addDoc, getDocs, deleteDoc, doc }) {
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

  // 🔐 Login
  loginBtn.addEventListener('click', () => {
    if (userInput.value === adminUsername && passInput.value === adminPassword) {
      alert("✅ Hyrje e suksesshme!");
      loginSection.style.display = 'none';
      adminPanel.style.display = 'block';
      loadProperties();
    } else {
      alert("❌ Username ose password gabim!");
    }
  });

  // ➕ Shto Tokë në Firestore
  addBtn.addEventListener('click', async () => {
    if (!propTitle.value || !propPrice.value || !propCity.value) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    const imagesArray = propImages.value.split(',').map(s => s.trim());
    const newProperty = {
      title: propTitle.value,
      price: propPrice.value,
      city: propCity.value,
      description: propDesc.value,
      images: imagesArray
    };

    try {
      await addDoc(collection(db, "properties"), newProperty);
      alert("✅ Tokë e shtuar me sukses!");
      clearForm();
      loadProperties();
    } catch (error) {
      console.error("Gabim gjatë ruajtjes:", error);
    }
  });

  // 📥 Ngarko pronat nga Firestore
  async function loadProperties() {
    adminPropertyList.innerHTML = "<p>Ngarkim...</p>";
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      adminPropertyList.innerHTML = "";
      querySnapshot.forEach((docSnap) => {
        const prop = docSnap.data();
        const div = document.createElement('div');
        div.classList.add('property-item');
        div.innerHTML = `
          <strong>${prop.title}</strong> - ${prop.price}€<br>
          <em>${prop.description}</em><br>
          <span>Qyteti: ${prop.city}</span><br>
          <p>Foto: ${prop.images.join(', ')}</p>
          <button class="delete-btn" data-id="${docSnap.id}">Fshi</button>
          <hr>
        `;
        adminPropertyList.appendChild(div);
      });

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async e => {
          const id = e.target.getAttribute('data-id');
          await deleteDoc(doc(db, "properties", id));
          loadProperties();
        });
      });

    } catch (error) {
      adminPropertyList.innerHTML = "<p>❌ Gabim gjatë leximit të të dhënave.</p>";
      console.error(error);
    }
  }

  // ♻️ Pastrimi i formës
  function clearForm() {
    propTitle.value = '';
    propPrice.value = '';
    propCity.value = '';
    propDesc.value = '';
    propImages.value = '';
  }
}

