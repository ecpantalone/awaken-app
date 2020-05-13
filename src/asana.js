let asana = require('asana');
let config = require('./config');

const asanaAccessToken = "1/1175493942091490:20437f4b3f75caab3dd66bb3050b1ec8";

const deprecationHeaders = { "defaultHeaders": { "asana-enable": "new_sections,string_ids" } };

// Create Asana client using PAT and deprecation headers.
const client = asana.Client.create(deprecationHeaders).useAccessToken(accessToken);

// Request delay in ms
const delay = 200;
