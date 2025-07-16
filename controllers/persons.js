const { getPeople } = require('../repository/persons');

const getFamily = async (req, res) => {
    const family = await getPeople();
    if (!family) {
        res.json({ result: false, error: "No people found"})
    } else {
        res.json({result: true, family})
    }
}

module.exports = { getFamily };