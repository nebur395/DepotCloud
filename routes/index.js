module.exports = function (app) {

    app.use("/users", require('./user/user')(app));
    app.use("/members", require('./user/members')(app));
    app.use("/login", require('./session/session')(app));
    app.use("/admin", require('./admin/userManagement')(app));
    app.use("/depots", require('./depot/depot')(app));
    app.use("/depotObjects", require('./depotObject/depotObject')(app));

};
