
import React, { useState } from "react";


import styled from "styled-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: ${(props) => (props.delete ? "#dc3545" : "#007bff")};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.delete ? "#c82333" : props.edit ? "#218838" : "#0056b3"};
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
    expiry: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setItems(items.map((item) => (item.id === formData.id ? formData : item)));
      setEditMode(false);
    } else {
      setItems([...items, { ...formData, id: Date.now().toString() }]);
    }
    setFormData({ id: "", name: "", quantity: "", price: "", expiry: "" });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Title>Controle de Estoque - Yakisoba do Cowboy</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Nome do produto"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="quantity"
          placeholder="Quantidade"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="price"
          placeholder="Preço unitário (R$)"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <Input
          type="date"
          name="expiry"
          placeholder="Data de validade"
          value={formData.expiry}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">{editMode ? "Atualizar Produto" : "Adicionar Produto"}</Button>
      </Form>
      {items.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Validade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>R$ {item.price}</td>
                <td>{item.expiry}</td>
                <td>
                  <Button edit onClick={() => handleEdit(item)}>
                    <AiFillEdit />
                  </Button>
                  <Button delete onClick={() => handleDelete(item.id)}>
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default App;

