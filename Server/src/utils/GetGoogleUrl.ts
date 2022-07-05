import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URL } from "./getEnv"

const getGoogleOAuthURL = () =>{

    const rootUri = "https://accounts.google.com/o/oauth2/v2/auth"

    const options = {
        redirect_uri  : GOOGLE_REDIRECT_URL,
        client_id : GOOGLE_CLIENT_ID ,
        access_type : 'offline',
        response_type : 'code',
        prompt :'consent',
        scope :[
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(" ")
    }
    
    const qs = new URLSearchParams(options)

    return `${rootUri}?${qs.toString()}`
}

export default getGoogleOAuthURL