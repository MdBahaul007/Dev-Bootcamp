import mongoose from "mongoose";
import slugify from "slugify";
import geocoder from "../utils/geocoder.js";

const Bootcamp = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
    maxlength: [50, "Name cannot exceed more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"], //enum is a way to restrict a field so it only accepts specific values.
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// creating a slug which is in our modal from the name before adding the data in mongo db --- slug ex name is Mohd Bahaul slug will make as mohd-bahaul
// pre post are hooks or the mongo db middleware
Bootcamp.pre("save", function (next) {
  console.log(this.name);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// so I will run the the api for ex get-all-bootcamp below function will bring the record which has name AI Innovators Academyy
// Bootcamp.pre("find", function (next) {
//   console.log("innnnnnnnn");
//   const out = this.where({ name: "AI Innovators Academyy" });
//   console.log("out", out);
//   next();
// });

Bootcamp.pre("save", async function (next) {
  console.log("imnnnnnnn");

  const location = await geocoder.geocode(this.address);
  console.log("location", location);
});
export default mongoose.model("Bootcamp", Bootcamp);
