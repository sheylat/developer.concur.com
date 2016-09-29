const metalsmith = require('metalsmith');

metalsmith(__dirname)
  .source('./src')
  .destination('./site')
  .build(err => {
    if(err)
      console.log(err);
    else
      console.log('Site build complete!');
  });
