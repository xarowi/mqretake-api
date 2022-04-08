/**
 * Monkey Quest Retake API.
 *
 * Replacement of Monkey Quest API
 * specially created for Monkey Quest Retake
 */

const fastify = require("fastify")({ logger: true });

// Needed for handling application/x-www-form-urlencoded body
fastify.register(require("fastify-formbody"));

/**
 * News endpoint
 * 
 * Needed for launcher. Response is plain text
 * with titles of news
 */
fastify.get("/api/json/dlc/news", function (request, reply) {
  reply.code(404);
  reply.send(``);
});

// Listening at port from environment
fastify.listen(process.env.PORT, "0.0.0.0", function (err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
});
