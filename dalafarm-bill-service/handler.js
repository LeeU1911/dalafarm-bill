'use strict';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.helloWName = (event, context, callback) => {
  var name = event.name;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello ' + name,
    }),
  };

  callback(null, response);

};

module.exports.submitBill = (event, context, callback) => {
  var billContent = event.billContent;
  const response = {
    statusCode: 200,
    body: {
      status: 'successful',
      bill: billContent
    }
  };

  callback(null, response);

};
