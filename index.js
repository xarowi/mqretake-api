/**
 * Monkey Quest Retake API.
 *
 * Replacement of Monkey Quest API
 * specially created for Monkey Quest Retake
 */

const fastify = require("fastify")({ logger: true });

// Basic functions
// Idea taken from Just Dance Now web client
const { md5, uuid, getSFSHost } = require("./basicFunc");

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
  reply.send(`Launcher finally works!`);
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
        uuid: uuid(),
        username, // Fun fact: Nicknames of developer is contains a "mdqd_iglbeta"
        createdDate: Math.floor(Date.now()),
      },
      sso: {
        authToken: authorizationToken,
        gender: "male", // Not sure
        dob: Math.floor(Date.now()), // Not sure
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

/**
 * Session generator endpoint
 *
 * Needed to start the game. I guess, i need to connect 
 * this thing to SmartFoxServer extension.
 */
fastify.post("/api/json/dlc/shard", function (request, reply) {
  const { uuid } = request.body;
  
  reply.send({
    status: true,
    sharder: {
      // I don't know why they made that keys
      "unity.login.sid": uuid,
      "unity.login.host": getSFSHost(),
    },
  });
});

/**
 * Current game version endpoint
 *
 * Needed for launcher and maybe updater.
 * Temporary here. I will make this in different
 * thing like website or special service.
 */
fastify.get("/Game/dlc/:environment/current.txt", function (request, reply) {
  const currentVersion = JSON.stringify({
    game: { version: "120397.524", lastUpdate: "2014-07-30_16-58-28" },
    launcher: { version: "2.0.105", lastUpdate: "2014-06-20_14-03-39" },
  });
  reply.send(currentVersion);
});

// Listening at port from environment
fastify.listen(process.env.PORT, "0.0.0.0", function (err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
});
