
module.exports = function(app) {

    app.use("/users", require('./user/user')(app));
    app.use("/login", require('./session/session')(app));

};
