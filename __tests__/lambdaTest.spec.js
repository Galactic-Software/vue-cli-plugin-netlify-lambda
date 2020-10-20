jest.setTimeout(90000);

const create = require("@vue/cli-test-utils/createTestProject");
const path = require("path");
const cwd = path.resolve(__dirname, "../testProject");
const rimraf = require("rimraf");

beforeAll(async () => {
  rimraf(path.resolve(cwd, "example-netlify-lambda-project"), () => {});
});

test("should create vue modules", async () => {
  const project = await create(
    "example-netlify-lambda-project",
    {
      plugins: {
        "@vue/cli-plugin-babel": {}
      }
    },
    cwd
  );
  await project.run(
    `${require.resolve(
      "@vue/cli/bin/vue"
    )} add @galacticsoftware/vue-cli-plugin-netlify-lambda@file:../../`
  );
  await project.run(
    `${require.resolve(
      "@vue/cli/bin/vue"
    )} invoke @galacticsoftware/vue-cli-plugin-netlify-lambda`
  );
  expect(await project.has("src/lambda/hello.js")).toBe(true);
});
