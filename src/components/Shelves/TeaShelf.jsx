//teas should be an array [] filled with objects
// e.g. {"Name": "Jasmine", "Image": 'some url', Count: #}
export default function TeaShelf({ teas, setShoppingItem }) {
  return (
    <>
      {teas.map((tea) => (
        <div
          className="tea-icon"
          key={tea.Name}
          onClick={() => setShoppingItem({ Product: tea, Count: 1 })}
        >
          <img src={tea.Image} alt={tea.Name} />
          <span className="label">{tea.Name}</span>
        </div>
      ))}
    </>
  );
}
