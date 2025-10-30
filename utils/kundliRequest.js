const axios = require('axios');
const { postRequest } = require('../utils/apiRequests')
const https = require('https');
// const https = require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

class KundliRequest {
    constructor(apiUrl, apiKey) {
        this.api_url = apiUrl;
        this.key = apiKey;
    }

    postRequest = async ({ url = null, data = null, header = 'json' }) => {
        try {
            const credentials = `${626422}:${'f65e0f3730fd98faaba3ad82052af7df'}`;
            const token = btoa(credentials);
    
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Basic ${token}`);
    
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            return responseData;
        } catch (e) {
            console.error(e);
            return null;
        }
    };
    

    getKundliData = async (data, end_point) => {
        try {
            const response = await this.postRequest({
                url: `https://json.astrologyapi.com/v1/${end_point}`,
                data: data,
            })

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch planet positions");
        }
    }





    
    getKundliChart = async (data, end_point) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/charts/getLagnaChart`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch get all Lagna Chart");
        }
    }

    getAllPlanetData = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/planet/getAllPlanetData`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch planet positions");
        }
    }

    getAllUpgrahaData = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/planet/getAllUpgrahaData`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch graha Data");
        }
    }

    getDashamBhavMadhyaData = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/planet/getDashamBhavMadhyaData`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Dasham BhavMadhya Data");
        }
    }

    getAshtakVargaData = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/planet/getAshtakVargaData`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all get Ashtak Varga Data");
        }
    }

    getSarvashtakData = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/planet/getSarvashtakData`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all get Sarvashtak Data");
        }
    }

    getTransitData = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/planet/getTransitData`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Transit Data");
        }
    }

    getKundliChart = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/charts/getLagnaChart`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch get all Lagna Chart");
        }
    }


    // 1) kalsharpDoshaAnalysis
    kalsharpDoshaAnalysis = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/dosha/kalsharpDoshaAnalysis`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch kalsharp Dosha Analysis");
        }
    }

    // 2) pitriDoshaAnalysis
    pitriDoshaAnalysis = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/dosha/pitriDoshaAnalysis`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch pitri Dosha Analysis");
        }
    }

    // 3) getShashtymshaChart
    mangalDoshaAnalysis = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/dosha/mangalDoshaAnalysis`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch mangal Dosha Analysis");
        }
    }

    // 4) getShashtymshaChart
    sadhesatiAnalysis = async (data, token) => {
        try {
            const response = await this.postRequest({
                url: `https://api.shivampredictionkundali.com/v1/dosha/sadhesatiAnalysis`,
                data: data,
                token: token
            });

            console.log(response)

            if (!response) {
                return null
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch sadhesati Analysis");
        }
    }
    //************************* Dasha end *********************************

}



const apiUrl = process.env.API_URL || 'http://3.129.168.130:4001/api-docs/';
const apiKey = process.env.API_KEY || 'cbd2a0f2-9f51-47a4-b8c5-c926f9deadf9';

exports.KundliRequest = new KundliRequest(apiUrl, apiKey);
