import {observable, action, computed} from 'mobx';
import request from '../utils/fetch'

export default class MusicStore {
    @observable musicList: any[] = [];
    @observable editInfo: object = {};
    @observable loading: boolean = true;

    /**
     * 获取歌单列表
     * @param options 获取数据参数
     */
    @action.bound
    async getMusicList(options: any = {}) {
      this.loading = true;
      try {
        const { data } = await request('/playlist/list', options);
        this.musicList = data || [];
      } catch(e) {
        throw Error(e)
      } finally {
        this.loading = false;
      }
      // console.log(data)
    }

    /**
     * 获取歌单详情
     * @param id 歌单id
     */
    @action.bound
    async editMusicInfo(id: string) {
      try {
        const { data } = await request(`/playlist/getById?id=${id}`);
        this.editInfo = data
        // this.musicList = data || [];
      } catch(e) {
        throw Error(e)
      }
    } 

    /**
     * 编辑更改歌单
     * @param options 修改歌单信息参数
     */
    @action.bound
    async updateMusicInfo(options: object) {
      try {
        const { code } = await request('/playlist/updatePlaylist', options, 'post');
        if (code === 20000) {
          this.getMusicList()
          return true
        } else {
          console.error(code)
        }
      } catch(e) {
        throw Error(e)
      }
    }

    @action.bound
    async deleteMusicInfo(id: string) {
      try {
        const { code } = await request(`/playlist/del?id=${id}`);
        if (code === 20000) {
          this.getMusicList()
          // return true
        } else {
          console.error(code)
        }
      } catch(e) {
        throw Error(e)
      }
    }

}