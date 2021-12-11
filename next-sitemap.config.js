const BLOG = require('./blog.config')

module.exports = {
  siteUrl: BLOG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/feed', '/search', '/books/*', '/page/*', '/0/*']
  // ...other options
  // https://github.com/iamvishnusankar/next-sitemap#configuration-options
}
