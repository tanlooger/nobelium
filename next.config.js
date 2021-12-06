module.exports = {
  trailingSlash: false,
  webpack5: true,
  images: {
    domains: ['gravatar.com', 'i.imgur.com', 'wx3.sinaimg.cn']
  },
  eslint: {
    dirs: [
      'components',
      'layouts',
      'lib',
      'pages'
    ]
  },
  async headers () {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          }
        ]
      }
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }
    return config
  },
  async redirects () {
    return [
      // With parameter and custom status code
      {
        source: 'https://freehi.cc/',
        destination: 'https://freehi.cc',
        statusCode: 301 // see other
      }
    ]
  }
}
