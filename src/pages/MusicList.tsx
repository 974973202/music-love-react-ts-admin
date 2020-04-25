import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
// import CounterStore from '../stores/counter.store';
import MusicStore from '../stores/music.store';
import { Button, Popconfirm, Icon, Modal, Form, Input, Breadcrumb } from 'antd';
import TablleCompoent from '../components/Table'
import MainContent from '../components/MainContent';

import { FormComponentProps } from 'antd/lib/form/Form';
// interface musicList {
// 	musicList: any[];
// 	getMusicList: () => void;
// }

interface Props {
	// counter?: CounterStore;
	// music?: musicList;
	music?: any;
	getFieldDecorator: any;
	form?: any;
	// musicList: object[];
}

interface State {
  editFlag: boolean;
}

const FormItem = Form.Item;

// @Form.create()
class Home extends React.Component<Props, State> {
	columns = [
    {
      title: 'index',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
    },
    {
      title: '封面',
      dataIndex: 'picUrl',
      key: 'picUrl',
			align: 'center',
			render: (text, record) => (
        <img style={{ width: 100, height: 100 }} src={text} alt=""/>
      )
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'copywriter',
      key: 'copywriter',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Button
            size="small"
            onClick={() => this.handleEditModal(record._id)}
          >
            编辑
          </Button>

          <Popconfirm
            icon={<Icon type="question-circle-o" />}
            title={`是否删除该歌单吗?`}
            onConfirm={() => this.handleDelete(record._id)}
          >
            <Button size="small" style={{ marginLeft: '10px' }}>删除</Button>
          </Popconfirm>
        </Fragment>
      )
    },
	];
	
	constructor(props: Props) {
		super(props);
		this.state = {
			editFlag: false
		}
	};
	
  componentDidMount() {
		// const { music } = this.props;
		const options = {
			start: 0,
			count: 10
		}
		this.props.music!.getMusicList(options)
	};

	handleStandardTableChange = pagination => {
    const params = {
      start: (pagination.current - 1) * 10,
      count: pagination.pageSize,
		};
		this.props.music!.getMusicList(params)
	};
	
	EditModal = () => {
		const { 
			form: { getFieldDecorator }, 
			music: { editInfo = {} } 
		} = this.props;
    return (
			<Modal
				title="Basic Modal"
				visible={this.state.editFlag}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
			>
				<FormItem label='歌单名称'>
					{getFieldDecorator('name', {
						initialValue: editInfo.name,
					})(<Input placeholder='请输入歌单名称' />)}
				</FormItem>
				<FormItem label='描述'>
					{getFieldDecorator('copywriter', {
						initialValue: editInfo.copywriter,
					})(<Input placeholder='请输入描述' />)}
				</FormItem>
			</Modal>
		)
	}

	render() {
    const { musicList, loading } = this.props.music;
    const aryBc = [ '歌单管理' ];
    const breadcrumbs = aryBc.map((bc, index) => {
      return <Breadcrumb.Item key={index}>{bc}</Breadcrumb.Item>;
    });
		return (
			<MainContent breadcrumbs={breadcrumbs}>
				<TablleCompoent 
					columns={this.columns}
					rowKey={record => record.id}
					data={musicList}
					loading={loading}
					onChange={this.handleStandardTableChange}
					style={{minHeight: 500}}
					size='middle'
				/>
				{this.state.editFlag ? this.EditModal() : null}
			</MainContent>
		)
	}

	handleEditModal(id: string) {
		this.setState((cur) => ({
			editFlag: true
		}))
		this.props.music!.editMusicInfo(id);
	}

	handleOk = async () => {
		const { form, music: { editInfo, updateMusicInfo, getMusicList } } = this.props;
		// console.log(this.props.music.editInfo)
		const newInfo = form.getFieldsValue();
		const options = {
			...editInfo,
			...newInfo,
		}
		const bool = await updateMusicInfo(options)
		if (bool) {
			this.handleCancel()
			// getMusicList()
		}
		// console.log(options)
	}

	handleCancel = () => {
		this.props.form.resetFields();
		this.setState({
			editFlag: false
		})
	}

	handleDelete(id: string) {
		const { music: { deleteMusicInfo } } = this.props;
		deleteMusicInfo(id)
	}
}

	// @Form.create()
	// const HomeForm: any = Form.create(Home)
	export default inject('music')(Form.create<FormComponentProps>()(observer(Home)));
