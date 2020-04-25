import React, { Component } from 'react';
import { Row, Col, Button, Upload, message, Popconfirm, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import TablleCompoent from '../components/Table'

interface Props {
	blog?: any;
}

@inject('blog')
@observer
class BlogList extends Component<Props, {}> {

  columns = [
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
    },
    {
      title: '发布人',
      dataIndex: 'nickName',
      key: 'nickName',
      align: 'center',
    },
    {
      title: 'openid',
      dataIndex: '_openid',
      key: '_openid',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Popconfirm
          icon={<Icon type="question-circle-o" />}
          title={`是否删除该博客?`}
          onConfirm={() => this.handleDelete(record)}
        >
          <Button size="small" style={{ marginLeft: '10px' }}>删除</Button>
        </Popconfirm>
      )
    },
  ]

  componentDidMount() {
    this.getBlogList()
  }

  getBlogList() {
    const options = {
      start: 0,
      count: 10,
    }
    this.props.blog.getBlogList(options)
  }

  handleStandardTableChange = pagination => {
    const params = {
      start: (pagination.current - 1) * 10,
      count: pagination.pageSize,
		};
		this.props.blog!.getBlogList(params)
	};

  render() {
    const { blog: { blogList, loading } } = this.props;
    
    return (
      <>
        <TablleCompoent 
					columns={this.columns}
					rowKey={record => record._id}
					data={blogList}
          loading={loading}
					onChange={this.handleStandardTableChange}
					style={{minHeight: 500}}
					size='middle'
				/>
      </>
    )
  }

  handleDelete(obj: object) {
    this.props.blog.deleteBlog(obj)
  }
}

export default BlogList;