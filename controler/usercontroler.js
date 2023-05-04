const addmovie = require('../model/moviemodel');
const Show = require('../model/show');
const Ticket = require('../model/ticket');
const usermodel = require('../model/usermodel')

module.exports.findex = async (req, res) => {
    let data = await addmovie.find({})
    return res.render('findex', { data: data })
}

module.exports.login = (req, res) => {
    return res.render('login')
}

module.exports.register = (req, res) => {
    return res.render('register')
}

module.exports.moviedatail = async (req, res) => {
    let data = await addmovie.findById(req.params.id)
    return res.render('moviedatail', {
        data: data
    })
}

module.exports.moviebook = async (req, res) => {
    let findMovie = await Show.find({
        movieID: req.params.id
    }).populate('mallID').exec();
    return res.render('movieshow', {
        data: findMovie
    })
}

module.exports.ticketBook = async (req, res) => {
    let findShow = await Show.findById(req.params.id).populate('movieID').exec();
    let seatBook = await Ticket.find({
        $and: [
            { showID: req.params.id },
            { time: req.query.time }
        ]
    });
    if (findShow) {
        let findTime = findShow.time.forEach(e => {
            if (e == req.query.time) {
                return res.render('moviebook', {
                    data: findShow,
                    time: req.query.time,
                    seat: seatBook
                });
            }
        })
    }
    else {
        console.log('can not find show')
        return res.redirect('back');
    }

}

module.exports.userregister = async (req, res) =>{
    console.log(req.body)
    let data = await usermodel.create(req.body)
    return res.redirect('/login')
}

module.exports.userlogin = (req,res) => {
    return res.redirect('/')
}

module.exports.seatBooking = async (req, res) => {
    req.body.userID = req.user.id;

    let letTicket = await Ticket.create(req.body);

    if (letTicket) {
        return res.redirect('/');
    }
    console.log('Can not book ticket');
    return res.redirect('back');
}

module.exports.userLogout = (req,res) => {
    req.logout((err) => {
        if(err)
        {
            console.log(err)
        }
        return res.redirect('/login')
    })
}