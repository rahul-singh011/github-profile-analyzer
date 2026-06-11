const pool = require("../config/db");
const {
  fetchGithubUser,
  fetchGithubRepos,
} = require("../services/github.service");
const computeInsights = require("../utils/computeInsights");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const isValidGithubUsername = require("../utils/validateUsername");

const analyzeProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if(!isValidGithubUsername(username)){
    throw new ApiError(400, 'Invalid Github username format')
  }
  
  const userData = await fetchGithubUser(username);
  const userRepo = await fetchGithubRepos(username);

  const insights = computeInsights(userRepo);

  const query = `
        INSERT INTO profiles (
          username, avatar_url, bio, public_repos, followers, following,
          total_stars, most_used_language, most_starred_repo, account_created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
             avatar_url = VALUES(avatar_url),
             bio = VALUES(bio),
             public_repos = VALUES(public_repos),
             followers = VALUES(followers),
             following = VALUES(following),
             total_stars = VALUES(total_stars),
             most_used_language = VALUES(most_used_language),
             most_starred_repo = VALUES(most_starred_repo)
         `;
         const values = [
            userData.login,
            userData.avatar_url,
            userData.bio,
            userData.public_repos,
            userData.followers,
            userData.following,
            insights.total_stars,
            insights.most_used_language,
            insights.most_starred_repo,
            new Date(userData.created_at).toISOString().slice(0, 19).replace('T', ' ')
          ];

          await pool.query(query, values);

          const [rows] = await pool.query('SELECT * FROM profiles WHERE username = ?', [username]);
        
          res.status(200).json(
            new ApiResponse(200, rows[0], 'Profile analyzed and saved successfully')
          );
});

const getAllProfiles = asyncHandler(async (req,res)=>{
  const [rows] = await pool.query('SELECT * FROM profiles ORDER BY analyzed_at DESC');

  res.status(200).json(
    new ApiResponse(200, rows, 'Profiles fetched successfully')
  );
});

const getProfileByUsername = asyncHandler(async (req,res)=>{

  const {username} = req.params;
  const [rows] = await pool.query('SELECT * FROM profiles WHERE username = ?', [username]) 

  if(rows.length == 0){
    throw new ApiError(404, `Profiles for ${username} not found in database`);
  }

  res.status(200).json(
    new ApiResponse(200, rows[0], 'Profile fetched successfully')
  );
});

module.exports = {analyzeProfile , getAllProfiles , getProfileByUsername}