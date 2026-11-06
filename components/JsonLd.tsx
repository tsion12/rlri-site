/**
 * Renders a schema.org JSON-LD block. `<` is escaped so the payload can never
 * break out of the <script> element.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
