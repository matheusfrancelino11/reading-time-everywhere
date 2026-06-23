(function() {
  // Prevent multiple injections
  if (document.getElementById('reading-time-everywhere-badge')) {
    return;
  }

  // Identify the main content of the article
  let text = "";
  const article = document.querySelector('article') || document.querySelector('main');
  
  if (article) {
    text = article.innerText;
  } else {
    // Fallback: grab text from common text elements
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
    for (const el of elements) {
      text += el.innerText + " ";
    }
  }

  // Count words
  let wordCount = 0;
  if (text.trim().length > 0) {
    wordCount = text.trim().split(/\s+/).length;
  }
  
  if (wordCount < 100) return; // Don't show for very short pages

  // Calculate reading time (200 words per minute)
  const wpm = 200;
  const readingTime = Math.ceil(wordCount / wpm);

  // Create badge element
  const badge = document.createElement('div');
  badge.id = 'reading-time-everywhere-badge';
  
  const formattedWordCount = wordCount.toLocaleString('en-US'); 
  
  badge.innerHTML = `
    <div class="rte-content">
      <div class="rte-time">${readingTime} min read</div>
      <div class="rte-words">${formattedWordCount} words</div>
    </div>
    <button class="rte-close" aria-label="Close" title="Close">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  document.body.appendChild(badge);

  // Add dismiss functionality
  const closeBtn = badge.querySelector('.rte-close');
  closeBtn.addEventListener('click', () => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-10px)';
    setTimeout(() => badge.remove(), 300); // Wait for transition
  });
})();
