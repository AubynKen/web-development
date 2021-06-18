/* 
A wrapper to Express middlewares.
Takes in an async Express middlewares and outputs the same middleware with error handling.
When error detected, the new outputted error calls the next function with the error.
*/

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
