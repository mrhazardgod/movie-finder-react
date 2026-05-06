interface Item {
  label: string;
  value: string;
  id?: string;
  editId?: string;
}

interface Props {
  items: Item[];
}

export default function InfoGrid({ items }: Props) {
  return (
    <dl className="info-grid" data-edit-id="info-grid">
      {items.map((item) => (
        <div key={item.label} className="info-grid-item" data-edit-id={item.editId || `info-${item.label.toLowerCase()}`}>
          <dt className="info-label">{item.label}</dt>
          <dd className="info-value" id={item.id}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}