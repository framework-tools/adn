/**
 * Convert an string input into a character traverser
 */
export declare class InputStream {
    pos: number;
    input: string;
    constructor(input: string);
    /**
     * Get next character in string
     */
    next(): string;
    /**
     * Look at next character without increasing index
     */
    peek(): string;
    /**
     * returns true if no more characters in string
     */
    eof(): boolean;
    /**
     * @param msg Message of error to throw
     */
    croak(msg: string): never;
}
//# sourceMappingURL=InputStream.d.ts.map