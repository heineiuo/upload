var static = require('node-static')
var path = require('path')

var fileServer = new static.Server(path.join(__dirname, './public'), {
  cache: 72000000,
  gzip: true,
  indexFile: "index.html"
})

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (err, result) {
      if (err) { // There was an error serving the file
        if (err.status === 404) { // If the file wasn't found
          fileServer.serveFile('/404.html', 404, {}, request, response);
        } else {
          console.error("Error serving " + request.url + " - " + err.message)
          // Respond to the client
          response.writeHead(err.status, err.headers)
          response.end()
        }

      }
    });
  }).resume()
}).listen(8080)

console.log('8080')