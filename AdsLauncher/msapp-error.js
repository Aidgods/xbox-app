(function () { 
  var validParameterNames = [ "httpStatus", "failureName", "failureUrl" ]; 
  
  function parseQueryParameters() { 
    var query = location.search.slice(1); 
    return query.split("&").reduce(function (queryParameters, rawPair) {
                                   var pair = rawPair.split("=").map(decodeURIComponent);
                                   queryParameters[pair[0]] = pair[1];
                                   return queryParameters;
    }, {});
  }
 
  function initialize() {
    closeApp();
    var queryParameters = parseQueryParameters();
    validParameterNames.forEach(function (parameterName) {
                               var parameterValue = queryParameters[parameterName] || "N/A"; 
                               document.getElementById(parameterName + "Value").textContent = parameterValue;
    });
  }

  function closeApp(sec) {
      sec = sec || 0; // Default to 0(run immediately).        
      setTimeout(function () {
          if (window.MSApp && typeof window.MSApp.terminateApp === 'function') {
              // Close the xbox app 
              // Since the message is a required field, hence, 
              // sending an empty object.
              window.MSApp.terminateApp({});
          } else {
              //sendLog('XBOX :: window.MSApp.terminateApp not defined!');
          }
      }, sec * 1000);
  }
  
  document.addEventListener("DOMContentLoaded", initialize);
}());
