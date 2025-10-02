import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React from 'react'
import '../../css/blog.css'
import { Link, router, usePage } from '@inertiajs/react'

export default function Blog({bannerImage}) {
  const { blogs, categories, tags, filters } = usePage().props
  const [search, setSearch] = React.useState(filters.search || '')

  const handleSearch = (e) => {
    e.preventDefault()
    router.get(route('blog'), { search })
  }

  const filterByCategory = (cat) => {
    router.get(route('blog'), { categorie: cat })
  }

  const filterByTag = (tag) => {
    router.get(route('blog'), { tag })
  }
  return (
    <div>
      <Nav />
      {/* Bannière */}
      <div className="carouDetails">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Discover our Blogs</h2>
          <p className="detailsP">Blog - Blogs table</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      {/* Container principal */}
      <div className="blog-container">
        {/* Partie gauche : blogs */}
        <div className="blog-left">
            {blogs.map((blog, index) => {
              const date = new Date(blog.created_at);
              const day = date.getDate(); // donne 1 → 31 sans zéro devant
              const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // "APR"

              return (
                <div className="blog-card" key={index}>
                  <Link href={route('blog.show', blog.id)}>
                    <img src={blog.blog_path} alt={blog.titre} className="blog-img" />
                  </Link>
                  <div className="blog-date">
                    <span className="day">{day} </span>
                    <span className="month">{month}</span>
                  </div>
                  <div className="blog-content">
                    <h3>
                      <Link style={{ fontWeight:'bold' }} href={route('blog.show', blog.id)}>
                        {blog.titre}
                      </Link>
                    </h3>
                    <p>{blog.description.substring(0, 150)}...</p>
                    <div className="blog-meta">
                      <span>Catégorie: {blog.categorie?.nom}</span>
                      <span> | {blog.commentaires?.length ?? 0} Comments</span>
                    </div>
                  </div>
                </div>
              )
          })}
        </div>

        {/* Partie droite : sidebar */}
        <div className="blog-right">
          {/* Search */}
          <div className="sidebar-card">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Keyword"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="search-btn">SEARCH</button>
            </form>
          </div>

          {/* Catégories */}
          <div className="sidebar-card">
            <h4>Category</h4>
            <ul className="category-list">
              {categories.map((cat, i) => (
                <li key={i} onClick={() => filterByCategory(cat.nom)} className="filter-link">
                  {cat.nom} ({cat.blogs_count})
                </li>
              ))}
            </ul>
          </div>

          {/* Posts récents */}
          <div className="sidebar-card">
            <h4>Recent Post</h4>
            <ul className="recent-posts">
              {blogs.slice(0, 3).map((post, i) => {
                const date = new Date(post.created_at);
                const day = date.getDate();
                const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const year = date.getFullYear().toString().slice(-2); // "25" au lieu de "2025"

                return (
                  <li key={i}>
                    <span>{post.titre.substring(0, 25)}...</span>
                    <br />
                    <small>{month} {day}, {year}</small>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tags */}
          <div className="sidebar-card">
            <h4>Tag Clouds</h4>
            <div className="tags">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="tag filter-link"
                  onClick={() => filterByTag(tag.nom)}
                >
                  {tag.nom} ({tag.blogs_count})
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sidebar-card">
            <h4>Newsletter</h4>
            <input type="email" placeholder="Enter email" className="newsletter-input" />
            <button className="newsletter-btn">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
