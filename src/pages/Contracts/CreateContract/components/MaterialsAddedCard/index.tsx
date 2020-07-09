import React from 'react';

import { Container, Content, Table, MaterialRow } from './styles';

interface Props {
  materials: {
    id: string;
    quantity: string;
    name: string;
    daily_price: number;
    daily_price_formatted: string;
  }[];
}

const MaterialsAddedCard: React.FC<Props> = ({ materials }) => {
  return (
    <Container>
      <span>MATERIAIS ADICIONADOS</span>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>MATERIAL</th>
              <th>QUANTIDADE</th>
              <th>DIÁRIA</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <MaterialRow key={material.id}>
                <td>{material.name}</td>
                <td>{material.quantity}</td>
                <td>{material.daily_price_formatted}</td>
                <td>X</td>
              </MaterialRow>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default MaterialsAddedCard;
