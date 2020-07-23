const bcryptjs = require("bcryptjs"); // << add this line for hashing
const jwt = require("jsonwebtoken"); // <<<<< install the library
const router = require("express").Router();
const usersHelper = require('../users/userModel')
const { isValid } = require('../users/users-service')


function makeJwt(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };

    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret, options);
}



router.post('/register', (req, res) => {
    
    const credentials = req.body
    // console.log(credentials)

    if (isValid(credentials)) {
        //hash and slash that password
        const hash = bcryptjs.hashSync(credentials.password, 8)
        credentials.password = hash

        //save user to DB
        usersHelper.register(credentials)
            .then(user => {
                const token = makeJwt(user)

                res.status(200).json({ data: user, token })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ errMessage: err.message })
            })

    } else {
        res.status(400).json({
            errMessage:
                'please provide username and password - the password shoud be alphanumeric'
        })
    }
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        usersHelper.login({ username: username })
            .then(([user]) => {
                console.log("user", user);
                // compare the password the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({ message: "Welcome to our API", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

router.get('/logout', (req, res) => {
    if (req.token) {
        console.log(token)
       return req.token.destroy()
    } else {
        res.status(200).json({message: 'you have been logged out already'})
    }
})





module.exports = router