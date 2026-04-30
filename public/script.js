// DOM Elements
const titleForm = document.getElementById('titleForm');
const submitBtn = document.getElementById('submitBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultsContainer = document.getElementById('resultsContainer');
const titlesList = document.getElementById('titlesList');
const errorMessage = document.getElementById('errorMessage');

// Form submission handler
titleForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Reset previous state
  hideError();
  resultsContainer.classList.add('hidden');
  
  // Get form data
  const formData = {
    product_name: document.getElementById('product_name').value.trim(),
    category: document.getElementById('category').value.trim(),
    features: document.getElementById('features').value.trim(),
    audience: document.getElementById('audience').value.trim(),
    brand: document.getElementById('brand').value.trim() || null
  };

  // Show loading state
  showLoading();
  submitBtn.disabled = true;

  try {
    // Send request to API
    const response = await fetch('/api/generate-titles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate titles');
    }

    // Display results
    displayTitles(data.titles);
    resultsContainer.classList.remove('hidden');

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    showError(error.message);
    console.error('Error:', error);
  } finally {
    hideLoading();
    submitBtn.disabled = false;
  }
});

/**
 * Display generated titles
 * @param {Array} titles - Array of generated titles
 */
function displayTitles(titles) {
  titlesList.innerHTML = '';
  
  titles.forEach((title, index) => {
    const titleLength = title.length;
    const isGoodLength = titleLength <= 80;
    const lengthClass = isGoodLength ? 'ok' : 'warning';
    
    const titleItem = document.createElement('div');
    titleItem.className = 'title-item';
    titleItem.innerHTML = `
      <div class="title-item-content">
        <span class="title-item-number">${index + 1}.</span>
        <span class="title-item-text">${escapeHtml(title)}</span>
        <span class="title-item-length ${lengthClass}">(${titleLength} characters)</span>
      </div>
      <button type="button" class="btn-copy" onclick="copyToClipboard('${escapeHtml(title)}', this)">
        📋 Copy
      </button>
    `;
    
    titlesList.appendChild(titleItem);
  });
}

/**
 * Copy title to clipboard
 * @param {String} text - Text to copy
 * @param {Element} button - Button element
 */
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.classList.add('copied');
    
    // Reset button after 2 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  });
}

/**
 * Show loading spinner
 */
function showLoading() {
  loadingSpinner.classList.remove('hidden');
}

/**
 * Hide loading spinner
 */
function hideLoading() {
  loadingSpinner.classList.add('hidden');
}

/**
 * Show error message
 * @param {String} message - Error message
 */
function showError(message) {
  errorMessage.textContent = `❌ ${message}`;
  errorMessage.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';
}

/**
 * Reset form and results
 */
function resetForm() {
  titleForm.reset();
  resultsContainer.classList.add('hidden');
  titlesList.innerHTML = '';
  hideError();
  document.getElementById('product_name').focus();
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {String} text - Text to escape
 * @returns {String} Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Auto-focus on product name field on page load
document.getElementById('product_name').focus();
