import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, "./index.js"),
            name: "TL",
            fileName: "timeline.js",
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
});


// import { defineConfig } from 'vite';
// import path from 'path';
//
// export default defineConfig({
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       input: './index.js', // Your main JavaScript entry point
//       output: {
//         dir: 'dist/js', // Output JS files here
//         format: 'es',
//         sourcemap: false,
//       }
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       less: {
//         javascriptEnabled: true,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   }
// });
