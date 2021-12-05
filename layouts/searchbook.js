import { useState } from 'react'
import BlogPost from '../components/BlogPost'
import Container from '../components/Container'
import Books from '../components/Books'
import PropTypes from 'prop-types'

const SearchLayout = ({ books, posts, currentBook }) => {
  const [searchValue, setSearchValue] = useState('')
  let filteredBlogPosts = []

  if (posts) {
    filteredBlogPosts = posts.filter(post => {
      const bookContent = post.books ? post.books.join(' ') : ''
      const searchContent = post.title + post.summary + bookContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  return (
    <Container>
      <div className="relative">
        <input
          type="text"
          placeholder={
            currentBook ? `Search in #${currentBook}` : 'Search Articles'
          }
          className="block w-full border px-4 py-2 border-black bg-white text-black dark:bg-night dark:border-white dark:text-white"
          onChange={e => setSearchValue(e.target.value)}
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-black dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <Books
        books={books}
        currentBook={currentBook}
      />
      <div className="article-container my-8">
        {!filteredBlogPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">No posts found.</p>
        )}
        {filteredBlogPosts.slice(0, 20).map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  )
}
SearchLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  books: PropTypes.object.isRequired,
  currentBook: PropTypes.string
}
export default SearchLayout
