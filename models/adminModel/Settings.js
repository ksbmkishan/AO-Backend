const mongoose = require('mongoose');


const masterImageSchema = mongoose.Schema(
    {
      name:{
        type: String,
        required: true
      },

      image: {
        type: String,
        default: null
      }
    },
    { _id: true } // enable creating an _id for each subdocument
  );


  const socailLinkSchema = mongoose.Schema({
    name:{
        type: String,
        requried: true
    },

    link: {
        type: String,
        default: null
    }
  },
  { _id: true }
)


const thirdPartyPackageSchema = mongoose.Schema({
    name:{
        type: String,
        default: null,
        required: true
    },

    key: {
        type: String,
        default: null,
        required: true,
    }
},
{_id: true});


const settingSchema = new mongoose.Schema({
    socailLink:[socailLinkSchema],
    masterImage: [masterImageSchema],
    thirdPartyPackage:[thirdPartyPackageSchema],
    siteDetails: {
        mobileNumber:{
            type: String,
            default: null
        },
        email:{
            type: String,
            default: null
        },
        address:{
            type: String,
            default: null
        }
    }
  
},{ collection: 'Setting', timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
