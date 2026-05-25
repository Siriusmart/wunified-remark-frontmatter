import remarkFrontmatter from "remark-frontmatter";
import { WUnifiedPlugin } from "wp-unified";
import yaml from "yaml";
import toml from "toml";
export default class WRemarkParse extends WUnifiedPlugin {
    apply(processor, options) {
        if (options === undefined)
            processor.use(remarkFrontmatter);
        else
            processor.use(remarkFrontmatter, options);
        processor.use(() => (tree) => {
            for (const node of tree.children) {
                switch (node.type) {
                    case "yaml":
                        this.setResult(yaml.parse(node.value));
                        break;
                    case "toml":
                        this.setResult(toml.parse(node.value));
                        break;
                }
            }
        });
    }
}
//# sourceMappingURL=index.js.map