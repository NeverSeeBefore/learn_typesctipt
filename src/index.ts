import { Square } from './core/Square';
import { IViewer, Direction } from './core/types';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from "jquery";
import { SquareGroup } from './core/SquareGroup';
import { createTeris } from './core/Teris';
import { Game } from './core/Game';
import { GamePageViewer } from './core/viewer/GamePageViewer';

var g = new Game(new GamePageViewer());
$('#moveTop').click(() => {
    g.moveTop();
})
$('#moveBottom').click(() => {
    g.moveDown();
})
$('#moveLeft').click(() => {
    g.moveLeft();
})
$('#moveRight').click(() => {
    g.moveRight();
})

$('#start').click(() => {
    g.start();
})
$('#pause').click(() => {
    g.pause();
})
$('#rotate').click(() => {
    g.rotate();
})