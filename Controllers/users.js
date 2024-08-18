const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.signupUser = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next();
            }
            else {
                req.flash("success", "Welcome to Wanderlust!");
                res.redirect("/listings");
            }
        })
    }
    catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req, res) => {
    res.render("./users/login.ejs");
}

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");

    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
        else {
            req.flash("success", "Your are logged out now!")
            res.redirect("/listings");
        }
    })
}