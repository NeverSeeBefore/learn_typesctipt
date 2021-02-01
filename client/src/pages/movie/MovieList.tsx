import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import MovieTable from '../../components/MovieTable';
import { SwitchType } from '../../components/MovieTable/types';
import MovieAction from '../../redux/actions/MovieAction';
import { IRootState } from '../../redux/reducers';
import { IMovieState } from '../../redux/reducers/MovieReducer';

interface IProps {
    movieState: IMovieState;
    onLoad: () => void;
    onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void;
    onDelete: (id: string) => Promise<void>;
    onTableChange?: (newPage: number) => void;
    onKeyChange?: (key: string) => void;
    onSearch?: () => void;
}
class MovieList extends React.Component<IProps> {

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <h1>MovieList</h1>
                <MovieTable
                    {...this.props.movieState}
                    onLoad={this.props.onLoad}
                    onSwitchChange={this.props.onSwitchChange}
                    onDelete={this.props.onDelete}
                    onTableChange={this.props.onTableChange}
                    onKeyChange={this.props.onKeyChange}
                    onSearch={this.props.onSearch}
                ></MovieTable>
            </div>
        )
    }
}

function mapStateToProps(state: IRootState) {
    return {
        movieState: state.movie
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onLoad: () => {
            dispatch(
                MovieAction.fetchMovies({ page: 1, limit: 10, key: '' })
            )
        },
        onSwitchChange: (type: SwitchType, newState: boolean, id: string) => {
            dispatch(
                MovieAction.changeSwitch(type, newState, id)
            )
        },
        onDelete: async (id: string) => {
            await dispatch(MovieAction.deleteMovie(id));
        },
        onTableChange: (newPage: number) => {
            dispatch(
                MovieAction.fetchMovies({
                    page: newPage
                })
            );
        },
        onKeyChange: (key: string) => {
            dispatch(
                MovieAction.createSetConditionAction({key})
            )
        },
        onSearch: () => {
            dispatch(
                MovieAction.fetchMovies({
                    page: 1
                })
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);

