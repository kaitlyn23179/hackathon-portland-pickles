// Grab elements
const factEl = document.getElementById('fact');
const btn = document.getElementById('newFact');
const errEl = document.getElementById('error');

// Load one fact when page opens
loadFact();

// Load a new fact when button is clicked
btn.addEventListener('click', loadFact);

function loadFact() {
  // reset error
  errEl.style.display = 'none';
  errEl.textContent = '';

  factEl.textContent = 'Loading...';

  // Simple fetch to Cat Facts API
  fetch('https://catfact.ninja/fact')
    .then(response => {
      if (!response.ok) {
        // If server responds but with an error code
        throw new Error('Network response was not OK (status ' + response.status + ')');
      }
      return response.json();
    })
    .then(data => {
      factEl.textContent = data.fact;
    })
    .catch(err => {
      // If fetch fails (offline, blocked, etc.)
      factEl.textContent = 'No fact available right now.';
      errEl.textContent = '⚠️ Could not load fact: ' + err.message;
      errEl.style.display = 'block';
      console.error(err);
    });
}
