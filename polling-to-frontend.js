const axios = require('axios');

const tryToConnect = async ({ url, method = 'get'}) => {
  const result = await axios({
    url,
    method,
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  })
    .then(res => {
      // console.log(res.toJSON());
      return Promise.resolve();
    })
    .catch(err => {
      // console.log(err.toJSON());
      return Promise.reject();
    });

  return result;
};
const myTimeoutPromise = ms => new Promise((res, rej) => {
  // something could be checked...
  if (true) { setTimeout(res, ms); } else { }
});
function createPollingByConditions (props) {
  const {
    url,
    method,
    toBeOrNotToBe,
    interval,
    callbackAsResolve,
    callbackAsReject
  } = props

  // console.log ("createPollingByConditions ()", url, toBeOrNotToBe(), interval);
  if (toBeOrNotToBe()) {
    tryToConnect({ url, method })
      .then (
        result => {
          console.log ('createPollingByConditions () is done.')
          callbackAsResolve(result)
          return myTimeoutPromise(interval)
        },
        err => {
          callbackAsReject('createPollingByConditions () is failed: Trying to reconnect...')
          return (myTimeoutPromise (interval))
        }
      )
      .then (() => {
        // this was promised by _devay () which was called at the end of previous then ()
        createPollingByConditions (props)
      })
      .catch (err => {
        console.log(err)
        createPollingByConditions (props)
      });
  }
};

module.exports = {
  createPollingByConditions
};