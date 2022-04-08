/**
 * Monkey Quest Retake API.
 *
 * Replacement of Monkey Quest API
 * specially created for Monkey Quest Retake
 */

const crypto = require("crypto");

const fastify = require("fastify")({ logger: true });

// Needed for handling application/x-www-form-urlencoded body
fastify.register(require("fastify-formbody"));

/**
 * MD5 function
 *
 * Example: md5("The quick brown fox jumps over the lazy dog.")
 *   => "e4d909c290d0fb1ca068ffaddf22cbd0"
 */
function md5(data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest("hex");
}

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

/**
 * Login endpoint
 *
 * Needed for launcher. Launcher creates authorization token
 * with username and password (or other authorization token)
 * from application/x-www-form-urlencoded body
 */
fastify.post("/api/json/dlc/login", function (request, reply) {
  // Getting data from application/x-www-form-urlencoded body
  const { username, password } = request.body;
  const rememberPassword = (request.body.rememberPassword === "True");

  // Temporary authorization token will be MD5 hash of
  // password and remember password boolean option
  // from application/x-www-form-urlencoded body
  const authorizationToken = md5(password + rememberPassword.toString());

  // Replying to request
  reply.send({
    status: true,
    user: {
      local: {
        uuid: "d057d6a6-b310-4d4b-87a0-0e29a8fc646f",
        username, // Fun fact: Nicknames of developer is contains a "mdqd_iglbeta"
        createdDate: Math.floor(Date.now()),
      },
      sso: {
        authToken: authorizationToken,
        gender: "male", // Not sure
        dob: Math.floor(Date.now()),
      },
      premium: {
        membership: true,
      }
    },
    analytics: {
      id: 256,
      trackingShortId: true,
      firstLoginToday: true,
      firstTimeLogin: false,
      // Data from LocalBuildConifg.xml
      enabled: true,
      baseUrl: "http://api.geo.kontagent.net/api/v1/",
      apiKey: "5532fa865e624d37875191345654d010",
    },
    additional: {
      region: "RU", // I am russian, lol
      signupExperience: "", // I don't know what is this, but this can be empty string
    },
  });
});

// Listening at port from environment
fastify.listen(process.env.PORT, "0.0.0.0", function (err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
});
