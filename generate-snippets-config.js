const fs = require('fs');
const path = require('path');
const { generateSnippetsConfig } = require('./snippets-config');

function updatePackageJson() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.contributes.snippets = generateSnippetsConfig();

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf8'
  );

  console.log('✅ package.json 中的 snippets 配置已更新！');
  console.log(`   共生成 ${packageJson.contributes.snippets.length} 个配置项`);
}

updatePackageJson();

