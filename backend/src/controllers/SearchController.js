const axios = require('axios');
const Dev = require('../models/Dev');
const parseTechsToString = require('../utils/parseTechs');

module.exports = {
    // index
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseTechsToString(techs);
        
        // console.log(techsArray);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 100000,
                },
            }
        });

        return response.json(devs);
    },
}