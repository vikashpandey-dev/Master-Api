import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import category from './routes/category';
import products from './routes/product';
import size from './routes/size';
import color from './routes/color';
import gupshup from './routes/gupshup';
import Blog from './routes/Blog';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	agendash(app);
	products(app);
	size(app);
	color(app);
	category(app);
	gupshup(app);
	Blog(app)
	return app
}