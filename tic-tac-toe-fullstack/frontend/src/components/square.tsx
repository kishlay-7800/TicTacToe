export default function Square({ 
  value, 
  onSquareClick 
}: { 
  value: string | null, 
  onSquareClick: React.MouseEventHandler,
}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}