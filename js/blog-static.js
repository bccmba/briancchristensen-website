document.addEventListener('DOMContentLoaded', () => {
  // Post data - generated statically
  const posts = [
    { slug: "importance-of-feedback.html", title: "Importance of Feedback", date: "May 8, 2021", category: "pm", excerpt: "At the end of every sprint, the team will sit down with the group of stakeholders to show them everything they have produced in the last sprint.", readingTime: 3 },
    { slug: "the-product-manager-monomyth.html", title: "The Product Manager Monomyth", date: "June 11, 2021", category: "pm", excerpt: "A few years ago I left an interview with the hiring manager telling me I was not the right fit for the job.", readingTime: 6 },
    { slug: "a-seat-at-the-table.html", title: "A Seat At The Table", date: "May 14, 2021", category: "pm", excerpt: "An idea you often hear discussed in the business world is the concept of having a seat at the table.", readingTime: 4 },
    { slug: "presenting-like-a-prodstar.html", title: "Presenting Like A ProdStar", date: "June 5, 2021", category: "pm", excerpt: "I can still remember early in my career walking into a conference room to present to stakeholders.", readingTime: 5 },
    { slug: "the-status-quo-step-one-of-the-product-management-monomyth.html", title: "The Status Quo - Step One of the Product Management Monomyth", date: "June 19, 2021", category: "pm", excerpt: "It is one of the most recognizable stories in all of mythology and storytelling.", readingTime: 4 },
    { slug: "just-say-no-kind-of.html", title: "Just Say No - Kind of", date: "June 24, 2021", category: "pm", excerpt: "One of the first things I learned as a Product Manager was how to say no.", readingTime: 4 },
    { slug: "a-call-to-action-step-two-of-the-product-management-monomyth.html", title: "A Call to Action - Step Two of the Product Management Monomyth", date: "June 26, 2021", category: "pm", excerpt: "In the world of Product Management, this call to action often comes in the form of a new project.", readingTime: 4 },
    { slug: "supernatural-aid-step-three-of-the-product-management-monomyth.html", title: "Supernatural Aid - Step Three of the Product Management Monomyth", date: "July 3, 2021", category: "pm", excerpt: "In the most resent Pixar movie Soul, the main character Joe is a middle school band teacher.", readingTime: 6 },
    { slug: "crossing-the-threshold-step-four-of-the-product-management-monomyth.html", title: "Crossing The Threshold - Step Four of the Product Management Monomyth", date: "July 10, 2021", category: "pm", excerpt: "In Lewis Carroll's novel Alice in Wonderland, there is a famous scene where Alice comes to a door.", readingTime: 4 },
    { slug: "trials-step-five-of-the-product-management-monomyth.html", title: "Trials - Step Five of the Product Management Monomyth", date: "July 17, 2021", category: "pm", excerpt: "When I think of someone who excels at Trials, I think of Apollo 13 and the team working on the CO2 scrubber.", readingTime: 5 },
    { slug: "approach-step-six-of-the-product-management-monomyth.html", title: "Approach - Step Six of the Product Management Monomyth", date: "July 24, 2021", category: "pm", excerpt: "The prince approaches the dragon and prepares to do battle.", readingTime: 4 },
    { slug: "ordeal-step-seven-of-the-product-management-monomyth.html", title: "Ordeal - Step Seven of the Product Management Monomyth", date: "July 31, 2021", category: "pm", excerpt: "I can still remember the moment I realized I was in over my head.", readingTime: 4 },
    { slug: "reward-step-eight-of-the-product-management-monomyth.html", title: "Reward - Step Eight of the Product Management Monomyth", date: "August 7, 2021", category: "pm", excerpt: "What story of reward could be better than the Elixir?", readingTime: 4 },
    { slug: "return-home-step-nine-of-the-product-management-monomyth.html", title: "Return Home - Step Nine of the Product Management Monomyth", date: "August 14, 2021", category: "pm", excerpt: "With the hero's reward, and the lessons learned, the hero now starts the return home.", readingTime: 3 },
    { slug: "how-to-deliver-bad-news-effectively.html", title: "How to Deliver Bad News Effectively", date: "August 21, 2021", category: "leadership", excerpt: "The other day I took my wife to get her hair done and while we were sitting there I struck up a conversation.", readingTime: 5 },
    { slug: "getting-water-to-the-end-of-the-row.html", title: "Getting Water to the End of the Row", date: "August 28, 2021", category: "pm", excerpt: "One of my mentors always told me that the most important thing a Product Manager does is get water to the end of the row.", readingTime: 3 },
    { slug: "minimum-viable-product-mvp-vs-maximum-lovable-product-mlp.html", title: "Minimum Viable Product (MVP) vs. Maximum Lovable Product (MLP)", date: "September 4, 2021", category: "pm", excerpt: "When it comes to product development, there are two approaches that are often discussed.", readingTime: 4 },
    { slug: "proactive-software-development-vs-reactive-software-development-which-approach-is-best-for-your-business.html", title: "Proactive Software Development vs Reactive Software Development", date: "September 11, 2021", category: "pm", excerpt: "In today's fast-paced world of software development, teams are constantly deciding between being proactive or reactive.", readingTime: 3 },
    { slug: "finding-your-true-north-star.html", title: "Finding Your True North Star", date: "September 18, 2021", category: "pm", excerpt: "In the competitive world of product management, having a clear sense of direction is crucial.", readingTime: 3 },
    { slug: "setting-the-cultural-tone-how-the-product-owner-shapes-software-development-teams.html", title: "Setting the Cultural Tone", date: "September 25, 2021", category: "leadership", excerpt: "In the realm of software development, the Product Owner plays a pivotal role in shaping team culture.", readingTime: 5 },
    { slug: "coaching-up-vs-coaching-out-when-to-choose-each-approach.html", title: "Coaching Up vs. Coaching Out", date: "October 2, 2021", category: "leadership", excerpt: "In the ever-evolving landscape of product management, one of the most challenging aspects is managing team dynamics.", readingTime: 4 },
    { slug: "group-product-manager-gpm-a-comprehensive-overview.html", title: "Group Product Manager (GPM): A Comprehensive Overview", date: "October 9, 2021", category: "pm", excerpt: "In the dynamic and ever-evolving field of product management, the role of a Group Product Manager is pivotal.", readingTime: 4 },
    { slug: "defining-and-articulating-product-strategy-the-role-of-a-group-product-manager.html", title: "Defining and Articulating Product Strategy", date: "October 16, 2021", category: "pm", excerpt: "Defining and articulating a clear product strategy is one of the most critical responsibilities of a Group Product Manager.", readingTime: 4 },
    { slug: "mastering-innovation-unleashing-the-power-of-the-product-kata.html", title: "Mastering Innovation: Unleashing the Power of the Product Kata", date: "October 23, 2021", category: "pm", excerpt: "In the dynamic realm of product management, innovation is the key to staying ahead.", readingTime: 4 },
    { slug: "the-pitfall-of-mediocrity-how-good-is-the-enemy-of-great-in-product-management.html", title: "The Pitfall of Mediocrity", date: "October 30, 2021", category: "pm", excerpt: "Introduction: In the fast-paced world of product management, there's a subtle trap that many fall into.", readingTime: 4 },
    { slug: "elevating-your-product-management-game-overcoming-the-comfort-of-good.html", title: "Elevating Your Product Management Game", date: "November 6, 2021", category: "pm", excerpt: "Product management is a dynamic field that constantly demands growth and adaptation.", readingTime: 4 },
    { slug: "the-wisdom-of-jurassic-park-a-lesson-for-product-managers.html", title: "The Wisdom of Jurassic Park: A Lesson for Product Managers", date: "November 13, 2021", category: "pm", excerpt: "As we navigate the dynamic landscape of product management, lessons can come from unexpected places.", readingTime: 3 },
    { slug: "the-ultimate-guide-to-managing-technical-debt-as-a-product-manager.html", title: "The Ultimate Guide to Managing Technical Debt", date: "November 20, 2021", category: "pm", excerpt: "Technical debt is a common challenge that Product Managers face in software development.", readingTime: 5 },
    { slug: "the-terror-of-product-management.html", title: "\"The Terror\" Of Product Management", date: "November 27, 2021", category: "pm", excerpt: "Applying Product Management principles to everyday situations can yield fascinating insights.", readingTime: 6 },
    { slug: "the-radical-shift-in-product-management-pros-and-cons-of-major-change.html", title: "The Radical Shift in Product Management", date: "December 4, 2021", category: "pm", excerpt: "In today's fast-paced business environment, radical shifts in product management are becoming increasingly common.", readingTime: 6 },
    { slug: "henry-ford-and-the-v8-engine-a-lesson-in-product-management.html", title: "Henry Ford and the V8 Engine: A Lesson in Product Management", date: "December 11, 2021", category: "pm", excerpt: "Henry Ford's story is one of the most compelling in American business history.", readingTime: 7 },
    { slug: "how-walking-can-enhance-product-management.html", title: "How Walking Can Enhance Product Management", date: "December 18, 2021", category: "pm", excerpt: "The 10-Minute Rule: A simple technique that can dramatically improve your product management skills.", readingTime: 5 },
    { slug: "starting-strong-as-a-new-product-owner-why-focusing-on-the-next-new-feature-is-key.html", title: "Starting Strong as a New Product Owner", date: "December 25, 2021", category: "pm", excerpt: "Starting as a new product owner can be both exciting and overwhelming.", readingTime: 4 },
    { slug: "building-a-product-without-sinking-the-ship-lessons-from-the-lego-movie.html", title: "Building a Product Without Sinking the Ship", date: "January 1, 2022", category: "pm", excerpt: "There is a special joy in building things, whether it is a product or a movie.", readingTime: 5 },
    { slug: "the-bazinsky-principle-a-lesson-in-prioritization-and-collaboration.html", title: "The Bazinsky Principle", date: "January 8, 2022", category: "pm", excerpt: "Throughout my career, I have learned valuable lessons in prioritization and collaboration.", readingTime: 4 },
    { slug: "how-product-managers-remove-distractions-to-focus-on-what-matters.html", title: "How Product Managers Remove Distractions", date: "January 15, 2022", category: "pm", excerpt: "If you wear glasses, you already understand how to remove distractions and focus on what matters.", readingTime: 4 },
    { slug: "empowering-team-members-unlocking-productivity-and-innovation.html", title: "Empowering Team Members", date: "January 22, 2022", category: "leadership", excerpt: "In today's fast-paced work environment, empowering team members is crucial for success.", readingTime: 6 },
    { slug: "understanding-product-vs-project-management.html", title: "Understanding Product vs Project Management", date: "January 29, 2022", category: "pm", excerpt: "Understanding the difference between product and project management is crucial.", readingTime: 4 },
    { slug: "lessons-learned-what-i-wish-i-knew-as-a-new-product-manager.html", title: "Lessons Learned: What I Wish I Knew as a New Product Manager", date: "March 7, 2026", category: "pm", excerpt: "As I reflect on my 20+ years of experience as a Product Manager, I often think about what I wish I knew.", readingTime: 7 }
  ];

  const searchInput = document.getElementById('search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const postsContainer = document.getElementById('posts');

  function renderPosts(filteredPosts) {
    if (filteredPosts.length === 0) {
      postsContainer.innerHTML = '<div class="no-results">No posts found matching your criteria.</div>';
      return;
    }
    
    postsContainer.innerHTML = filteredPosts.map(post => `
      <a href="${post.slug}" class="post-card">
        <div class="post-meta">
          <span class="post-date">${post.date}</span>
          <span class="post-reading-time">${post.readingTime} min read</span>
        </div>
        <div class="post-cat">${post.category.toUpperCase()}</div>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <span class="post-link">Read post →</span>
      </a>
    `).join('');
  }

  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    
    const filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                          post.excerpt.toLowerCase().includes(searchTerm);
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    renderPosts(filtered);
  }

  searchInput.addEventListener('input', filterPosts);
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPosts();
    });
  });

  // Initial render
  renderPosts(posts);
});