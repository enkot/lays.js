import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
import multidest from 'rollup-plugin-multi-dest';

export default {
    entry: 'src/index.js',
    dest: 'dist/lays.es.js',
    format: 'es',
    plugins: [
        eslint(),
        multidest([
            // targets "main" in package.json 
            {
                dest: 'dist/lays.cjs.js',
                format: 'cjs',
                plugins: [
                    babel()
                ]
            },
            // targets browsers 
            {
                dest: 'docs/lays.js',
                format: 'iife',
                moduleName: 'Lays',
                plugins: [
                    babel()
                ]
            },
            {
                dest: 'docs/lays.min.js',
                format: 'iife',
                moduleName: 'Lays',
                plugins: [
                    babel(),
                    uglify()
                ]
            }
        ])
    ]
};