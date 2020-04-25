import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import About from './pages/About';
import { Provider } from 'mobx-react';
import stores from './stores';
import Login from './pages/Login';
import MusicList from './pages/MusicList';
import SwiperList from './pages/SwiperList';
import BlogList from './pages/BlogList';
import LayoutMaster from './components/LayoutMaster';

const PrivateRoute: React.SFC<RouteProps> = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				stores.auth.isAuth ? (
					<LayoutMaster>{children}</LayoutMaster>
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
};

const App: React.SFC = () => {
	return (
		<Provider {...stores}>
			<BrowserRouter>
				<Switch>
					<PrivateRoute exact path="/">
						<Home />
					</PrivateRoute>
					<PrivateRoute path="/musicList" >
						<MusicList />
					</PrivateRoute>
					<PrivateRoute path="/swiperList" >
						<SwiperList />
					</PrivateRoute>
					<PrivateRoute path="/blogList" >
						<BlogList />
					</PrivateRoute>
					<PrivateRoute path="/about" >
						<About />
					</PrivateRoute>
					<Route path="/login">
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
