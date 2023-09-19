import { remark } from "remark";
import remarkHtml from "remark-html";

import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import rehypeSanitize from 'rehype-sanitize';
import remarkStringify from "remark-stringify";
import rehypeFormat from 'rehype-format';

export function markdownToHtml(markdownText: string) {
  const file = remark().use(remarkHtml).processSync(markdownText);
  return String(file);
}

export function htmlToMarkdown(htmlText: string) {
  // clean html tags with missing space before new character
  const htmlCleaned = htmlText ? htmlText.replaceAll(/<(\w+)>([\S\s]+(?=\s))(\s+<\/\1>)(?=\S+)/g, '<$1>$2</$1> ') : htmlText
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false, fragment: true })
    .use(rehypeFormat)
    .use(rehypeSanitize)
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlCleaned);

  return String(file);
}
