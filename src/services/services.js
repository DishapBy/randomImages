import axios from "axios";

export const getImagesData = () => {

   axios.get('https://j0.wlmediahub.com/App_Themes/api/test/phtos.js')
        .then(res => {
            return res.data;
        })
}