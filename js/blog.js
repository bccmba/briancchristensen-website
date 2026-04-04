document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });

  // Load posts from WordPress
  async function loadPosts() {
    const postsContainer = document.getElementById('posts');
    
    try {
      const response = await fetch('https://briancchristensen.com/wp-json/wp/v2/posts?_embed&per_page=20');
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const posts = await response.json();
      
      if (!posts || posts.length === 0) {
        postsContainer.innerHTML = '<div class="loading">No posts yet.</div>';
        return;
      }

      postsContainer.innerHTML = posts.map(post => {
        const date = new Date(post.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        const categories = post._embedded?.['wp:term']?.[0] || [];
        const category = categories.length > 0 ? categories[0].name : 'Article';
        
        const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '';
        
        return `
          <a href="${post.link}" class="post-card" target="_blank" rel="noopener">
            <div class="post-date">${date}</div>
            <div class="post-cat">${category}</div>
            <h2 class="post-title">${post.title?.rendered || 'Untitled'}</h2>
            <p class="post-excerpt">${excerpt.substring(0, 120)}...</p>
            <span class="post-link">Read post →</span>
          </a>
        `;
      }).join('');

    } catch (error) {
      console.error('Error loading posts:', error);
      postsContainer.innerHTML = '<div class="error">Unable to load posts. Please visit <a href="https://briancchristensen.com/blog" style="color: var(--teal);" target="_blank">briancchristensen.com/blog</a></div>';
    }
  }

  loadPosts();
});
