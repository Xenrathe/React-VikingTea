//teas should be an array [] filled with objects
// e.g. {"Name": "Jasmine", "Image": 'some url'}
export default function TeaShelf({ teas, setShoppingItem }) {
  return (
    <>
      {teas.map((tea) => (
        <div
          className="tea-icon"
          key={tea.Name}
          onClick={() => setShoppingItem(tea)}
        >
          <img src={tea.Image} alt={tea.Name} />
          <span className="label">{tea.Name}</span>
        </div>
      ))}
    </>
  );
}
