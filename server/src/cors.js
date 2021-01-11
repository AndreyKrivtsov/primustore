export default function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Access')
    res.setHeader('Access-Control-Allow-Credentials', true)

    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    }
    else next()
}