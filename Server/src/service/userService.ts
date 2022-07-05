
import axios from "axios"
import qs from 'qs'
import { CLIENT_SECRET_PASSWORD, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URL } from "../utils/getEnv"


interface GoogleTokensResult {
    access_token : string;
    expires_in :Number;
    refresh_token: string;
    scope : string;
    id_token:string;
}

export const getGoogleOAuth =async ({code}:{code:string}) :Promise<GoogleTokensResult> => {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
        code,
        client_id : GOOGLE_CLIENT_ID,
        client_secret : CLIENT_SECRET_PASSWORD,
        redirect_uri :GOOGLE_REDIRECT_URL,
        grant_type : 'authorization_code'
    }

    try{
        const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values),{
            headers :{
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
        })
        return res.data
    }catch(error : any){
        console.error(error, "failed to fetch Google Oauth Tokens")
        throw new Error(error.message)
    }
}
