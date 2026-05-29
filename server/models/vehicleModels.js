import mongoose, { Schema } from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Vehicle name cannot exceed 100 characters"],
    },
    description: { 
        type: String, 
        required: false,
        maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    brand: { 
        type: String, 
        required: false,
        trim: true,
        index: true
    },
    price: { 
        type: Number, 
        required: true, 
        default: 0,
        min: [0, "Price cannot be negative"],
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: "Price must be a positive number"
        }
    },
    year: { type: String, required: false },
    vehicleType: {
      type: String,
      enum: ["Car", "SUV", "Truck", "Pick-up", "Van", "Motorcycle", "Bus", "Minivan"],
      required: false,
      index: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: false,
    },
    transmission: { 
        type: String, 
        enum: ["Automatic", "Manual", "CVT", "Semi-automatic", "Dual-clutch"],
        required: true
    },
    engineSize: { 
        type: String,
        match: [/^\d+(\.\d+)?(L|cc)$/, "Please enter valid engine size (e.g., 2.0L or 2000cc)"]
    },
    horsepower: { 
        type: Number,
        min: [0, "Horsepower cannot be negative"]
    },
    
    images: {
      type: [String],
      required: false,
    //   validate: [(arr) => arr.length <= 6, "Maximum 6 images allowed"],
        validate: {
            validator: function(images) {
                return images.length >= 1 && images.length <= 8;
            },
            message: "At least 1 and maximum 8 images allowed per vehicle"
        }
    },
    avatar: { type: String, required: false },
    doors: { 
        type: Number, 
        required: false,
        min: [1, "At least 1 door required"],
        max: [6, "Maximum 6 doors"],
    },
    seats: { 
        type: Number, 
        required: false,
        min: [1, "At least 1 seat required"],
        max: [50, "Maximum 50 seats"]
    },
    condition: { 
        type: String, 
        enum: ["New", "Used", "CPO", "Refurbished", "Salvage"],
        required: true,
        index: true
    },
    mileage: { 
        type: Number,
        min: [0, "Mileage cannot be negative"],
        required: function() {
            return this.condition === "Used";
        },
        comment: "Mileage in kilometers/miles"
    },
    accidentHistory: { 
        type: Boolean, 
        default: false 
    },
    serviceHistory: { 
        type: Boolean, 
        default: false 
    },
    warranty: { 
        type: String,
        enum: ["None", "3 months", "6 months", "1 year", "2 years", "3 years", "5 years"]
    },
    features: [{
        type: String,
        enum: ["Air Conditioning", "Power Steering", "Airbags", "ABS", "GPS", "Sunroof", 
               "Leather Seats", "Bluetooth", "Backup Camera", "Keyless Entry", "Cruise Control",
               "Heated Seats", "Apple CarPlay", "Android Auto", "Parking Sensors", "ESC"]
    }],
    exteriorColor: { 
        type: String,
        enum: ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", "Other"]
    },
    interiorColor: { 
        type: String,
        enum: ["Black", "Beige", "Gray", "Red", "Brown", "White", "Other"]
    },
    
    listed: { type: Boolean, required: true, default: true, index: true },
    ratings: { 
        type: Number, 
        default: 0,
        min: 0,
        max: 5
    },
    featured: { 
        type: Boolean, 
        default: false 
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    viewCount: { 
        type: Number, 
        default: 0,
        min: 0
    },
    inquiryCount: { 
        type: Number, 
        default: 0,
        min: 0
    },
    category: { 
        type: String,
        enum: ["Luxury", "Economy", "Family", "Sports", "Off-road", "Commercial", "Eco-friendly"],
        index: true
    },
    tags: [{
        type: String,
        lowercase: true,
        trim: true
    }],
  },
  {
    timestamps: true,
  },
);

vehicleSchema.pre('save', function(next) {
    // Set first image as avatar if not specified and images exist
    if (!this.avatar && this.images && this.images.length > 0) {
        this.avatar = this.images[0];
    }
    next();
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
