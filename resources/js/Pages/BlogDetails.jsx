import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React, { useState } from 'react'
import { usePage, router, Link } from '@inertiajs/react'
import '../../css/blog.css'

export default function BlogDetails({ bannerImage }) {
  const { blog, categories, tags, recentPosts, auth } = usePage().props

  const [form, setForm] = useState({
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.post(route('blog.comment', blog.id), form)
    setForm({ message: '' }) // reset du champ
  }

  return (
    <div>
      <Nav />
      
      {/* Bannière */}
      <div className="carouDetails">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Blog Details</h2>
          <p className="detailsP">{blog.titre}</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      <div className="blog-container">
        {/* Partie gauche */}
        <div className="blog-left">
          {/* Blog en question */}
          <div className="blog-card">
            <img src={`/${blog.blog_path}`} alt={blog.titre} className="blog-img" />
            <div className="blog-content">
              <h2>{blog.titre}</h2>
              <p>{blog.description}</p>
            </div>
          </div>

          {/* Commentaires */}
          <div className="comments-section">
            <h3>{blog.commentaires.length} Comments</h3>
            {blog.commentaires.map((comment, i) => (
              <div key={i} className="comment">
                <p>
                  <strong>{comment.user?.pseudo}</strong>
                  {" - "}
                  {new Date(comment.created_at).toLocaleDateString()}{" "}
                  {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p>{comment.message}</p>
              </div>
            ))}

            <hr />

            {/* Leave a reply */}
            {auth?.user ? (
              <div className="leave-reply">
                <h3>Leave a Reply</h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="message"
                    placeholder="Write a comment"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Send Message</button>
                </form>
              </div>
            ) : (
              <p><Link href={route('login')}>Connectez-vous</Link> pour laisser un commentaire.</p>
            )}
          </div>
        </div>

        {/* Partie droite : sidebar */}
        <div className="blog-right">
          {/* Search */}
          <div className="sidebar-card">
            <form onSubmit={(e) => {
              e.preventDefault()
              const q = e.target.search.value
              router.get(route('blog'), { search: q })
            }}>
              <input
                type="text"
                name="search"
                placeholder="Search Keyword"
                className="search-input"
              />
              <button type="submit" className="search-btn">SEARCH</button>
            </form>
          </div>

          {/* Catégories */}
          <div className="sidebar-card">
            <h4>Category</h4>
            <ul className="category-list">
              {categories.map((cat, i) => (
                <li key={i}>{cat.nom} ({cat.blogs_count})</li>
              ))}
            </ul>
          </div>

          {/* Posts récents */}
          <div className="sidebar-card">
            <h4>Recent Post</h4>
            <ul className="recent-posts">
              {recentPosts.map((post, i) => (
                <li key={i}>
                  <Link href={route('blog.show', post.id)}>
                    <span>{post.titre.substring(0, 25)}...</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="sidebar-card">
            <h4>Tag Clouds</h4>
            <div className="tags">
              {tags.map((tag, i) => (
                <span key={i} className="tag">{tag.nom} ({tag.blogs_count})</span>
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