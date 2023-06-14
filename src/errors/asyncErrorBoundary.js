function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
      Promise.resolve()
        .then(() => delegate(request, response, next))
        .catch((error = {}) => {
          const { status = defaultStatus, message = error } = error;
          next({
            status,
            message,
          });
        });
    };
  }
  
  module.exports = asyncErrorBoundary;


  //module 39.7 and 39.8 aggregates with knex and js