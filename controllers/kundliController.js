const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Types;
const multer = require("multer");
const configureMulter = require("../configureMulter"); // Path to your multer configuration
const Kundli = require("../models/customerModel/Kundli");
// const KundliRequest = require("../utils/kundliRequest");
const { KundliRequest } = require("../utils/kundliRequest");
// const Customers = require("../models/customerModel/Customers")
const svgToImg = require('svg-to-img');
const svg2img = require('svg2img');
const fs = require('fs');
const cheerio = require('cheerio');
const moment = require('moment');

// exports.addKundli = async (req, res) => {
//     try {
//         const {
//             customerId,
//             name,
//             gender,
//             dob,
//             tob,
//             place,
//             lat,
//             lon,
//         } = req.body;

//         if (!customerId || !name || !gender || !dob || !tob || !place || !lat || !lon) {
//             res.status(200).json({
//                 success: false,
//                 message: "All fields are required.",
//             });
//         }

//         if (!mongoose.Types.ObjectId.isValid(customerId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid customerId" });
//         }

//         const getKundli = await Kundli.find({customerId,name})

//         if(getKundli){

//             return res.status(200).json({
//                 success: false,
//                 message: `${name} is already exist, please choose other name`
//             })

//         }

//         const newKundli = new Kundli({
//             customerId,
//             name,
//             gender,
//             dob,
//             tob,
//             place,
//             lat,
//             lon,
//         });

//         await newKundli.save();

//         res.status(200).json({
//             success: true,
//             message: "Customers kundli added successfully",
//             kundli: newKundli,
//         });
//     } catch (error) {
//         // console.error("Error adding Customer's kundli:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to add Customer's kundli",
//             error: error.message,
//         });
//     }
// };




exports.addKundli = async (req, res) => {
    try {
        const {
            customerId,
            name,
            gender,
            dob,
            tob,
            place,
            lat,
            lon,
        } = req.body;

        // Validate required fields
        if (!customerId || !name || !gender || !dob || !tob || !place || !lat || !lon) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Validate customerId format
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ success: false, message: "Invalid customerId" });
        }

        // Check if Kundli already exists
        // const existingKundli = await Kundli.findOne({ customerId, name });
        // if (existingKundli) {
        //     return res.status(400).json({
        //         success: false,
        //         message: `${name} already exists, please choose a different name.`,
        //     });
        // }

        // Create new Kundli
        const newKundli = new Kundli({
            customerId,
            name,
            gender,
            dob,
            tob,
            place,
            lat,
            lon,
        });

        await newKundli.save();

        // Success response
        return res.status(201).json({
            success: true,
            message: "Customer's Kundli added successfully",
            kundli: newKundli,
        });
    } catch (error) {
        console.error("Error adding Customer's Kundli:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add Customer's Kundli",
            error: error.message,
        });
    }
};


exports.getAllKundli = async function (req, res) {
    try {
        const allKundli = await Kundli.find().sort({_id: -1});

        res.status(200).json({ success: true, allKundli });
    } catch (error) {
        console.error("Error fetching all Kundli:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Kundli",
            error: error.message,
        });
    }
};

exports.getCustomerKundli = async function (req, res) {
    try {
        const { customerId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid customerId" });
        }

        const kundli = await Kundli.find({ customerId }).sort({_id: -1});

        res.status(200).json({
            success: true,
            message: "Customer Kundlis:",
            kundli,
        });
    } catch (error) {
        console.error("Error fetching Customer Kundlis:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Customer Kundlis",
            error: error.message,
        });
    }
};

exports.deleteKundli = async function (req, res) {
    try {
        const { kundliId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(kundliId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid kundliId" });
        }
        const deletedKundli = await Kundli.findByIdAndDelete(kundliId);

        if (!deletedKundli) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Kundli deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting Kundli by ID:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Kundli",
            error: error.message,
        });
    }
};

//****************************Planet api start*********************************

exports.getKundliDetails = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const birthDetails = await KundliRequest.getKundliData(data, 'birth_details');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: birthDetails,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getKundliBasicDetails = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: kundliData,
            payload: data
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getPlanets = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const planets = await KundliRequest.getKundliData(data, 'planets');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: planets,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getKpPlanets = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const kpPlanets = await KundliRequest.getKundliData(data, 'kp_planets');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: kpPlanets,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getAstroDetails = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const astroDetails = await KundliRequest.getKundliData(data, 'astro_details');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: astroDetails,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getCurrentVDasha = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const currentVDasha = await KundliRequest.getKundliData(data, 'current_vdasha');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: currentVDasha,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getNumeroTable = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const numeroTable = await KundliRequest.getKundliData(data, 'numero_table');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: numeroTable,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getGeneralAscendantReport = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const generalAscendantReport = await KundliRequest.getKundliData(data, 'general_ascendant_report');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: generalAscendantReport,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getMajorVDasha = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const majorVDasha = await KundliRequest.getKundliData(data, 'major_vdasha');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: majorVDasha,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getSubVDasha = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const subVDasha = await KundliRequest.getKundliData(data, 'sub_vdasha/:md');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: subVDasha,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.matchAshtakootPoints = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const matchAshtakootPoints = await KundliRequest.getKundliData(data, 'match_ashtakoot_points');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: matchAshtakootPoints,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getGeoDetails = async (req, res) => {
    try {
        const { place, maxRows } = req.body;

        // const kundliData = await Kundli.findById(kundliId);
        // if (!kundliData) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Kundli not found.",
        //     });
        // }

        const data = {

            place: place,
            maxRows: maxRows
        };

        const geoDetails = await KundliRequest.getKundliData(data, 'geo_details');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: geoDetails,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getTimezoneWithDst = async (req, res) => {
    try {
        const { latitude, longitude, date } = req.body;

        // const kundliData = await Kundli.findById(kundliId);
        // if (!kundliData) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Kundli not found.",
        //     });
        // }

        const data = {
            latitude: latitude,
            longitude: longitude,
            date: date
        };

        const timezoneWithDst = await KundliRequest.getKundliData(data, 'timezone_with_dst');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: timezoneWithDst,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getGeneralHouseReport = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const [
            sun,
            moon,
            mars,
            mercury,
            jupiter,
            venus,
            saturn
        ] = await Promise.all([
            KundliRequest.getKundliData(data, 'general_house_report/:sun'),
            KundliRequest.getKundliData(data, 'general_house_report/:moon'),
            KundliRequest.getKundliData(data, 'general_house_report/:mars'),
            KundliRequest.getKundliData(data, 'general_house_report/:mercury'),
            KundliRequest.getKundliData(data, 'general_house_report/:jupiter'),
            KundliRequest.getKundliData(data, 'general_house_report/:venus'),
            KundliRequest.getKundliData(data, 'general_house_report/:saturn')
        ]);


        res.status(200).json({
            success: true,
            message: "All chart data fetched successfully",
            chart: {
                sun,
                moon,
                mars,
                mercury,
                jupiter,
                venus,
                saturn
            },
        });
    } catch (error) {
        console.error("Error fetching all chart data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all chart data",
            error: error.message,
        });
    }
};

exports.getKpHouseCusps = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const kpHouseCusps = await KundliRequest.getKundliData(data, 'kp_house_cusps');

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: kpHouseCusps,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getHoroChartImage = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const [
            ChalitChart,
            SunChart,
            MoonChart,
            D1Chart,
            D2Chart,
            D3Chart,
            D4Chart,
            D5Chart,
            D7Chart,
            D8Chart,
            D9Chart,
            D10Chart,
            D12Chart,
            D16Chart,
            D20Chart,
            D24Chart,
            D27Chart,
            D30Chart,
            D40Chart,
            D45Chart,
            D60Chart
        ] = await Promise.all([
            KundliRequest.getKundliData(data, 'horo_chart_image/:chalit'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:SUN'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:MOON'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D1'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D2'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D3'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D4'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D5'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D7'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D8'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D9'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D10'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D12'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D16'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D20'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D24'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D27'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D30'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D40'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D45'),
            KundliRequest.getKundliData(data, 'horo_chart_image/:D60')
        ]);


        res.status(200).json({
            success: true,
            message: "All chart data fetched successfully",
            chart: [
                { data: ChalitChart, name: 'ChalitChart' },
                { data: MoonChart, name: 'MoonChart' },
                { data: SunChart, name: 'SunChart' },
                { data: D1Chart, name: 'D1Chart' },
                { data: D2Chart, name: 'D2Chart' },
                { data: D3Chart, name: 'D3Chart' },
                { data: D4Chart, name: 'D4Chart' },
                { data: D5Chart, name: 'D5Chart' },
                { data: D7Chart, name: 'D7Chart' },
                { data: D8Chart, name: 'D8Chart' },
                { data: D9Chart, name: 'D9Chart' },
                { data: D10Chart, name: 'D10Chart' },
                { data: D12Chart, name: 'D12Chart' },
                { data: D16Chart, name: 'D16Chart' },
                { data: D20Chart, name: 'D20Chart' },
                { data: D24Chart, name: 'D24Chart' },
                { data: D27Chart, name: 'D27Chart' },
                { data: D30Chart, name: 'D30Chart' },
                { data: D40Chart, name: 'D40Chart' },
                { data: D45Chart, name: 'D45Chart' },
                { data: D60Chart, name: 'D60Chart' }
            ]
        });
    } catch (error) {
        console.error("Error fetching all chart data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all chart data",
            error: error.message,
        });
    }
};

exports.getHoroChart = async (req, res) => {
    try {
        const { kundliId, chartId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const chart = await KundliRequest.getKundliData(data, `horo_chart/:${chartId}`);
    
        res.status(200).json({
            success: true,
            message: "All chart data fetched successfully",
            chart
        });
    } catch (error) {
        console.error("Error fetching all chart data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all chart data",
            error: error.message,
        });
    }
};

exports.getGeneralRashi = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const [
            moon, mars, mercury, jupiter, venus, saturn
        ] = await Promise.all([
            KundliRequest.getKundliData(data, 'general_rashi_report/:moon'),
            KundliRequest.getKundliData(data, 'general_rashi_report/:mars'),
            KundliRequest.getKundliData(data, 'general_rashi_report/:MOON'),
            KundliRequest.getKundliData(data, 'general_rashi_report/:mercury'),
            KundliRequest.getKundliData(data, 'general_rashi_report/:jupiter'),
            KundliRequest.getKundliData(data, 'general_rashi_report/:venus'),
            KundliRequest.getKundliData(data, 'general_rashi_report/:saturn'),
        ]);


        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            general_rashi: {
                moon,
                mars,
                mercury,
                jupiter,
                venus,
                saturn
            },
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};

exports.getGhatChakra = async (req, res) => {
    try {
        const { kundliId } = req.body;

        const kundliData = await Kundli.findById(kundliId);
        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const data = {
            day: parseInt(moment(kundliData.dob).format('D')),
            month: parseInt(moment(kundliData.dob).format('M')),
            year: parseInt(moment(kundliData.dob).format('YYYY')),
            hour: parseInt(moment(kundliData.tob).format('hh')),
            min: parseInt(moment(kundliData.tob).format('mm')),
            lat: kundliData.lat,
            lon: kundliData.lon,
            tzone: 5.5,
        };

        const [
            ghat_chakra
        ] = await Promise.all([
            KundliRequest.getKundliData(data, 'ghat_chakra')
        ]);


        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            ghat_chakra: {
                ghat_chakra
            },
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};





























exports.getAllUpgrahaData = async (req, res) => {
    try {
        const { kundliId, token } = req.body;

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);

        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        // console.log(data);

        const getAllUpgrahaData = await KundliRequest.getAllUpgrahaData(data, token);

        res.status(200).json({
            success: true,
            message: "Planet position fetched successfully",
            data: getAllUpgrahaData,
        });
    } catch (error) {
        console.error("Error fetching planet positions:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch planet positions",
            error: error.message,
        });
    }
};


exports.getDashamBhavMadhyaData = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getDashamBhavMadhyaData = await KundliRequest.getDashamBhavMadhyaData(data, token);

        res.status(200).json({
            success: true,
            message: "Upgraha data fetched successfully",
            data: getDashamBhavMadhyaData,
        });

        // console.log(getDashamBhavMadhyaData);

    } catch (error) {
        console.error("Error fetching all Dasham BhavMadhya Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch All Dasham BhavMadhya Data",
            error: error.message,
        });
    }
};

exports.getAshtakVargaData = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getAshtakVargaData = await KundliRequest.getAshtakVargaData(data, token);

        res.status(200).json({
            success: true,
            message: "AshtakVarga data fetched successfully",
            data: getAshtakVargaData,
        });

        // console.log(getDashamBhavMadhyaData);

    } catch (error) {
        console.error("Error fetching all Dasham BhavMadhya Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch All Dasham BhavMadhya Data",
            error: error.message,
        });
    }
};

exports.getSarvashtakData = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getSarvashtakData = await KundliRequest.getSarvashtakData(data, token);

        res.status(200).json({
            success: true,
            message: "Sarvashtak Data fetched successfully",
            data: getSarvashtakData,
        });

        // console.log(getAshtakVargaData);

    } catch (error) {
        console.error("Error fetching all get Sarvashtak Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch All get Sarvashtak Data",
            error: error.message,
        });
    }
};

exports.getTransitData = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getTransitData = await KundliRequest.getTransitData(data, token);

        res.status(200).json({
            success: true,
            message: "Transit Data fetched successfully",
            data: getTransitData,
        });

        // console.log(getTransitData);

    } catch (error) {
        console.error("Error fetching get all Transit Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Transit Data",
            error: error.message,
        });
    }
};

//****************************Planet api end**********************************

//****************************Chart api start*********************************
exports.getLagnaChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getLagnaChart = await KundliRequest.getLagnaChart(data, token);

        res.status(200).json({
            success: true,
            message: "Lagna Chart fetched successfully",
            data: getLagnaChart,
        });

        // console.log(getLagnaChart);

    } catch (error) {
        console.error("Error fetching all Lagna Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Lagna Chart Data",
            error: error.message,
        });
    }
};

exports.getMoonChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getMoonChart = await KundliRequest.getMoonChart(data, token);

        res.status(200).json({
            success: true,
            message: "Moon Chart Data fetched successfully",
            data: getMoonChart,
        });

        // console.log(getMoonChart);

    } catch (error) {
        console.error("Error fetching all Moon Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Moon Chart Data",
            error: error.message,
        });
    }
};

exports.getSunChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getSunChart = await KundliRequest.getSunChart(data, token);

        res.status(200).json({
            success: true,
            message: "Sun Chart Data fetched successfully",
            data: getSunChart,
        });

        // console.log(getSunChart);

    } catch (error) {
        console.error("Error fetching get all Sun Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Sun Chart Data",
            error: error.message,
        });
    }
};

exports.getChalitChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getChalitChart = await KundliRequest.getChalitChart(data, token);

        res.status(200).json({
            success: true,
            message: "Chalit Chart Data fetched successfully",
            data: getChalitChart,
        });

        // console.log(getChalitChart);

    } catch (error) {
        console.error("Error fetching get all Chalit Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Chalit Chart Data",
            error: error.message,
        });
    }
};

exports.getHoraChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getHoraChart = await KundliRequest.getHoraChart(data, token);

        res.status(200).json({
            success: true,
            message: "Hora Chart Data fetched successfully",
            data: getHoraChart,
        });

        // console.log(getTransitData);

    } catch (error) {
        console.error("Error fetching get all Hora Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Hora Chart Data",
            error: error.message,
        });
    }
};

exports.getDreshkanChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getDreshkanChart = await KundliRequest.getDreshkanChart(data, token);

        res.status(200).json({
            success: true,
            message: "Dreshkan Chart Data fetched successfully",
            data: getDreshkanChart,
        });

        // console.log(getDreshkanChart);

    } catch (error) {
        console.error("Error fetching get all Dreshkan Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Dreshkan Chart Data",
            error: error.message,
        });
    }
};

exports.getNavamanshaChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getNavamanshaChart = await KundliRequest.getNavamanshaChart(data, token);

        res.status(200).json({
            success: true,
            message: "Navamansha Chart Data fetched successfully",
            data: getNavamanshaChart,
        });

        // console.log(getNavamanshaChart);

    } catch (error) {
        console.error("Error fetching get all Navamansha Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Navamansha Chart Data",
            error: error.message,
        });
    }
};

exports.getDashamanshaChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getDashamanshaChart = await KundliRequest.getDashamanshaChart(data, token);

        res.status(200).json({
            success: true,
            message: "Dashamansha Chart Data fetched successfully",
            data: getDashamanshaChart,
        });

        // console.log(getDashamanshaChart);

    } catch (error) {
        console.error("Error fetching get all Dashamansha Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Dashamansha Chart Data",
            error: error.message,
        });
    }
};

exports.getDwadashamanshaChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getDwadashamanshaChart = await KundliRequest.getDwadashamanshaChart(data, token);

        res.status(200).json({
            success: true,
            message: "Dwadashamansha Chart Data fetched successfully",
            data: getDwadashamanshaChart,
        });

        // console.log(getDwadashamanshaChart);

    } catch (error) {
        console.error("Error fetching get all Dwadashamansha Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Dwadashamansha Chart Data",
            error: error.message,
        });
    }
};

exports.getTrishamanshaChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;


        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getTrishamanshaChart = await KundliRequest.getTrishamanshaChart(data, token);

        res.status(200).json({
            success: true,
            message: "Trishamansha Chart Data fetched successfully",
            data: getTrishamanshaChart,
        });

        // console.log(getTrishamanshaChart);

    } catch (error) {
        console.error("Error fetching get all Trishamansha Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Trishamansha Chart Data",
            error: error.message,
        });
    }
};

exports.getShashtymshaChart = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;


        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const getShashtymshaChart = await KundliRequest.getShashtymshaChart(data, token);

        res.status(200).json({
            success: true,
            message: "Shashtymsha Chart Data fetched successfully",
            data: getShashtymshaChart,
        });

        // console.log(getShashtymshaChart);

    } catch (error) {
        console.error("Error fetching get all Shashtymsha Chart Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all Shashtymsha Chart Data",
            error: error.message,
        });
    }
};

// kalsharpDoshaAnalysis
exports.kalsharpDoshaAnalysis = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;


        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const kalsharpDoshaAnalysis = await KundliRequest.kalsharpDoshaAnalysis(data, token);

        res.status(200).json({
            success: true,
            message: "kalsharp Dosha Analysis Data fetched successfully",
            data: kalsharpDoshaAnalysis,
        });

        // console.log(getShashtymshaChart);

    } catch (error) {
        console.error("Error fetching kalsharp Dosha Analysis Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch  kalsharp Dosha Analysis Data",
            error: error.message,
        });
    }
};

// kalsharpDoshaAnalysis
exports.pitriDoshaAnalysis = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;


        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const pitriDoshaAnalysis = await KundliRequest.pitriDoshaAnalysis(data, token);

        res.status(200).json({
            success: true,
            message: "pitri Dosha Analysis Data fetched successfully",
            data: pitriDoshaAnalysis,
        });

        // console.log(pitriDoshaAnalysis);

    } catch (error) {
        console.error("Error fetching pitri Dosha Analysis Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pitri Dosha Analysis Data",
            error: error.message,
        });
    }
};

exports.mangalDoshaAnalysis = async (req, res) => {
    try {
        const { kundliId, token } = req.body;

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;


        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const mangalDoshaAnalysis = await KundliRequest.mangalDoshaAnalysis(data, token);

        res.status(200).json({
            success: true,
            message: "mangal Dosha Analysis Data fetched successfully",
            data: mangalDoshaAnalysis,
        });

        // console.log(mangalDoshaAnalysis);

    } catch (error) {
        console.error("Error fetching mangal Dosha Analysis Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch mangal Dosha Analysis Data",
            error: error.message,
        });
    }
};

// kalsharpDoshaAnalysis
exports.sadhesatiAnalysis = async (req, res) => {
    try {
        const { kundliId, token } = req.body;
        // console.log(kundliId);

        const kundliData = await Kundli.findById(kundliId);

        if (!kundliData) {
            return res.status(404).json({
                success: false,
                message: "Kundli not found.",
            });
        }

        const dob = new Date(kundliData.dob);
        let hour, minute;
        const tobString = kundliData.tob;
        if (tobString) {
            const tobParts = tobString.split(':');
            hour = parseInt(tobParts[0], 10);
            minute = parseInt(tobParts[1], 10);
        }

        if (isNaN(hour) || isNaN(minute)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time of birth format.",
            });
        }

        // Convert 24-hour format to 12-hour format if needed
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;


        const data = {
            name: kundliData.name,
            day: dob.getDate().toString(),
            month: (dob.getMonth() + 1).toString(),
            year: dob.getFullYear().toString(),
            hour: hour.toString(),
            min: minute.toString().padStart(2, '0'),
            place: kundliData.place,
            latitude: kundliData.lat.toString(),
            longitude: kundliData.long.toString(),
            timezone: "+5.5",
            gender: kundliData.gender,
            // apiKey: KundliRequest.key
        };

        const sadhesatiAnalysis = await KundliRequest.sadhesatiAnalysis(data, token);

        res.status(200).json({
            success: true,
            message: "sadhesati Analysis Data fetched successfully",
            data: sadhesatiAnalysis,
        });

        // console.log(sadhesatiAnalysis);

    } catch (error) {
        console.error("Error fetching sadhesati Analysis Data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch sadhesati Analysis Data",
            error: error.message,
        });
    }
};

//****************************Chart api end***********************************

// match making

exports.getmatch = async (req, res) => {
    const { customerId, gender } = req.body;
  
    try {
      // Validate required fields
      if (!customerId) {
        return res.status(400).json({
          success: false,
          message: 'Please provide customerId in the request body.'
        });
      }
  
      let query = {
        customerId: customerId,
      };
  
      // If gender is provided, add it to the query
      if (gender) {
        query.gender = gender;
      }
  
      // Find documents in Kundli collection matching the query
      const kundlis = await Kundli.find(query);
  
      if (!kundlis || kundlis.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No matching kundlis found for customerId ${customerId} and gender ${gender || 'all'}.`
        });
      }
  
      res.status(200).json({
        success: true,
        data: kundlis
      });
    } catch (error) {
      console.error('Error fetching kundli data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch kundlis.',
        error: error.message
      });
    }
  };