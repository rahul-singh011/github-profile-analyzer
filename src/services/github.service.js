

const axios = require('axios');
const ApiError = require('../utils/ApiError');

const GITHUB_API_BASE = 'https://api.github.com';

const fetchGithubUser = async (username) =>{
    try{
        const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
        return response.data;
    }catch(err){

        if(error.response && error.response.status === 404){
            throw new ApiError(404, `Github user '${username}' not found `);
        }
        throw new ApiError(500, 'Failed to fetch data from GitHub API');
    }
};

const fetchGithubRepos = async (username)=>{
    try{

        const response = await axios.get(
            `${GITHUB_API_BASE}/users/${username}/repo?per_page=100`
        );
        return response.data;

    }catch(err){
        throw new ApiError(500, 'Failed to fetch repositories from Github API');
    }
};

module.exports = {
    fetchGithubUser,
    fetchGithubRepos
}