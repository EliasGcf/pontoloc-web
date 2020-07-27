import React, { useEffect, useState, useCallback } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import api from '../../../services/api';

import { BackButton, InputCurrency } from '../../../components/Form';
import { formatPrice } from '../../../utils/format';
import FinishContractButton from '../../../components/FinishContractButton';

import {
  Container,
  Content,
  MessageContainer,
  Client,
  Line,
  Contract,
  MaterialTable,
  MaterialRow,
  FinalInformations,
  Form,
  FinishButton,
} from './styles';

interface ContractData {
  id: string;
  number: number;
  collect_price: number | null;

  delivery_price: number;
  delivery_price_formatted: string;

  daily_total_price: number;
  daily_total_price_formatted: string;

  final_price: number;
  collect_at: Date | null;

  created_at: Date;
  created_at_formatted: string;

  client: {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone_number: string;
  };

  contract_items: Array<{
    id: string;

    price_quantity_daily: number;
    price_quantity_daily_formatted: string;

    quantity: number;
    material: {
      id: string;
      daily_price: number;
      daily_price_formatted: string;
      name: string;
    };
  }>;
}

interface FormData {
  collect_price: number;
}

const DetailsContract: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState<ContractData>({} as ContractData);
  const [showForm, setShowForm] = useState(false);

  const theme = useTheme();
  const { id } = useParams();

  const toggleShowForm = useCallback(() => {
    setShowForm(state => !state);
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      await api.put(`/contracts/${id}/finish`, {
        collect_price: Number(data.collect_price),
      });
      setIsLoading(false);
    },
    [id],
  );

  useEffect(() => {
    async function loadContract(): Promise<void> {
      const response = await api.get<ContractData>(`/contracts/${id}`);
      const { data } = response;

      const createdAtDate = new Date(data.created_at);
      const dateFormated = createdAtDate.toLocaleDateString('pt-BR');
      const timeFormated = createdAtDate.toLocaleTimeString('pt-BR');
      const created_at_formatted = `${dateFormated} às ${timeFormated}`;

      const contract_items = data.contract_items.map(item => ({
        ...item,
        price_quantity_daily_formatted: formatPrice(item.price_quantity_daily),
        material: {
          ...item.material,
          daily_price_formatted: formatPrice(item.material.daily_price),
        },
      }));

      setContract({
        ...data,
        delivery_price_formatted: formatPrice(data.delivery_price),
        daily_total_price_formatted: formatPrice(data.daily_total_price),
        created_at_formatted,
        contract_items,
      });
      setIsLoading(false);
    }

    loadContract();
  }, [id]);

  if (isLoading) {
    return (
      <Container>
        <Content>
          <header>
            <h1>DETALHES DO CONTRATO</h1>

            <section>
              <BackButton />

              <FinishContractButton isLoading={isLoading} />
            </section>
          </header>
        </Content>
        <MessageContainer>
          <Ring size={100} color={theme.colors.yellow} />
        </MessageContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>{`DETALHES DO CONTRATO #${contract.number}`}</h1>

          <section>
            <BackButton />
            <FinishContractButton
              onClick={toggleShowForm}
              isLoading={isLoading}
              showForm={showForm}
            />
          </section>
        </header>

        {showForm && (
          <Form onSubmit={handleSubmit}>
            <InputCurrency
              name="collect_price"
              label="VALOR DE COLETA"
              placeholder="R$ 0,00"
              autoFocus
            />

            <FinishButton>CONFIRMAR</FinishButton>
          </Form>
        )}

        <Client>
          <h1>CLIENTE</h1>
          <section>
            <h2>{contract.client.name}</h2>
            <Line />
            <h2>{contract.client.cpf}</h2>
          </section>
          <section>
            <h2>{contract.client.address}</h2>
            <Line />
            <h2>{contract.client.phone_number}</h2>
          </section>
        </Client>

        <Contract>
          <h1>ITENS DO CONTRATO</h1>
          <section>
            <h2>Valor de entrega</h2>
            <Line />
            <h2>{contract.delivery_price_formatted}</h2>
          </section>
          <section>
            <h2>Data de retirada</h2>
            <Line />
            <h2>{contract.created_at_formatted}</h2>
          </section>
        </Contract>

        <MaterialTable>
          <thead>
            <tr>
              <th>MATERIAL</th>
              <th>DIÁRIA</th>
              <th>QUANTIDADE</th>
              <th>DIÁRIA TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {contract.contract_items.map(item => (
              <MaterialRow key={item.id}>
                <td>{item.material.name}</td>
                <td>{item.material.daily_price_formatted}</td>
                <td>{item.quantity}</td>
                <td>{item.price_quantity_daily_formatted}</td>
              </MaterialRow>
            ))}
          </tbody>
        </MaterialTable>

        <FinalInformations>
          <span>{`TOTAL: ${contract.daily_total_price_formatted}`}</span>
        </FinalInformations>
      </Content>
    </Container>
  );
};

export default DetailsContract;
