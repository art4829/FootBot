import axios from 'axios';
import { 
    API_KEY, 
    AMPLIFY_COORDS, 
    DEFAULT_RADIUS, 
    PLACE_API_BASE_URL, 
    PLACE_NEARBY, 
    PLACE_DETAILS, 
    FORMAT
} from '../constants/GoogleApiConstants'

const getPlaces = async (keyword, withinRadius = DEFAULT_RADIUS, office) => {
    const queryParams = {
        key: API_KEY,
        keyword: keyword,
        inputtype: 'textquery',
        fields: 'name',
        location: AMPLIFY_COORDS[office].join(','),
        radius: withinRadius,
        type: 'restaurant',
    }
    try {
        const response = await axios.get(`${PLACE_API_BASE_URL}/${PLACE_NEARBY}/${FORMAT}`, {params: queryParams})
        return response.data.results
    } catch (error) {
        console.log(error)
    }
}

const getPlaceDetails = async (placeId) => {
    const queryParams = {
        key: API_KEY,
        place_id: placeId,
    }
    try {
        const response = await axios.get(`${PLACE_API_BASE_URL}/${PLACE_DETAILS}/${FORMAT}`, {params: queryParams})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getFilteredPlaces = async (keyword, radius, price, office) => {
    const places = await getPlaces(keyword, radius, office)
    console.log('Base Places: ', places)

    const placeFilteredData = price != 0 ? places.filter(place => {
        return (price > 0 && place['price_level'] == price)
    }) : places

    const placeData = placeFilteredData.map(place => {
        const {place_id, name, price_level, rating} = place
        return {place_id, name, price_level, rating}
    })

    if (placeData.length === 0) { return [] }
    
    const placeDetails = await Promise.all(placeData.map(async place => {
        const response = await getPlaceDetails(place.place_id)
        const {website, formatted_address, formatted_phone_number, url, photos} = response.result
        return {website, formatted_address, formatted_phone_number, url, photos}
    }))
    
    // lacking a 'zipWith' function, and reluctant to import lodash for just that
    const allDetails = placeData.map((place, index) => {
        const allDetailsForPlace = Object.assign({}, place, placeDetails[index])
        return allDetailsForPlace
    })

    // sort by rating
    allDetails.sort((place1, place2) => place2.rating - place1.rating)

    return allDetails.slice(0,4)
}

export default getFilteredPlaces;
