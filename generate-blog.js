const fs = require('fs');

const xml = fs.readFileSync('./briancchristensen.WordPress.2026-04-04.xml', 'utf8');

const itemRegex = /<item>([\s\S]*?)<\/item>/g;
const items = [];

let match;
while ((match = itemRegex.exec(xml)) !== null) {
  items.push(match[1]);
}

const posts = items.filter(item => {
  const postTypeMatch = item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
  const statusMatch = item.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
  
  const postType = postTypeMatch ? postTypeMatch[1] : '';
  const status = statusMatch ? statusMatch[1] : '';
  
  return postType === 'post' && status === 'publish';
}).map(item => {
  const getContent = (tag) => {
    const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
    const plainRegex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
    const m = item.match(cdataRegex) || item.match(plainRegex);
    return m ? m[1] : '';
  };

  const title = getContent('title');
  const pubDate = getContent('pubDate');
  const content = getContent('content:encoded');
  const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
  const slug = slugMatch ? slugMatch[1] : '';
  
  const date = new Date(pubDate);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  let cleanedContent = content;
  // Remove only the WordPress block comment markers, keep the inner HTML
  cleanedContent = cleanedContent.replace(/<!-- wp:(\w+)(\s+\{[^}]*\})? -->(\s*)/g, '$3');
  cleanedContent = cleanedContent.replace(/<!-- \/wp:(\w+) -->/g, '');
  cleanedContent = cleanedContent.trim();

  const plainText = cleanedContent.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt = plainText.substring(0, 150).trim();

  return {
    title,
    slug,
    pubDate,
    date: formattedDate,
    content: cleanedContent,
    excerpt: excerpt.length === 150 ? excerpt + '...' : excerpt
  };
});

console.log(`Found ${posts.length} published posts`);

if (!fs.existsSync('./blog')) {
  fs.mkdirSync('./blog');
}

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Writing & thinking from Brian C. Christensen — Executive Product Manager" />
  <title>Writing — Brian C. Christensen</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/css/blog.css" />
</head>
<body>

  <nav>
    <div class="nav-inner">
      <a href="/" class="nav-logo">Brian C. Christensen</a>
      <button class="nav-toggle" aria-label="Toggle menu" onclick="document.querySelector('.nav-links').classList.toggle('open')">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="/#work">Work</a></li>
        <li><a href="/#writing">Writing</a></li>
        <li><a href="/#ai-services">AI Services</a></li>
        <li><a href="https://briancchristensen.gumroad.com" target="_blank">PM Playbook</a></li>
        <li><a href="/#contact" class="nav-cta">Let's talk</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <p class="eyebrow">Writing & thinking</p>
    <h1 class="hero-title">Articles & Insights</h1>
    <p class="hero-sub">Thoughts on product management, leadership, and AI transformation.</p>
  </section>

  <div class="posts-grid" id="posts">
${posts.map(post => `    <a href="${post.slug}.html" class="post-card">
      <div class="post-date">${post.date}</div>
      <div class="post-cat">Article</div>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${post.excerpt}</p>
      <span class="post-link">Read post →</span>
    </a>`).join('\n')}
  </div>

</body>
</html>`;

fs.writeFileSync('./blog/index.html', indexHtml);
console.log('Created blog/index.html');

const articleStyles = `
  <style>
    .post { max-width: 680px; margin: 0 auto; padding: 4rem 2rem; }
    .post-header { margin-bottom: 3rem; text-align: center; }
    .post-header .post-date { font-size: 13px; color: var(--text-muted); margin-bottom: 1rem; }
    .post-header .post-title { font-family: var(--font-serif); font-size: clamp(28px, 4vw, 42px); font-weight: 300; color: var(--navy); letter-spacing: -1px; line-height: 1.2; }
    .post-content { font-size: 17px; line-height: 1.75; color: var(--text); }
    .post-content p { margin-bottom: 1.5rem; }
    .post-content h2 { font-family: var(--font-serif); font-size: 24px; color: var(--navy); margin: 2.5rem 0 1rem; letter-spacing: -0.5px; }
    .post-content h3 { font-family: var(--font-serif); font-size: 20px; color: var(--navy); margin: 2rem 0 0.75rem; }
    .post-content ul, .post-content ol { margin: 0 0 1.5rem 1.5rem; }
    .post-content li { margin-bottom: 0.5rem; }
    .post-content a { color: var(--teal); text-decoration: underline; }
    .post-content a:hover { color: var(--navy); }
    .post-content img { max-width: 100%; height: auto; border-radius: 4px; margin: 1.5rem 0; }
    .post-content blockquote { border-left: 3px solid var(--teal); padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: var(--text-muted); }
    .post-content pre { background: var(--bg-soft); padding: 1rem; border-radius: 4px; overflow-x: auto; margin: 1.5rem 0; }
    .post-content code { font-family: monospace; font-size: 14px; }
    .post-footer { margin-top: 3rem; padding-top: 2rem; border-top: 0.5px solid var(--border); }
    .back-link { color: var(--teal); text-decoration: none; font-size: 14px; }
    .back-link:hover { text-decoration: underline; }
  </style>`;

posts.forEach(post => {
  const postHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${post.excerpt.replace(/"/g, '&quot;')}" />
  <title>${post.title} — Brian C. Christensen</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/css/blog.css" />
  ${articleStyles}
</head>
<body>

  <nav>
    <div class="nav-inner">
      <a href="/" class="nav-logo">Brian C. Christensen</a>
      <button class="nav-toggle" aria-label="Toggle menu" onclick="document.querySelector('.nav-links').classList.toggle('open')">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="/#work">Work</a></li>
        <li><a href="/#writing">Writing</a></li>
        <li><a href="/#ai-services">AI Services</a></li>
        <li><a href="https://briancchristensen.gumroad.com" target="_blank">PM Playbook</a></li>
        <li><a href="/#contact" class="nav-cta">Let's talk</a></li>
      </ul>
    </div>
  </nav>

  <article class="post">
    <header class="post-header">
      <div class="post-date">${post.date}</div>
      <h1 class="post-title">${post.title}</h1>
    </header>
    <div class="post-content">
${post.content}
    </div>
    <footer class="post-footer">
      <a href="index.html" class="back-link">← Back to all posts</a>
    </footer>
  </article>

</body>
</html>`;

  fs.writeFileSync(`./blog/${post.slug}.html`, postHtml);
  console.log(`Created blog/${post.slug}.html`);
});

console.log('Done!');