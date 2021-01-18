import { delay, takeEvery, put, call, select } from "redux-saga/effects"
import MovieAction from "./actions/MovieAction";
import { MovieService, IMovie } from "../services/MovieService";
import { ISearchCondition, IResponsePageData } from "../services/CommonTypes";

function* delayIsLoading1() {
    console.log("saga监听 isloading 111")
    yield delay(3000);
    console.log("延迟3000毫秒成功 111");
    // yield put(MovieAction.setIsLoading(false));
}

function* delayIsLoading2() {
    console.log("saga监听 isloading 222")
    yield delay(3000);
    console.log("延迟3000毫秒成功 222");
}

function* fetchMovie(){

    // 设置加载状态
    yield put(MovieAction.setIsLoading(true));
    // 设置条件
    yield put(MovieAction.setCondition({}));
    // 获取服务数据
    const result = yield call(MovieService.getMovies, {key: '', page: 1, limit: 10})
    // 设置电影数据
    put(MovieAction.saveMoviesAction(result.data, result.total));
    // 取消加载状态
    put(MovieAction.setIsLoading(false));
}

const sagaTask = function* () {
    console.log("rootSaga start")
    yield* [
        takeEvery("movie_is_loading", delayIsLoading1),
        takeEvery("movie_is_loading", delayIsLoading2),
    ]
    console.log("saga end")
}

export default sagaTask;
