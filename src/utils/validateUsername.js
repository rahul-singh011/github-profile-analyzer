
const GITHUB_USERNAME_REGEX = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

const isValidGithubUsername = (username)=>{
    return GITHUB_USERNAME_REGEX.test(username);
}

module.exports = isValidGithubUsername;