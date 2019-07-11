import test from 'ava';
import execa from 'execa';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const readfile = promisify(fs.readFile);

const cli = path.resolve(__dirname, '../bin/cli.js');

const expected = `body {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 48px;
  margin-left: 48px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 0 48px rgba(47, 53, 66, 0.2);
}
`;

test.before(async (t) => {
  await execa('node', [cli, './*.*', '--skip-lint', '--output=./output'], {
    cwd: path.join(__dirname, 'simple'),
    stdio: 'inherit',
  });
  await execa('node', [cli, './*.*', '--output=./output'], {
    cwd: path.join(__dirname, 'stylelint'),
    stdio: 'inherit',
  });
});

test('prettier styles', async (t) => {
  const input = await readfile(
    path.join(__dirname, 'stylelint', 'output', 'index.less'),
  ).then((b) => b.toString());
  t.is(input, expected);
});

test('help exit', async (t) => {
  const child = await execa('node', [cli, '--help'], {
    cwd: __dirname,
  });
  t.is(child.exitCode, 0);
  t.is(child.exitCodeName, 'SUCCESS');
});

test('version', async (t) => {
  const child = await execa('node', [cli, '--version'], {
    cwd: __dirname,
  });
  t.is(child.exitCode, 0);
  t.is(child.exitCodeName, 'SUCCESS');
  t.is(child.stdout, require('../package.json').version);
});

test('Validate stylelint configuration file', async (t) => {
  const child = await execa('node', [cli], {
    cwd: __dirname,
  });
  t.is(child.exitCode, 0);
  t.is(child.exitCodeName, 'SUCCESS');
  t.regex(child.all, /Through the parameter can be skipped stylelint\./);
});

test('No any file ', async (t) => {
  const child = await execa('node', [cli, './*.scss', '--skip-lint'], {
    cwd: path.join(__dirname, 'simple'),
  });
  t.is(child.exitCode, 0);
  t.is(child.exitCodeName, 'SUCCESS');
  t.is(child.stdout, '');
});

test('Skip stylelint tips ', async (t) => {
  const child = await execa(
    'node',
    [cli, './*.*', '--skip-lint', '--output=./output'],
    {
      cwd: path.join(__dirname, 'simple'),
    },
  );
  t.is(child.exitCode, 0);
  t.is(child.exitCodeName, 'SUCCESS');
  t.regex(child.all, /Skip detection style specification!/);
});

test('stylelint ', async (t) => {
  const child = await execa('node', [cli, './*.*', '--output=./output'], {
    cwd: path.join(__dirname, 'stylelint'),
  });
  t.is(child.exitCode, 0);
  t.is(child.exitCodeName, 'SUCCESS');
  t.regex(child.all, /index\.less/);
});
