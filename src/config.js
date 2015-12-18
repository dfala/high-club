require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'High Club',
    description: '',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'High Club',
        'og:image': '',
        'og:locale': 'en_US',
        'og:title': 'R',
        'og:description': '',
        'twitter:card': 'summary',
        'twitter:site': '',
        'twitter:creator': '',
        'twitter:title': '',
        'twitter:description': '.',
        'twitter:image': '',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
