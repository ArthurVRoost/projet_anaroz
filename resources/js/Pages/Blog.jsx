import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React, { useState } from 'react'
import '../../css/blog.css'
import { Link, router, usePage } from '@inertiajs/react'

export default function Blog({bannerImage}) {
  const { blogs, categories, tags, filters } = usePage().props
  const [search, setSearch] = useState(filters.search || '')

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
      
      <div className="carouDetails">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Discover our Blogs</h2>
          <p className="detailsP">Blog - Blogs table</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

     
      <div className="blog-container">
       
        <div className="blog-left">
            {blogs.map((blog, index) => {
              const date = new Date(blog.created_at);
              const day = date.getDate(); 
              // DONNE LE MOIS SOUS FORME DE 3 PREMIERE LETTRE
              const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); 

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

       
        <div className="blog-right">
         
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

          
          <div className="sidebar-card">
            <h4>Recent Post</h4>
            <ul className="recent-posts">
              {blogs.slice(0, 3).map((post, i) => {
                const date = new Date(post.created_at);
                const day = date.getDate();
                const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                // VA DONNER LES 2 DERNIERS CHIFFRES DE L'ANNEE GENRE 25 AU LIEU DE 2025
                const year = date.getFullYear().toString().slice(-2); 

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
