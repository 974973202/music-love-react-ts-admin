import {observable, action, computed} from 'mobx';
import request from '../utils/fetch'

export default class BlogStore {
  @observable loading: boolean = true;
  @observable blogList: object[] = []

  @action.bound
  async getBlogList(options) {
    this.loading = true;
      try {
        const { data } = await request('/blog/list', options, 'get');
        this.blogList = data
      } catch(e) {
        throw Error(e)
      } finally {
        this.loading = false;
      }
  }

  @action.bound
  async deleteBlog(options) {
    try {
      const { code, ...rest } = await request('/blog/del', options, 'post');
      console.error(code, rest)
      if (code === 20000) {
        this.getBlogList({
          start: 0,
          count: 10,
        })
      } else {
        console.error(code, rest)
      }
    } catch(e) {
      throw Error(e)
    } 
  }
}