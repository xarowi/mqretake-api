/**
 * Monkey Quest Retake API.
 *
 * Replacement of Monkey Quest API
 * specially created for Monkey Quest Retake
 */

const fastify = require("fastify")({ logger: true });

// Needed for handling application/x-www-form-urlencoded body
fastify.register(require("fastify-formbody"));

// Listening at port from environment
fastify.listen(process.env.PORT, "0.0.0.0", function (err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
});
