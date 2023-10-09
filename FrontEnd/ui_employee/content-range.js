export default (req,res,next)=> {
    req.header("Access-Control-Expose-Headers","Content-Range");
    res.header("Content-Range","departments 0-9/9");
    next();
}