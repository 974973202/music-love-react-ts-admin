import {observable, action, computed} from 'mobx';
import request from '../utils/fetch'

export default class SwiperStore {
  @observable loading: boolean = true;
  @observable swiperList: object[] = []

  @action.bound
  async getSwiperList() {
    this.loading = true;
      try {
        const { code, data } = await request('/swiper/list');
        if (code === 20000) {
          this.swiperList = data
        } else {
          console.error(code)
        }
      } catch(e) {
        throw Error(e)
      } finally {
        this.loading = false;
      }
  }

  @action.bound
  async deleteSwiper(options) {
    try {
      const { code, ...rest } = await request('/swiper/del', options, 'get');
      if (code === 20000) {
        this.getSwiperList()
      } else {
        console.error(code, rest)
      }
    } catch(e) {
      throw Error(e)
    } 
  }
}