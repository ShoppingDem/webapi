module.exports = {
  default: {
    requireModule: ['@babel/register'],
    require: [
      'test/setup/testSetup.js',
      'test/steps/**/*.js'
    ],
    format: ['progress-bar', 'html:cucumber-report.html'],
    paths: ['test/features/**/*.feature']
  }
};