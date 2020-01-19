const axios = require('axios');
const Dev = require('../models/Dev');
const parseTechsToString = require('../utils/parseTechs');

module.exports = {
    // index
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },
    // show
    async show(request, response) {
        const { github_username } = request.params;

        const dev = await Dev.findOne({ github_username });

        return response.json(dev);
    },
    
    // store
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const axios_response = await axios.get(`https://api.github.com/users/${github_username}`);
        
            let { name, bio, avatar_url} = axios_response.data;
            if (!name) {
                name = axios_response.data.login;
            }    
        
            const techsArray = parseTechsToString(techs); // techs.split(',').map(tech => tech.trim());
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,        
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    },

    // TODO: update
    async update(request, response) {
        const { github_username } = request.params;

        const { techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });    

        const dev = await Dev.find({
            github_username: github_username
        });

        return response.json(dev);
    },
    // TODO: destroy
    async destroy(request, response) {
        const { github_username } = request.params;

        const dev = await Dev.deleteOne({ github_username });

        return response.json(dev);
    },
}