import React from 'react';

import { FiX } from 'react-icons/fi';
import { Container, Content, Table, MaterialRow, RemoveButton } from './styles';

interface Props {
  materials: {
    id: string;
    quantity: string;
    name: string;
    daily_price: number;
    quantity_daily_price_formatted: string;
  }[];
  onClickRemoveButton(id: string): void;
}

const MaterialsAddedCard: React.FC<Props> = ({
  materials,
  onClickRemoveButton,
}) => {
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
                <td>{material.quantity_daily_price_formatted}</td>
                <td>
                  <RemoveButton
                    onClick={() => onClickRemoveButton(material.id)}
                  >
                    <FiX size={20} />
                  </RemoveButton>
                </td>
              </MaterialRow>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default MaterialsAddedCard;
