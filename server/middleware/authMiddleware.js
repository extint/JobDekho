import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentification Failed");
  }

  const token = authHeader.split(" ")[1];
  try {
    const userToken = JWT.verify(token, "labhansh");
    req.body.user = {
      userId: userToken.userId,
    };
    next();
  } catch (error) {
    console.log(error);
    next("Authentication Failed");
  }
};

export default userAuth;
