const guestURLs = [
    // Auth URIs
    'POST::/api/auth/register',
    'POST::/api/auth/forgot-password',
    'POST::/api/auth/reset-password',
    'POST::/api/auth/login/social',
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
