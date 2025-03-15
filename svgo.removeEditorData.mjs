// FORKED from original removeEditorsNSData
// that was stripping license information / attribution
const editorNamespaces = new Set([
  'http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd',
  'http://ns.adobe.com/AdobeIllustrator/10.0/',
  'http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/',
  'http://ns.adobe.com/Extensibility/1.0/',
  'http://ns.adobe.com/Flows/1.0/',
  'http://ns.adobe.com/GenericCustomNamespace/1.0/',
  'http://ns.adobe.com/Graphs/1.0/',
  'http://ns.adobe.com/ImageReplacement/1.0/',
  'http://ns.adobe.com/SaveForWeb/1.0/',
  'http://ns.adobe.com/Variables/1.0/',
  'http://ns.adobe.com/XPath/1.0/',
  'http://schemas.microsoft.com/visio/2003/SVGExtensions/',
  'http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd',
  'http://taptrix.com/vectorillustrator/svg_extensions',
  'http://www.bohemiancoding.com/sketch/ns',
  'http://www.figma.com/figma/ns',
  'http://www.inkscape.org/namespaces/inkscape',
  'http://www.serif.com/',
  'http://www.vector.evaxdesign.sk',
]);

const detachNodeFromParent = (node, parentNode) => {
  // avoid splice to not break for loops
  parentNode.children = parentNode.children.filter((child) => child !== node);
};

export const name = 'removeEditorData';
export const description =
  'removes editors namespaces, elements and attributes';

/**
 * Remove editors namespaces, elements and attributes.
 *
 * @example
 * <svg xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
 * <sodipodi:namedview/>
 * <path sodipodi:nodetypes="cccc"/>
 *
 * @author Kir Belevich
 *
 */
export const fn = (_root, params) => {
  let namespaces = [...editorNamespaces];
  if (Array.isArray(params.additionalNamespaces)) {
    namespaces = [...editorNamespaces, ...params.additionalNamespaces];
  }
  /**
   * @type {string[]}
   */
  const prefixes = [];
  return {
    element: {
      enter: (node, parentNode) => {
        // collect namespace prefixes from svg element
        if (node.name === 'svg') {
          for (const [name, value] of Object.entries(node.attributes)) {
            if (name.startsWith('xmlns:') && namespaces.includes(value)) {
              prefixes.push(name.slice('xmlns:'.length));
              // <svg xmlns:sodipodi="">
              delete node.attributes[name];
            }
          }
        }
        // remove editor attributes, for example
        // <* sodipodi:*="">
        for (const name of Object.keys(node.attributes)) {
          if (name.includes(':')) {
            const [prefix] = name.split(':');
            if (prefixes.includes(prefix)) {
              delete node.attributes[name];
            }
          }
        }
        // remove editor elements, for example
        // <sodipodi:*>
        if (node.name.includes(':')) {
          const [prefix] = node.name.split(':');
          if (prefixes.includes(prefix)) {
            detachNodeFromParent(node, parentNode);
          }
        }
      },
    },
  };
};

export const removeEditorDataPlugin = {
  name: name,
  description: description,
  fn: fn
}