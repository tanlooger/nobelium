export function getAllBooksFromPostsByBookid (posts) {
  const bookedPosts = posts.filter(post => post?.bookid)
  const booknames = [...bookedPosts.map(p => p.book).flat()]
  const bookids = [...bookedPosts.map(b => b.bookid).flat()]

  const bookObj = {}

  bookids.forEach((index, bookid) => {
    if (index in bookObj) {
      bookObj[index].count++
    } else {
      bookObj[index] = { count: 1, bookname: booknames[index] }
    }
  })

  return bookObj
}
