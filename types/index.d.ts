import { statSync, readFileSync, writeFileSync } from "node:fs";

declare namespace UglifyPHP {

    /**
     * Options for the minifier
     */
    type MinifyOptions = {
        /**
         * True if variables should be renamed. Default is true.
         */
        replace_variables?: boolean,
        /**
         * True if whitespace should be removed. Default is true.
         */
        remove_whitespace?: boolean,
        /**
         * True if comments should be removed. Default is true.
         */
        remove_comments?: boolean,
        /**
         * True if HTML should be minified.
         *
         * @deprecated This value seems to be unused, but it is documented and reserved for future use.
         */
        minify_html?: boolean
    };

    /**
     * Options for UglifyPHP
     */
    type Options = {
        /**
         * A list of variables names to exclude from obfuscation
         */
        excludes?: string[],
        /**
         * Options for the minifier
         */
        minify?: MinifyOptions,
        /**
         * A path to output to, if empty then no file will be written.
         * Note that UglifyPHP considers a string of length 0 to be empty, as well as undefined.
         * The output can be retrieved from the return value of minify or minifySync.
         */
        output?: string
    };

}

declare interface UglifyPHP {

    /**
     * Uglifies PHP asynchronously.
     * @param pathOrCode Either a file path or string containing PHP code.
     * @param options Options to pass to the uglifier.
     * @returns A promise that resolves with the uglified code. If {@link Options.output output} was specified in **options**,
     * the data will also have been written to the file specified.
     * @see minifySync
     */
    minify(pathOrCode: string, options: UglifyPHP.Options): Promise<string>;

    /**
     * Uglifies PHP synchronously. When providing code instead of a file path, {@link statSync} may still be called.
     * Using a file path will always incur sync I/O via {@link readFileSync} and {@link writeFileSync}.
     * @param pathOrCode Either a file path or string containing PHP code. Using a file path will incur sync I/O.
     * @param options Options to pass to the uglifier.
     * @returns The uglified code. If {@link Options.output output} was specified in **options**,
     * the data will also have been written to the file specified.
     * @see minify
     */
    minifySync(pathOrCode: string, options: UglifyPHP.Options): string;

}