export function getAllBooksFromPosts (posts) {
  const bookedPosts = posts.filter(post => post?.book)
  const books = [...bookedPosts.map(p => p.book).flat()]
  const bookObj = {}
  books.forEach(book => {
    if (book in bookObj) {
      bookObj[book]++
    } else {
      bookObj[book] = 1
    }
  })
  return bookObj
}
