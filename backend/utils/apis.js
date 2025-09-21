import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

export const getCoords = async(pincode) => {
   try {
    const res = await axios.get(
  `https://api.opencagedata.com/geocode/v1/json?q=${pincode},India&key=${OPENCAGE_API_KEY}`
    );
    if(res.data.results.length >0){
        const {lat , lng} = res.data.results[0].geometry
        return {latitude : lat , longitude : lng}
    }else {
        throw new Error('Coordinates not found for address')
    }
   } catch(error){
          console.error(error.message)
   throw error
   }
}

export const getLocationFromPincode = async(pincode) => {
    try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        if(res.data[0].Status === 'Success'){
            const postOffice = res.data[0].PostOffice[0]
            return{
                state:postOffice.State,
                district:postOffice.District
            }
        } else {
                throw new Error('Invalid pincode')
            }
    } catch (error) {
        console.error(error.message)
        throw error
    }
} 