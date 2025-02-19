const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:{
      type:String,
      filename:String,
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  // console.log(listing);
  if(listing){
    let res = await Review.deleteMany({_id:{$in:listing.reviews}});
    console.log(res);
  }
})

const Listing = mongoose.model("Listing", listingSchema);


module.exports = Listing;
