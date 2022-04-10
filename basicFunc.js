/**
 * Basic functions for Monkey Quest Retake API
 *
 * Needed for basic stuff
 */

const crypto = require("crypto");

/**
 * MD5 function
 *
 * Example: md5("The quick brown fox jumps over the lazy dog.")
 *   => "e4d909c290d0fb1ca068ffaddf22cbd0"
 */
function md5(data) {
  // We creating MD5 hash,
  // adding data and getting hex string
  return crypto
    .createHash("md5")
    .update(data)
    .digest("hex");
}

/**
 * Simple UUID generator
 *
 * Why not node-uuid? I don't wanna take millions 
 * of dependencies and don't wanna be a victim
 * when random asshole will add dangerous code
 * for Russian and Belarusian users. (node-ipc)
 *
 * Example: uuid()
 *   => "6cb83c54-04c1-4592-bd6a-8bc2aa7335b1"
 */
function uuid() {
  // Getting random 16 bytes
  // using crypto module
  const randomBytes = crypto.randomBytes(16);

  // Getting hex string from
  // random bytes and converting that
  // to array
  let hexString = randomBytes
    .toString("hex");
  let hexArray = [...hexString];

  // Setting up the UUID version
  hexArray[12] = "4";

  // Back hex array to string
  hexString = hexArray.join("");

  // Taking parts from hex string 
  // for UUID string
  let hexParts = [
    hexString.substring(0, 8),
    hexString.substring(8, 12),
    hexString.substring(12, 16),
    hexString.substring(16, 20),
    hexString.substring(20, 32),
  ];

  // Creating the UUID string
  const uuidString = hexParts.join("-");

  return uuidString;
}

/**
 * Get SmartFoxServer host function
 *
 * Currently, this is just a mock-up.
 */
function getSFSHost() {
  return "127.0.0.1";
}

module.exports = { md5, uuid, getSFSHost };