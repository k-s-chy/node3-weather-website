const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VsaWtpbmciLCJhIjoiY2t2NTVjcXV2MHYxdjJubHVzMjczc3R6cCJ9.VgD26HE-Ld_bcNxaGuhv7A&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('error: cannot connect to service', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('error: unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode