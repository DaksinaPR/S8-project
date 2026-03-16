const Application = require('../models/Application');

const getPublicData = async (req, res) => {
    try {
        // Fetch minimal fields
        const applications = await Application.find({}, '_id businessName address user');

        let companies = [];
        let states = new Set();
        let citiesByState = {};

        applications.forEach(app => {
            if (app.address) {
                const parts = app.address.split(', ');
                if (parts.length >= 3) {
                    const city = parts[1];
                    const statePin = parts[2].split(' - ');
                    const state = statePin[0];

                    states.add(state);
                    if (!citiesByState[state]) citiesByState[state] = new Set();
                    citiesByState[state].add(city);

                    companies.push({
                        _id: app._id,
                        businessName: app.businessName,
                        state: state,
                        city: city,
                        entrepreneurId: app.user
                    });
                }
            }
        });

        res.json({
            companies,
            states: Array.from(states),
            citiesByState: Object.fromEntries(
                Object.entries(citiesByState).map(([k, v]) => [k, Array.from(v)])
            )
        });

    } catch (error) {
        console.error("Public data error", error);
        res.status(500).json({ message: 'Error fetching public data' });
    }
};

module.exports = { getPublicData };
