import React from 'react';
import ImgUploader from '../components/ImgUploader';

export default class Home extends React.Component {

    state = {
        img: ''
    }
    render() {
        return (
            <div>
                <h1>欢迎使用电影管理系统</h1>
                <ImgUploader
                    curImgUrl={this.state.img}
                    onChange={newImgUrl => {
                        this.setState({
                            img: newImgUrl
                        })
                    }}
                ></ImgUploader>
            </div>
        )
    }
}