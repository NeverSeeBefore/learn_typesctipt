
import { PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React from 'react';
import './index.css';


interface IProps {
    curImgUrl?: string;
    onChange?: (newImgUrl: string) => void;
}
export default class ImgUploader extends React.Component<IProps> {

    private getUploaderContent() {
        if (this.props.curImgUrl) {
            return null;
        }
        return (
            <div className="uploader-display">
                {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
    }
    private getFileList(): UploadFile[] {
        if (this.props.curImgUrl) {
            return [
                {
                    uid: this.props.curImgUrl,
                    name: this.props.curImgUrl,
                    url: this.props.curImgUrl,
                    size: 0,
                    type: ''
                }
            ]
        }
        return [];
    }

    // private handleChange(info: any) {
    //     console.log(info);
    // }
    private async handleRequest(p: any) {
        // console.log(p);
        const formdata = new FormData();
        formdata.append(p.filename, p.file);
        const request = new Request(p.action, {
            method: 'post',
            body: formdata
        })
        const resp = await fetch(request).then(resp => resp.json());
        console.log(resp);
        if (resp.err) {
            message.error('上传失败');
        } else {
            this.props.onChange && this.props.onChange(resp.data);
        }
    }

    render() {
        return (
            <Upload
                action="/api/upload"
                name="imgfile"
                accept=".jpg,.png,.gif"
                listType="picture-card"
                fileList={this.getFileList()}
                customRequest={this.handleRequest.bind(this)}
            >
                {this.getUploaderContent()}
            </Upload>
        );
    }
}