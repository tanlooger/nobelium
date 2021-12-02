import { getAllPosts, getAllBooksFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/searchbook'

export default function Book ({ books, posts, currentBook }) {
  return <SearchLayout books={books} posts={posts} currentBook={currentBook} />
}

export async function getStaticProps ({ params }) {
  const currentBook = params.book
  const posts = await getAllPosts({ includePages: false })
  const books = getAllBooksFromPosts(posts)
  const filteredPosts = posts.filter(
    post => post && post.book && post.book.includes(currentBook)
  )
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
  const books = getAllBooksFromPosts(posts)
  return {
    paths: Object.keys(books).map(book => ({ params: { book } })),
    fallback: true
  }
}
