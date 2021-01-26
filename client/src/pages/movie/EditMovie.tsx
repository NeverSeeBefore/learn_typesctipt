import React from 'react';
import { RouteComponentProps } from 'react-router';

interface IParams {
    id: string
}
interface IProps extends RouteComponentProps<IParams> { }

export default class extends React.Component<IProps> {

    render() {
        console.log(this.props);
        console.log(this.props.match.params.id);
        return (
            <h1>EditMovie {this.props.match.params.id}</h1>
        )
    }
}