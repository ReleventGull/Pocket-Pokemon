const client = require('./index')


const createExperienceRate = async (name) => {
    try {
    const {rows: [result]} = await client.query(`
    INSERT INTO experience (name)
    VALUES ($1)
    RETURNING *;
    `, [name])
    return result
    }catch(error) {
        console.error("There was an error creating the experience", error)
        throw error
    }
}

const createLevels = async({ exp, level, experience_rate_id}) => {
    try {
        const {rows: [levels]} = await client.query(`
        INSERT INTO levels (exp, level, experience_rate_id) 
        VALUES($1, $2, $3)
        RETURNING *;
        `, [exp, level, experience_rate_id])
        return levels
    }catch(error) {
        console.error("There was an error creating the levels", error)
        throw error
    }
}

const getAllLevels = async () => {
    try {
    const {rows: levels} = await client.query(`
    SELECT experience.*, levels.*
    FROM experience
    JOIN levels ON experience.id=levels.experience_rate_id;
    `)
    let levelArray = []
    let levelObject = {}
    for(let i = 0; i < levels.length; i++) {
        if (!levelObject.name) {
            levelObject.name = levels[i].name
            levelObject.levels = []
        }
        if (levelObject.name !== levels[i].name) {
            levelArray.push(levelObject)
            levelObject = {}
            i--
            continue
        }
        levelObject.levels.push({
            exp: levels[i].exp,
            lvl: levels[i].level
        })
        if (i == levels.length - 1) {
            levelArray.push(levelObject)
        }
    }
       return levelArray
    
    }catch(error) {
        console.error("There was an error getting all the levels", error)
        throw error
    }
}

const getExperienceRate = async (name) => {
    try {
        
        const {rows: [experience]} = await client.query(`
        SELECT id FROM experience
        WHERE name=$1;
        `, [name])
        return experience
    }catch(error) {
        console.error("There was an error getting the levels by name", error)
        throw error
    }
}


module.exports = {
    createExperienceRate,
    createLevels,
    getAllLevels,
    getExperienceRate
}
