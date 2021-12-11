import Link from 'next/link'

const Books = ({ books, currentBook }) => {
  if (!books) return null
  return (
    <div className="book-container">
      <ul className="flex max-w-full mt-4 overflow-x-auto">
        {Object.keys(books).map(key => {
          console.log('aaaaaaaaa' + currentBook)
          const selected = key === currentBook
          return (
            <li
              key={key}
              className={`mr-3 font-medium border whitespace-nowrap dark:text-gray-300 ${
                selected
                  ? 'text-white bg-black border-black dark:bg-gray-600 dark:border-gray-600'
                  : 'bg-gray-100 border-gray-100 text-gray-400 dark:bg-night dark:border-gray-800'
              }`}
            >
              <Link
                key={key}
                href={selected ? '/search' : `/${encodeURIComponent(key)}`}
              >
                <a className="px-4 py-2 block">
                  {`${books[key].bookname} (${books[key].count})`}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Books
