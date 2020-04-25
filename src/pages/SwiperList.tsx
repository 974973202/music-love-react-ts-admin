import React, { Component } from 'react';
import { Row, Col, Button, Upload, message, Popconfirm, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import TablleCompoent from '../components/Table'

interface Props {
	swiper?: any;
	// getFieldDecorator: any;
	// form?: any;
	// musicList: object[];
}

@inject('swiper')
@observer
class SwiperList extends Component<Props, {}> {

  columns = [
    {
      title: '图片',
      dataIndex: 'download_url',
      key: 'download_url',
      align: 'center',
      render: (text, record) => (
        <img style={{ width: 200 }} src={text} alt=""/>
      )
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Popconfirm
          icon={<Icon type="question-circle-o" />}
          title={`是否删除该图片吗?`}
          onConfirm={() => this.handleDelete(record)}
        >
          <Button size="small" style={{ marginLeft: '10px' }}>删除</Button>
        </Popconfirm>
      )
    },
  ]

  componentDidMount() {
    this.props.swiper.getSwiperList()
  }

  render() {
    const { swiper: { swiperList, loading, getSwiperList } } = this.props;

    const props = {
      // name: 'file',
      action: 'http://localhost:3000/swiper/upload',
      accept: 'image/*',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log('q11111')
          getSwiperList()
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          console.log('888888')

          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    // console.log(swiper)
    
    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
          <Upload {...props}>
            <Button>
              Click to Upload
            </Button>
          </Upload>
          </Col>
        </Row>
        <TablleCompoent 
					columns={this.columns}
					rowKey={record => record._id}
					data={swiperList}
					loading={loading}
					style={{minHeight: 500}}
					size='middle'
				/>
      </>
    )
  }

  handleDelete(obj: object) {
    this.props.swiper.deleteSwiper(obj)
  }
}

export default SwiperList;