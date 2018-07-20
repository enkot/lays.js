import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

const defaultPlugins = [
    eslint(),
    babel(),
];

export default [{
    entry: 'src/index.js',
    dest: 'dist/lays.cjs.js',
    format: 'cjs',
    plugins: defaultPlugins
}, {
    entry: 'src/index.js',
    dest: 'docs/lays.min.js',
    format: 'iife',
    moduleName: 'Lays',
    plugins: [
        ...defaultPlugins, 
        uglify()
    ]
}]