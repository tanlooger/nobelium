import { getAllPosts, getAllBooksFromPostsByBookid } from '../../lib/notion'
import SearchLayout from '../../layouts/searchbook'

export default function Book ({ books, posts, currentBook }) {
  return <SearchLayout books={books} posts={posts} currentBook={currentBook} />
}

export async function getStaticProps ({ params }) {
  if (/^\d+$/.test(params.bookid) === false) {
    return {
      notFound: true
    }
  }
  const currentBook = params.bookid
  const posts = await getAllPosts({ includePages: false })
  const books = getAllBooksFromPostsByBookid(posts)
  const filteredPosts = posts.filter(
    post => post && post.bookid && post.bookid.includes(currentBook)
  )

  if (!filteredPosts.length) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      books,
      posts: filteredPosts,
      currentBook
    },
    revalidate: 1
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: false })
  const books = getAllBooksFromPostsByBookid(posts)
  return {
    paths: Object.keys(books).map(bookid => ({ params: { bookid } })),
    fallback: true
  }
}
