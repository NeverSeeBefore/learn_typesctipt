import { Button, Col, Form, FormInstance, Input, Row, Switch, Checkbox, InputNumber, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IMovie } from '../../serveice/MovieService';
import ImgUploader from '../ImgUploader';
import './index.css';


const areaOptions = [
    { label: '中国大陆', value: '中国大陆' },
    { label: '美国', value: '美国' },
    { label: '英国', value: '英国' },
    { label: '日本', value: '日本' },
    { label: '韩国', value: '韩国', disabled: false },
    { label: '其他', value: '其他', disabled: false },
]

const typeOptions = [
    { label: '喜剧', value: '喜剧' },
    { label: '灾难', value: '灾难' },
    { label: '爱情', value: '爱情' },
    { label: '动画', value: '动画' },
    { label: '动作', value: '动作', disabled: false },
    { label: '其他', value: '其他', disabled: false },
]

interface IProps extends RouteComponentProps {
    onSubmit?: (movie: IMovie) => Promise<boolean>;
    movie?: IMovie;
}

interface IState {
    movie: IMovie;
}


class MovieForm extends React.Component<IProps, IState> {

    state: IState = {
        movie: {} as IMovie
    }

    constructor(props: IProps) {
        super(props);
        this.state.movie = props.movie!;
    }

    formRef = React.createRef<FormInstance>();

    private handleFinishFaild(infos: any) {
        console.log('finish faild', infos);
    }

    private async handleFinish(value: IMovie) {
        console.log('finish', value);
        if (this.props.onSubmit) {
            const status = await this.props.onSubmit(value);
            if (status) {
                message.success("处理成功", 3, () => {
                    this.props.history.push('/movie');
                });
            } else {
                message.success("提交失败", 3);
            }
        }
    }
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <Form
                ref={this.formRef}
                className="movie-form"
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={this.handleFinish.bind(this)}
                onFinishFailed={this.handleFinishFaild.bind(this)}
                initialValues={this.state.movie}
            >
                <Form.Item name="name" label="电影名称"
                    rules={[
                        { required: true, message: '电影名称必填' }
                    ]}
                >
                    <Input placeholder="input placeholder"></Input>
                </Form.Item>
                <Form.Item name="poster" label="封面" valuePropName="curImgUrl">
                    <ImgUploader></ImgUploader>
                </Form.Item>
                <Form.Item name="areas" label="地区"
                    rules={[
                        { required: true, message: '请选择地区' }
                    ]}
                >
                    <Checkbox.Group
                        options={areaOptions}
                    >
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="types" label="类型"
                    rules={[
                        { required: true, message: '请选择电影类型' }
                    ]}
                >
                    <Checkbox.Group
                        options={typeOptions}
                    >
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="timeLong" label="时长"
                    rules={[
                        { required: true, message: '请选择电影时长' }
                    ]}
                >
                    <InputNumber type="number" max={300} min={0}></InputNumber>
                </Form.Item>
                <Form.Item name="isHot" label="是否热映" valuePropName="checked">
                    <Switch></Switch>
                </Form.Item>
                <Form.Item name="isClassic" label="是否经典影片" valuePropName="checked">
                    <Switch></Switch>
                </Form.Item>
                <Form.Item name="isComing" label="是否即将上映" valuePropName="checked">
                    <Switch></Switch>
                </Form.Item>
                <Form.Item name="describe" label="描述">
                    <TextArea></TextArea>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Row>
                        <Col span={11}>
                            <Button type="primary" htmlType="submit" block>submit</Button>
                        </Col>
                        <Col span={11} offset={2}>
                            <Button type="primary" htmlType="reset" block>reset</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        )
    }
}


export default withRouter(MovieForm);