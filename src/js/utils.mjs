// Query selector helper
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Click helper
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });

  qs(selector).addEventListener("click", callback);
}

// Render a list using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  callback
) {
  parentElement.innerHTML = "";

  const html = list.map(templateFn).join("");

  parentElement.insertAdjacentHTML("afterbegin", html);

  if (callback) {
    callback(list);
  }
}

// Render a single HTML template
export function renderWithTemplate(
  template,
  parentElement,
  data = {},
  callback
) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// Load an HTML template file
export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }

  return await response.text();
}

// Load header and footer
export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}