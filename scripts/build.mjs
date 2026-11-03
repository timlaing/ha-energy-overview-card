import { build, context } from 'esbuild';
const options = {
  entryPoints: ['src/energy-overview-card.ts'],
  outfile: 'dist/energy-overview-card.js',
  bundle: true,
  format: 'esm',
  target: 'es2022',
  minify: true,
  sourcemap: 'external',
  logLevel: 'info',
};
if (process.argv.includes('--watch')) {
  const builder = await context(options);
  await builder.watch();
} else {
  await build(options);
}
