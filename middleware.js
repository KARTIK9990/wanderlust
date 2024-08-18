const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to create listing!");
        return res.redirect("/login");
    }
    else {
        next();
    }
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this page!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        console.log(errorMsg);
        throw new ExpressError(400, errorMsg);
    }
    else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    console.log('Request Body:', req.body);
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        console.log('Validation Error:', errorMsg);
        return next(new ExpressError(400, errorMsg));
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}