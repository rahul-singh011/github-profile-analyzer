
const computeInsights = (repos) =>{
    if(!repos || repos.length == 0){
        return {
            total_stars: 0,
            most_used_language: null,
            most_starred_repo: null
        };
    }

    let totalStars = 0;
    let mostStarredRepo = 0;
    let maxStars = -1;

    const languageCount = {};

    for (const repo of repos){
        totalStars += repo.stargazers_count;
        
        if(repo.stargazers_count > maxStars){
            maxStars = repo.stargazers_count;
            mostStarredRepo = repo.name;
        }

        if(repo.language){
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
    }

    let mostUsedLanguage = null;
    let maxCount = 0;

    for(const [language , count] of Object.entries(languageCount)){
        if(count > maxCount){
            maxCount = count;
            mostUsedLanguage = language
        }
    }

    return {
        total_stars: totalStars,
        most_used_language: mostUsedLanguage,
        most_starred_repo: mostStarredRepo
    };
};

module.exports = computeInsights;