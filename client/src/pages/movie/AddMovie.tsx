import React from 'react';
import MovieForm from '../../components/MovieForm';
import { IMovie, MovieService } from '../../serveice/MovieService';

export default class AddMovie extends React.Component {

    private async handleSubmit(movie: IMovie): Promise<boolean> {
        const res = await MovieService.addMovie(movie);
        if (res.err) {
            console.log('添加失败', res);
            return false;
        }
        return true;
    }

    render() {
        return (
            <h1>AddMovie
                <MovieForm onSubmit={this.handleSubmit.bind(this)}></MovieForm>
            </h1>
        )
    }
}