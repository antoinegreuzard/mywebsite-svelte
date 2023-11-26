import isbot from "isbot";

export const tagLabels: Record<string, string> = {
  backbonedotjs: "Backbone.js",
  graphql: "GraphQL",
  javascript: "JavaScript",
  mongodb: "MongoDB",
  dotnet: ".NET / C#",
  nestjs: "NestJS",
  nodedotjs: "Node.js",
  nuxtdotjs: "NuxtJS / Vue",
  postgresql: "PostgreSQL",
  prosemirror: "ProseMirror",
  raspberrypi: "Raspberry Pi",
  tensorflow: "TensorFlow",
  typescript: "TypeScript",
  unity: "Unity 3D",
  webassembly: "WebAssembly",
  wordpress: "WordPress",
  mysql: "MySQL",
  react: "React",
  redux: "Redux",
  gatsby: "Gatsby",
  svelte: "Svelte",
  django: "Django",
  express: "Express",
  flask: "Flask",
  fastify: "Fastify",
  acf: "ACF",
  algolia: "Algolia",
  apollo: "Apollo",
  aws: "AWS",
  azure: "Azure",
  bootstrap: "Bootstrap",
  bulma: "Bulma",
  cypress: "Cypress",
  d3: "D3",
  datadog: "Datadog",
  docker: "Docker",
  drupal: "Drupal",
  electron: "Electron",
  elasticsearch: "Elasticsearch",
  firebase: "Firebase",
  git: "Git",
  github: "GitHub",
  googlecloud: "Google Cloud",
  grommet: "Grommet",
  heroku: "Heroku",
  sass: "Sass",
  typo3: "TYPO3",
  mariadb: "MariaDB",
  vite: "Vite",
  elementor: "Elementor",
  laravel: "Laravel",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  rust: "Rust",
  symfony: "Symfony",
  vue: "Vue",
  webpack: "Webpack",
  scss: "SCSS",
  sql: "SQL",
  html5: "HTML",
  css3: "CSS",
  jquery: "jQuery",
  microsoftexcel: "Excel",
  visualstudiocode: "VS code",
};

export const tagAncestors: Record<string, string[]> = {
  nestjs: ["nodedotjs", "javascript"],
  react: ["javascript", "typescript", "nodedotjs"],
  svelte: ["javascript", "typescript", "nodedotjs"],
  typescript: ["javascript"],
  wordpress: ["php"],
  acf: ["wordpress"],
  docker: ["javascript"],
  drupal: ["php"],
  vite: ["javascript"],
  elementor: ["wordpress"],
  laravel: ["php"],
  sass: ["css3"],
};

const isBrowser = typeof window !== "undefined" && !("Deno" in window);

const isBot = isBrowser && isbot(window.navigator.userAgent);
const prefersReducedMotion =
  isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const intersectionObserverSupported =
  isBrowser && "IntersectionObserver" in window;

export const reduceMotion =
  isBrowser &&
  (isBot || prefersReducedMotion || !intersectionObserverSupported);
