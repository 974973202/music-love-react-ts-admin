import AuthStore from './auth.store';
import MusicStore from './music.store';
import SwiperStore from './swiper.store';
import BlogStore from './blog.store';

const stores = {
    auth: new AuthStore(),
    music: new MusicStore(),
    swiper: new SwiperStore(),
    blog: new BlogStore(),
}

export default stores;