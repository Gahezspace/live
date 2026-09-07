export interface SeoBlock {
  heading: string;
  paragraphs: string[];
}

/**
 * Concise, human-first content blocks placed below the main discovery UI —
 * answers real search intent without turning the page into a wall of text.
 * See DESIGN_SYSTEM.md / marketing brief section 25.
 */
export function SeoContentSection({ blocks }: { blocks: SeoBlock[] }) {
  return (
    <section className="seo-content-section">
      <div className="container-wide seo-content-grid">
        {blocks.map((block) => (
          <div key={block.heading} className="seo-content-block">
            <h2>{block.heading}</h2>
            {block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        ))}
      </div>
    </section>
  );
}
