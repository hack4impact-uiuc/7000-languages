const fs = require('fs');
const { exec } = require('child_process');

const { src, dest, series } = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const rename = require('gulp-rename');
const log = require('fancy-log');

const NODE_ENV = 'production';
const paths = {
    prod_build: 'prod-build',
    zipped_file_name: 'full-application.zip',
};

paths.server_source_dest = `${paths.prod_build}/dist/src`;

const makeDirectory = (dir) => {
    log(`Creating the folder if not exist  ${dir}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log('📁  folder created:', dir);
    }
}

const clean = () => {
    log('Removing the old files in the directory');
    del('build/**', { force: true });
    del('prod-build/**', { force: true });
    return Promise.resolve();
}

const createProdBuildFolder = () => {
    makeDirectory(paths.prod_build)
    makeDirectory(paths.server_source_dest)
    return Promise.resolve();
}

const buildServerCodeTask = (cb) => {
    log('Building server code into the directory');
    return exec('yarn build', (err, stdout, stderr) => {
        log(stdout);
        log(stderr);
        cb(err);
    });
}

const copyNodeJSCodeTask = () => {
    log('Building and copying server code into the directory');
    src('build/index.js')
        .pipe(dest(`${paths.server_source_dest}`));

    return src(['package.json', `${NODE_ENV}.env`, `Procfile`]).pipe(
        dest(`${paths.prod_build}`),
    );
}

const addEngineToPackage = () => exec(`yarn json -I -f ${paths.prod_build}/package.json -e "this.engines = { 'node': '16.0.0' }"`)
const updatePackage = () => exec(`yarn json -I -f ${paths.prod_build}/package.json -e "this.scripts.start = 'NODE_ENV=production node -r dotenv/config ./dist/src/index.js'"`)

const zippingTask = () => {
    log('Zipping the code ');
    return src(`${paths.prod_build}/**`, { dot: true })
        .pipe(zip(`${paths.zipped_file_name}`))
        .pipe(dest(`${paths.prod_build}`));
}

exports.default = series(
    clean,
    createProdBuildFolder,
    buildServerCodeTask,
    copyNodeJSCodeTask,
    addEngineToPackage,
    updatePackage,
    zippingTask,
);