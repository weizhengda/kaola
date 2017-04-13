/**
 * Created by Administrator on 2017/4/12 0012.
 */

module.exports = function ( app ) {
	app.get('/detail', function (req, res) {
		/* if(req.session.user){*/
		var Commodity = global.dbHelper.getModel('commodity');
		Commodity.find({}, function (error, docs) {
			res.render('detail', {Commoditys: docs});
		});
		/* }else{
		 req.session.error = "请先登录"
		 res.redirect('/login');
		 }*/
	});
	
	
	//获取对应Id商品的对应信息
	app.get('/detail/:id', function(req, res) {
		res.render('/detail');
	});
	app.post('/detail', function (req, res) {
		var Commodity = global.dbHelper.getModel('commodity');
		Commodity.create({
			name: req.body.name,
			price: req.body.price,
			imgSrc: req.body.imgSrc
		}, function (error, doc) {
			if (doc) {
				res.send(200);
			}else{
				res.send(404);
			}
		});
	});
};