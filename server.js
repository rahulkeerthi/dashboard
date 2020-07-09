// const jsonServer = require('json-server');

// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const db = require('./db.json');

// router.db._.id = 'slug';
// server.use(router);
// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// server.post('/providers', (req, res) => {
//   if (req.method === 'POST') {
//     const { slug } = req.body;
//     if (slug != null) {
//       const result = db.find((provider) => {
//         return provider.slug === slug;
//       });

//       if (result) {
//         const { id, ...provider } = result;
//         res.status(200).jsonp(provider);
//       } else {
//         res.status(400).jsonp({
//           error: 'Bad slug',
//         });
//       }
//     } else {
//       res.status(400).jsonp({
//         error: 'No valid slug',
//       });
//     }
//   }
// });

// server.listen(3001, () => {
//   console.log('JSON Server is running');
// });
