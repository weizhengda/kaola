module.exports = function ( app ) {
    require('./login')(app);
    require('./list')(app);
    require('./logout')(app);
    require('./register')(app);
    require('./cart')(app);
	require('./detail')(app);
	
};