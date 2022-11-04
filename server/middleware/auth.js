import jwt from 'jsonwebtoken';
// wants to like a post
// to verify if the user has permition to do something in the application;
// click the like button => auth middleware(next) => like controller
const auth =  async (req ,res ,next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500; // if !isCustomAuth, it means the token came from Google Auth

      let decodedData; 

      if (token && isCustomAuth) {
         decodedData = jwt.verify(token, 'test')
         req.userId = decodedData?.id;
        } else {
          decodedData = jwt.verify(token)
        req.userId = decodedData?.sub; // Google specific userId
      }

        next();

    } catch (error) {
        console.log('error', error);
    }
}

export default auth;