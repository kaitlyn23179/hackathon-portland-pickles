const factEl = document.getElementById('fact');
const btn = document.getElementById('newFact');
const errEl = document.getElementById('error');

function withTimeout(ms, controller = new AbortController()){
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

async function getJSON(url, { timeout = 8000 } = {}){
  const { signal, clear } = withTimeout(timeout);
  try{
    const res = await fetch(url, { signal, headers: { 'Accept': 'application/json' } });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clear();
  }
}

function showLoading(){
  errEl.hidden = true;
  errEl.textContent = '';
  factEl.innerHTML = 'Loading <span class="loading" aria-hidden="true"></span>';
}

function showError(msg){
  errEl.textContent = `⚠️ ${msg}`;
  errEl.hidden = false;
}

// Use Cat Facts API: https://catfact.ninja/fact
async function loadFact(){
  showLoading();
  try{
    const data = await getJSON('https://catfact.ninja/fact');
    factEl.textContent = data.fact;
  }catch(e){
    factEl.textContent = 'No fact available right now.';
    showError(`Could not load fact (${e.message}). Try again.`);
  }
}

btn.addEventListener('click', loadFact);

// Load one fact on initial page view
loadFact();
