import React, { Component } from 'react';
import { Table } from 'antd';

interface Props {
  onChange?: any;
  data?: any;
  rowKey?: any;
  columns: any[];
  style?: any;
  loading?: boolean;
  size?: "small" | "default" | "middle" | undefined;
}

class TableComponent extends Component<Props> {
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  render() {
    const { data, rowKey, ...rest } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: ((data && data.pn) + 10) / 10,
      total: data && data.total,
    };
    return (
      <Table
        dataSource={data.data}
        pagination={data && data.total > 10 ? paginationProps : false}
        bordered
        onChange={this.handleTableChange}
        rowKey={rowKey || 'key'}
        {...rest}
      />
    );
  }
}

export default TableComponent;