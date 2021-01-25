const guestURLs = [
    // Auth URIs
    'POST::/api/auth/register',
    // Public URIs
    'GET::/api/hello',
];
const localAuthURLs = [
    'POST::/api/auth/login',
];

module.exports = {
    guestURLs,
    localAuthURLs,
};
