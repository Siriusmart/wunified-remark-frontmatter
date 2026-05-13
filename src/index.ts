import { UntypedProcessor, WUnifiedPlugin } from "wp-unified"

import remarkFrontmatter from "remark-frontmatter"
import yaml from 'yaml'
import toml from 'toml'

export default class WRemarkParse extends WUnifiedPlugin {
    apply(processor: UntypedProcessor, options: any) {
        if (options === undefined)
            processor.use(remarkFrontmatter)
        else
            processor.use(remarkFrontmatter, options)

        processor.use(() => (tree: any) => {
            for (const node of tree.children) {
                switch (node.type) {
                    case "yaml":
                        this.setResult(yaml.parse(node.value))
                        break
                    case "toml":
                        this.setResult(toml.parse(node.value))
                        break
                }
            }
        })
    }
}
