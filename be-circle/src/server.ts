import { App } from './app';
import AuthRoute from './routes/auth.route';
import FollowRoute from './routes/follow.route';
import LikeRoute from './routes/like.route';
import ReplyRoute from './routes/reply.route';
import ThreadRoute from './routes/thread.route';
import UserRoute from './routes/user.route';

const app = new App([
  new AuthRoute(),
  new ThreadRoute(),
  new UserRoute(),
  new FollowRoute(),
  new ReplyRoute(),
  new LikeRoute(),
]);

app.listening();
