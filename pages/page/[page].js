import Container from '../../components/Container'
import BlogPost from '../../components/BlogPost'
import Pagination from '../../components/Pagination'
import { getAllPosts } from '../../lib/notion'
import BLOG from '../../blog.config'

const Page = ({ postsToShow, page, showNext }) => {
  console.log(111111111)
  return (
    <Container>
      {postsToShow &&
        postsToShow.map(post => <BlogPost key={post.id} post={post} />)}
      <Pagination page={page} showNext={showNext} />
    </Container>
  )
}

export async function getStaticProps (context) {
  console.log(222222)
  const { page } = context.params // Get Current Page No.
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  )
  const totalPosts = posts.length
  const showNext = page * BLOG.postsPerPage < totalPosts
  return {
    props: {
      page, // Current Page
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export async function getStaticPaths () {
  console.log(33333)
  const posts = await getAllPosts({ includePages: false })
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage)
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) }
    })),
    fallback: true
  }
}

export default Page
