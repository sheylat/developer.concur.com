const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata');
const path = require('metalsmith-path');
const serve = require('metalsmith-serve');
const R = require('ramda');
const moment = require('moment');

metalsmith(__dirname)
  .source('./src')
  .destination('./site')
  .metadata({
    site: {
      title: 'Concur Developer Portal',
      email: 'devx@concur.com',
      description: 'Concur docs provides comprehensive information on working with the Concur platform',
      baseurl: '',
      canonical_site: 'https://developer.concur.com',
      twitter_username: 'concurapi',
      github_username:  'concur'
    }
  })
  .use(markdown())
  .use(path({
    baseDirectory: '/'
  }))
  .use(metadata({
    git: 'metadata/git.yml', // [docs](https://github.com/segmentio/metalsmith-metadata) appear to be incorrect; expectation is that metadata file is under ./src and should be referenced relative to that directory
    topnav: 'metadata/top-nav.yml'
  }))
  .use(layouts({
    engine: 'qejs',
    directory: 'layouts',
    partials: 'partials',
    moment: moment,
    R: R
  }))
  .use(serve())
  .build(err => {
    if(err)
      console.log(err);
    else
      console.log('Site build complete!');
  });
