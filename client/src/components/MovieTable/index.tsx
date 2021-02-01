import { Button, Input, message, Popconfirm, Space, Switch, Table } from 'antd';
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table';
import React from 'react';
import { IMovieState } from '../../redux/reducers/MovieReducer';
import { IMovie } from '../../serveice/MovieService';
import defaultPosterSrc from '../../public/logo192.png';
import './index.css';
import { SwitchType } from './types';
import { NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';


interface IProps extends IMovieState {
    onLoad?: () => void;
    onSwitchChange?: (type: SwitchType, newState: boolean, id: string) => void;
    onDelete?: (id: string) => Promise<void>;
    onTableChange?: (newPage: number) => void;
    onKeyChange?: (key: string) => void;
    onSearch?: () => void;
}

export default class MovieTable extends React.Component<IProps> {
    private getColumns(): ColumnProps<IMovie>[] {
        return [
            {
                title: '封面',
                dataIndex: 'poster',
                render: poster => {
                    function onError(e: any) {
                        console.log('图片加载失败，重设为默认封面');
                        e.target.src = defaultPosterSrc;
                    }
                    return <img alt="" className="moviePoster" src={poster || defaultPosterSrc} onError={onError}></ img>
                }
            },
            {
                title: '名称',
                dataIndex: 'name',
                filterDropdown: this.getFilterDropDown.bind(this),
                filterIcon: <SearchOutlined />
            },
            {
                title: '地区',
                dataIndex: 'areas',
                render: (text: string[], record) => {
                    // console.log(text, record);
                    return text.join(',')
                }
            },
            {
                title: '类型',
                dataIndex: 'types',
                render: (text: string[], record) => {
                    // console.log(text, record);
                    return text.join(',')
                }
            },
            {
                title: '时长',
                dataIndex: 'timeLong',
                render: (text: string[], record) => {
                    // console.log(text, record);
                    return text
                }
            },
            {
                title: '热映',
                dataIndex: 'isHot',
                render: (isHot, record) => {
                    return (
                        <Switch
                            checked={isHot}
                            onChange={newVal => {
                                this.props.onSwitchChange && this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!);
                            }}
                        ></Switch>
                    )
                }
            },
            {
                title: '经典',
                dataIndex: 'isClassic',
                render: (isClassic, record) => {
                    return (
                        <Switch
                            checked={isClassic}
                            onChange={newVal => {
                                this.props.onSwitchChange && this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!);
                            }}
                        ></Switch>
                    )
                }
            },
            {
                title: '即将上映',
                dataIndex: 'isComing',
                render: (isComing, record) => {
                    return (
                        <Switch
                            checked={isComing}
                            onChange={newVal => {
                                this.props.onSwitchChange && this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!);
                            }}
                        ></Switch>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: '_id',
                render: (id: string) => {
                    return (
                        <>
                            <NavLink to={'/movie/edit/' + id}>
                                <Button type="primary" size="small">编辑</Button>
                            </NavLink>
                            <Popconfirm
                                title="are you sure delete this movie?"
                                onConfirm={async () => {
                                    if (this.props.onDelete) {
                                        await this.props.onDelete(id);
                                        message.success('删除成功');
                                    }
                                }}
                                onCancel={() => {
                                    message.info('已取消')
                                }}
                                okText="yes"
                                cancelText="no"
                            >
                                <Button
                                    danger
                                    size="small"
                                >删除</Button>
                            </Popconfirm>
                        </>
                    )
                }
            }
        ]
    }
    componentDidMount() {
        // console.log(this.props);
        this.props.onLoad && this.props.onLoad();
    }
    private getPageConfig(): TablePaginationConfig | false {
        if (this.props.movieCount === 0) {
            return false;
        }
        return {
            position: ['bottomCenter'],
            total: this.props.movieCount,
            pageSize: this.props.condition.limit
        }
    }
    private handleTableChange(pagination: TablePaginationConfig) {
        // console.log(pagination);
        this.props.onTableChange && this.props.onTableChange(pagination.current!);
    }
    private handleSearch = () => {
        this.props.onSearch && this.props.onSearch();
    }
    private getFilterDropDown(p: object) {
        console.log(p);
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    value={this.props.condition.key}
                    onChange={e => { this.props.onKeyChange && this.props.onKeyChange(e.target.value); }}
                    onPressEnter={this.handleSearch}
                />
                <Space>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        onClick={this.handleSearch}
                    >
                        Search
                    </Button>
                    <Button
                        size="small"
                        style={{ width: 90 }}
                        onClickCapture={() => {
                            if (this.props.onKeyChange && this.props.onSearch) {
                                this.props.onKeyChange('');
                                this.props.onSearch();
                            }
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        );
    }
    render() {
        return (
            <Table
                dataSource={this.props.movies}
                columns={this.getColumns()}
                rowKey="_id"
                pagination={this.getPageConfig()}
                onChange={this.handleTableChange.bind(this)}
                loading={this.props.isLoading}
            ></Table>
        )
    }
}