document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    const cart = []; // Pour stocker les produits ajoutés au panier
  
    const cartContainer = document.querySelector('#cart-container');
    const cartTotalPrice = document.querySelector('#cart-total-price');
    const clearCartButton = document.querySelector('#clear-cart');
    const checkoutButton = document.querySelector('#checkout-button');
  
    addToCartButtons.forEach(image => {
      image.addEventListener('click', () => {
        const productName = image.getAttribute('data-product');
        const productPrice = parseFloat(image.getAttribute('data-price'));
  
        // Ajoutez le produit au panier
        cart.push({ name: productName, price: productPrice });
  
        // Mettez à jour l'affichage du panier
        updateCartDisplay();
      });
    });
  
    function updateCartDisplay() {
      cartContainer.innerHTML = ''; // Effacez le contenu précédent
      let totalPrice = 0;
  
      cart.forEach((product, index) => {
        const item = document.createElement('div');
        item.innerHTML = `
          ${product.name} - ${product.price}€
          <button class="remove-item" data-index="${index}">Supprimer</button>
        `;
        cartContainer.appendChild(item);
        totalPrice += product.price;
      });
  
      cartTotalPrice.textContent = totalPrice.toFixed(2) + '€';
  
      // Mettez à jour les écouteurs de bouton supprimer
      const removeItemButtons = document.querySelectorAll('.remove-item');
      removeItemButtons.forEach(button => {
        button.addEventListener('click', () => {
          const indexToRemove = parseInt(button.getAttribute('data-index'));
          cart.splice(indexToRemove, 1);
          updateCartDisplay();
        });
      });
    }
  
    clearCartButton.addEventListener('click', () => {
      cart.length = 0; // Vide le panier
      updateCartDisplay();
    });
  });
  

  // Fonction pour afficher la modale de connexion
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Fonction pour gérer la soumission du formulaire de connexion
function login(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Vous devrez envoyer ces données au backend (PHP) pour validation
  // Exemple fictif pour la démonstration :
  fetch('votre_script_de_connexion.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Connexion réussie, vous pouvez rediriger l'utilisateur ou effectuer d'autres actions ici
          alert('Connexion réussie !');
          closeModal();
      } else {
          // Afficher un message d'erreur si la connexion a échoué
          alert('Identifiants incorrects. Veuillez réessayer.');
      }
  })
  .catch(error => {
      console.error('Erreur lors de la connexion :', error);
  });
}

// Fonction pour ouvrir la modale d'inscription
function openRegistrationModal() {
  const registrationModal = document.getElementById('registration-modal');
  registrationModal.style.display = 'block';
}

// Fonction pour fermer la modale d'inscription
function closeRegistrationModal() {
  const registrationModal = document.getElementById('registration-modal');
  registrationModal.style.display = 'none';
}
