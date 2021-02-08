import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Home from './Home';
import AddMovie from './movie/AddMovie';
import EditMovie from './movie/EditMovie';
import MovieList from './movie/MovieList';
import './Layout.css';
import MenuItem from 'antd/lib/menu/MenuItem';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

const _Layout: React.FC = () => {
    return (
        <div className="container">
            <Layout className="layout">
                <Header className="header">
                    <NavLink to="/">电影管理系统</NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultOpenKeys={['movieMenu']}
                            defaultSelectedKeys={['home']}
                        >
                            <MenuItem key="home">
                                <NavLink to="/">首页</NavLink>
                            </MenuItem>
                            <SubMenu key="movieMenu" title="电影管理">
                                <MenuItem key="movieList">
                                    <NavLink to="/movie">电影列表</NavLink>
                                </MenuItem>
                                <MenuItem key="addMovie">
                                    <NavLink to="/movie/add">添加电影</NavLink>
                                </MenuItem>
                                <MenuItem key="editMovie">
                                    <NavLink to="/movie/edit/ididididid">修改电影</NavLink>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className="content">
                        <Route path="/" component={Home} exact={true}></Route>
                        <Route path="/movie" component={MovieList} exact></Route>
                        <Route path="/movie/add" component={AddMovie}></Route>
                        <Route path="/movie/edit/:id" component={EditMovie}></Route>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default _Layout