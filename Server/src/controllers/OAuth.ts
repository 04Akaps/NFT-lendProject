import getGoogleOAuthURL from "../utils/GetGoogleUrl"

export const googleAuth =async (req:any ,res:any) => {
    getGoogleOAuthURL();
}