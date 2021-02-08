import { message } from 'antd';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import MovieForm from '../../components/MovieForm';
import { IRootState } from '../../redux/reducers';
import { IMovie, MovieService } from '../../serveice/MovieService';

interface IParams {
    id: string;
}
interface IProps extends RouteComponentProps<IParams> { }

interface IState {
    movieId: string;
    movieData: IMovie | undefined;
}

class EditMovie extends React.Component<IProps, IState> {

    state: IState = {
        movieId: '',
        movieData: undefined
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await MovieService.getMovie(id);

        if (res.err) {
            message.error('请求电影数据失败', 3);
            this.setState({
                movieData: undefined,
                movieId: id
            })
            return;
        }
        this.setState({
            movieData: res.data,
            movieId: id
        })
        // MovieService.getMovie(id).then(res => {
        //     if (res.err) {
        //         throw new Error(res.err);
        //     }
        //     this.setState({
        //         movieData: res.data
        //     });
        //     console.log('获取电影数据', res);
        // }).catch(err => {
        //     console.log('获取电影数据出错', err);
        // });
        // this.setState({
        //     movieId: id
        // });
    }

    static getDerivedStateFromProps(nextPorps: IProps, prevState: IState) {
        console.log('getDrivedStateFromProps', nextPorps, prevState)
        return null
    }

    private async handleSubmit(movie: IMovie): Promise<boolean> {
        const res = await MovieService.editMovie(this.state.movieId, movie);
        if (res.err) {
            console.log('修改失败', res);
            return false;
        }
        return true;
    }


    render() {
        return (
            <div>
                <h1>EditMovie {this.props.match.params.id}
                </h1>
                {
                    this.state.movieData ? <MovieForm
                        movie={this.state.movieData}
                        onSubmit={this.handleSubmit.bind(this)}
                    ></MovieForm> : '加载中'
                }
            </div>
        )
    }
}

function mapStateToProps(store: IRootState) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);