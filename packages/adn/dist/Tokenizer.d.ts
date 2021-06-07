import { InputStream } from './InputStream';
import { Token } from './Types';
export declare class Tokenizer {
    inputStream: InputStream;
    current?: Token;
    constructor(input: string);
    read_next(): Token;
    peek(): Token;
    next(): Token;
    eof(): boolean;
}
//# sourceMappingURL=Tokenizer.d.ts.map