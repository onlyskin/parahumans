import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { IBook, ISeries } from './types';

const HEIGHT_TO_WIDTH_PIXEL_RATIO_PER_WORD = (1.9/20.3)/76994;

function formatWordCount(book: IBook): string {
    return Math.round(book.wordCount / 1000).toLocaleString() + 'k words';
}

function randomHueVariant(colourOffset: number): string {
    const saturation = (Math.round(Math.random() * 15) + 20);
    const hue = Math.round(Math.random() * 60) + colourOffset;
    return `linear-gradient(351deg, hsla(${hue},100%,77%,0.8), hsla(${hue},100%,${saturation}%,0.8), hsla(${hue},100%,10%,0.92)), url(grilled.png)`;
}

function randomTranslate(): string {
    const maxOffset = 5;
    const offset = Math.random() * maxOffset * 2 - maxOffset;
    return `translateX(${offset}px)`
}

export function updateShelf(series_data: ISeries, root: Element): void {
    const heightScale = scaleLinear()
        .domain([0, 1])
        .range([0, HEIGHT_TO_WIDTH_PIXEL_RATIO_PER_WORD * root.clientWidth]);

	const updating = select(root).selectAll('.book')
        .data<IBook>(series_data.books);

    const entering = updating
        .enter()
        .append('div');

    const merged = entering
        .merge(updating);

    entering
        .attr('class', 'book')
        .attr('title', formatWordCount)
        .style('background', _ => randomHueVariant(series_data.hue))
        .style('transform', _ => randomTranslate())
        .append('div')
        .attr('class', 'title')
        .text(d => d.title);

	merged
		.style('height', d => heightScale(d.wordCount))
		.style('min-width', root.clientWidth)
		.style('max-width', root.clientWidth);
}

export function zeroBookWidths(root: Element) {
    const books = select(root).selectAll('.book');

    books
		.style('min-width', '0px')
		.style('max-width', '0px');
}
