import Layout from '../../layouts/layout'
import { getAllPosts, getPostBlocks } from '../../lib/notion'
import BLOG from '../../blog.config'
import { createHash } from 'crypto'

const BlogPost = ({ post, blockMap, emailHash }) => {
  console.log(666)
  if (!post) return null
  return (
    <Layout
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      fullWidth={post.fullWidth}
    />
  )
}

export async function getStaticPaths () {
  console.log(777)
  const posts = await getAllPosts({ includePages: true })
  return {
    paths: posts.map(row => `${BLOG.path}/${row.bookid}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  console.log(8888)
  const posts = await getAllPosts({ includePages: true })
  const post = posts.find(t => t.slug === slug)
  // eslint-disable-next-line no-empty
  if (post === undefined) {
    return {
      notFound: true
    }
  }
  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}

export default BlogPost
