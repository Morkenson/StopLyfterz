function ListGroup() {
  const items = [
    "This",
    "is just",
    "a template",
    "so our project",
    "actually has",
    "files in it.",
  ];

  return (
    <>
      <h1>StopLyfterz</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
