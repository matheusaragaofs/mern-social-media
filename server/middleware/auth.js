import jwt from 'jsonwebtoken';
// wants to like a post
// to verify if the user has permition to do something in the application;
// click the like button => auth middleware(next) => like controller
import {OAuth2Client} from 'google-auth-library'
const Auth =  async (req ,res ,next) => {
 


    try {
      const token = req.headers.authorization.split(" ")[1];

      const isCustomAuth = token.length < 500; // if !isCustomAuth, it means the token came from Google Auth

      let decodedData; 

      if (token && isCustomAuth) {
         decodedData = jwt.verify(token, 'test')
         req.userId = decodedData?.id;
        } else {
          const googleClientId = "208060749184-8an816ih1gabb8dm2thdvgl2nkgucp5n.apps.googleusercontent.com"
          const client = new OAuth2Client(googleClientId);

          decodedData = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId
          })
          
          const payload = decodedData.getPayload()
          req.userId = payload?.sub; // Google specific userId
      }

        next();

    } catch (error) {
        console.log('error', error);
    }
}

export default Auth;