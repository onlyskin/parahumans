export interface ISeries {
    hue: number;
    books: IBook[];
}

export interface IBook {
    title: string;
    wordCount: number;
    chapters?: any[];
}
