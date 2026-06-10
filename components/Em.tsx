/**
 * Editorial emphasis in display copy, Berkeley Carroll-style:
 * words wrapped in *asterisks* render as lighter italic serif.
 * Usage: <Em>{"Bright minds. Boundless *hope.*"}</Em>
 */
export default function Em({ children }: { children: string }) {
  const parts = children.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="font-light italic">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
