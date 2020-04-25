import React from 'react';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import useForm from 'rc-form-hooks';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
	onSubmit: (
		e: React.MouseEvent<HTMLFormElement>,
		values: {
			username: string;
			password: string;
			remember: boolean;
		}
	) => void;
}

const LoginForm: React.SFC<Props> = (props) => {
	const { getFieldDecorator, validateFields } = useForm<{
		username: string;
		password: string;
		remember: boolean;
	}>();

	const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		validateFields()
			.then((values) => {
				props.onSubmit(e, values);
			})
			.catch((e) => console.error(e.message));
	};

	return (
		<Form id="components-form-demo-normal-login" className="login-form" onSubmit={onSubmit}>
			<Form.Item>
				{getFieldDecorator('username', {
					rules: [ { required: true, message: '请输入用户名' } ]
				})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名: admin" />)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('password', {
					rules: [ { required: true, message: '请输入用户登录密码' } ]
				})(
					<Input
						type="password"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder="用户登录密码: 123456"
					/>
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true
				})(<Checkbox>自动登录</Checkbox>)}
				{/* <a className="login-form-forgot" href={}>忘记密码</a> */}
				<Button type="primary" htmlType="submit" className="login-form-button">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Form.create<Props>({})(LoginForm);
