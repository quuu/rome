/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Path} from '@romejs/js-compiler';
import {AnyNode} from '@romejs/js-ast';

export default {
  name: 'noDanglingBackslash',
  enter(path: Path): AnyNode {
    const {node, context} = path;

    if (node.type === 'RegExpSubExpression') {
      const body = node.body;
      if (body) {
        const last = body[body.length - 1];
        if (last && last.type === 'RegExpCharacter' && !last.value) {
          context.addNodeDiagnostic(last, {
            category: 'lint/noDanglingBackslash',
            message: 'Dangling backslash in a regular expression',
          });
        }
      }
    }
    return node;
  },
};
