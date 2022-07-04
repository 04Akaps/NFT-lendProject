import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URL } from "./getEnv"

const getGoogleOAuthURL = () =>{

    const options = {
        redirectUri  : GOOGLE_REDIRECT_URL as string,
        client_id : GOOGLE_CLIENT_ID as string,
        access_type : 'offline',
        response_type : 'code',
        prompt :'consent',
        scopes :[
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(" ")
    }
    
    console.log({options})

    const qs = new URLSearchParams(options)

    console.log({qs})

    return `${GOOGLE_REDIRECT_URL}?${qs.toString()}`
}

export default getGoogleOAuthURL