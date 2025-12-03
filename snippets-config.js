const LANGUAGES = [
  'javascript',
  'typescript',
  'vue',
  'html',
  'json',
  'css',
  'less',
  'scss',
  'sass'
];

const SNIPPETS_CONFIG = {
  './snippets/utils.json': LANGUAGES,
  './snippets/css.json': LANGUAGES,
  './snippets/javascript.json': LANGUAGES,
  './snippets/vue.json': LANGUAGES,
  './snippets/avue.json': LANGUAGES,
  './snippets/element-ui.json': LANGUAGES,
  './snippets/szhn-option.json': LANGUAGES,
  './snippets/szhn-page.json': LANGUAGES
};


function generateSnippetsConfig() {
  const snippets = [];

  Object.entries(SNIPPETS_CONFIG).forEach(([path, languages]) => {
    languages.forEach(language => {
      snippets.push({
        language,
        path
      });
    });
  });

  return snippets;
}

module.exports = {
  generateSnippetsConfig
};

