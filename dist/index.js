"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wp_unified_1 = require("wp-unified");
const remark_frontmatter_1 = __importDefault(require("remark-frontmatter"));
const yaml_1 = __importDefault(require("yaml"));
const toml_1 = __importDefault(require("toml"));
class WRemarkParse extends wp_unified_1.WUnifiedPlugin {
    apply(processor, options) {
        if (options === undefined)
            processor.use(remark_frontmatter_1.default);
        else
            processor.use(remark_frontmatter_1.default, options);
        processor.use(() => (tree) => {
            for (const node of tree.children) {
                switch (node.type) {
                    case "yaml":
                        this.setResult(yaml_1.default.parse(node.value));
                        break;
                    case "toml":
                        this.setResult(toml_1.default.parse(node.value));
                        break;
                }
            }
        });
    }
}
exports.default = WRemarkParse;
//# sourceMappingURL=index.js.map