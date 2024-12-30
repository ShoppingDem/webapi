const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');

function CustomWorld() {
  // You can add properties to your custom world here
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000); // 60 seconds